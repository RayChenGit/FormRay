package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.Card;
import com.mercury.finalserver.bean.Transaction;
import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.dao.TransactionDao;
import com.mercury.finalserver.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransactionService {

    @Autowired
    TransactionDao transactionDao;

    @Autowired
    CardService cardService;

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    EmailService emailService;

    @Transactional
    public Response post(Transaction transaction) {

        Card card = cardService.findByCardnumber(transaction.getCard().getCardnumber());
        if (card == null || !passwordEncoder.matches(transaction.getCard().getCardid(), card.getCardid())) {
            return new Response(false, 403, "wrong card information");
        }

        double available = card.getCardlimit() - card.getPostedcharge() - card.getTotalbalance();
        if (available < transaction.getAmount()) {
            return new Response(false, 403, "Reject, not enough balance");
        }

        try {
            cardService.addToPostedcharge(transaction.getAmount(), card.getCardnumber());
            transaction.setCard(card);
            transactionDao.save(transaction);

            User user = card.getUser();
            if (user == null) {
                return new Response(true, 200, "transaction posted");
            } else {
                String username = user.getUsername();
                int addPoint = (int) Math.floor(transaction.getAmount());
                userService.addPoints(addPoint, username);
                emailService.sendSimpleMessage(user.getUserInformation().getEmail(),
                        "New Transaction on " + transaction.getTime().toString().substring(11, 19),
                        "Dear Customer: \n\n" +
                                "    You got a new transaction on your card ending with " + transaction.getCard().getCardnumber().substring(12) + ". \n" +
                                "    Transaction detail: " + transaction.getDescription() + ", amount: $" + transaction.getAmount());
                return new Response(true, 200, "transaction posted, get " + addPoint + " point");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Response(false, 403, "transaction failed, try again");
    }

    public Response reward(Transaction transaction) {
        Transaction existing = transactionDao.findById(transaction.getId()).orElse(null);
        if (existing == null || existing.isCanceled() || existing.isCharged() || existing.isDisputed() || existing.isRewarded()) {
            return new Response(false, 400, "Reward failed!");
        } else if (existing.getCard() == null || existing.getCard().getUser() == null || existing.getCard().getUser().getPoints() < 100 * (int) Math.floor(existing.getAmount())) {
            return new Response(false, 400, "Not Valid for reward");
        } else {
            try{
                existing.setRewarded(true);
                transactionDao.save(existing);
                cardService.addToPostedcharge(-1 * existing.getAmount(), existing.getCard().getCardnumber());
                userService.addPoints((int) (-1 * 100 * existing.getAmount()), existing.getCard().getUser().getUsername());
                return new Response(true, 200, "Reward successfully");
            } catch (Exception e) {
                e.printStackTrace();
            }
            return new Response(false, 401, "try again");
        }
    }

    public boolean dispute(long id) {
        Transaction existing = transactionDao.findById(id).orElse(null);
        if (existing != null && !existing.isCanceled() && !existing.isCharged() && !existing.isRewarded() && !existing.isDisputed()) {
            try {
                existing.setDisputed(true);
                transactionDao.save(existing);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return false;
    }

    public boolean decideDispute(long id, boolean result) {
        try {
            Transaction existing = transactionDao.findById(id).orElse(new Transaction());
            if (!result) {
                existing.setDisputed(false);
                transactionDao.save(existing);
            } else {
                existing.setCanceled(true);
                transactionDao.save(existing);
                cardService.addToPostedcharge(-1 * existing.getAmount(), existing.getCard().getCardnumber());
                userService.addPoints(-1 * (int) Math.floor(existing.getAmount()), existing.getCard().getUser().getUsername());
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }




}
