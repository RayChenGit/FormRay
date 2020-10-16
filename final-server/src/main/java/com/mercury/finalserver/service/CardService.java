package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.*;
import com.mercury.finalserver.dao.CardDao;
import com.mercury.finalserver.dao.TransactionDao;
import com.mercury.finalserver.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

@Service
public class CardService {

    @Autowired
    CardDao cardDao;

    @Autowired
    TransactionDao transactionDao;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    EmailService emailService;


    public Response postNewCard(Card card) {
        Card existing = cardDao.findByCardnumber(card.getCardnumber());
        if (existing == null) {
            card.setCardid(passwordEncoder.encode(card.getCardid()));
            cardDao.save(card);
            return new Response(true, 200, "create card successfully");
        } else {
            return new Response(false, 403, "card exists");
        }
    }

    public NewCard createNewCard(CardType cardType, int limit) {

        String cardnumber = generateCardnumber();
        while (cardDao.existsByCardnumber(cardnumber)) {
            cardnumber = generateCardnumber();
        }

        String cardid = generateCardid();
        Card newCard = new Card();
        newCard.setCardnumber(cardnumber);
        newCard.setCardid(passwordEncoder.encode(cardid));
        newCard.setCardType(cardType);
        newCard.setCardlimit(limit);

        try {
            cardDao.save(newCard);
            return new NewCard(cardnumber, cardid);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private String generateCardnumber() {
        StringBuilder prefix = new StringBuilder("3759-876543-");
        Random random = new Random();
        for (int i = 0; i < 5; i++) {
            prefix.append(random.nextInt(10));
        }
        return prefix.toString();
    }

    private String generateCardid() {
        StringBuilder id = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 4; i++) {
            id.append(random.nextInt(10));
        }
        return id.toString();
    }


    public Card findByCardnumber(String cardnumber) {
        return cardDao.findByCardnumber(cardnumber);
    }


    public boolean addToPostedcharge(double amount, String cardnumber) {
        try {
            Card existing  = cardDao.findByCardnumber(cardnumber);
            existing.setPostedcharge(existing.getPostedcharge() + amount);
            cardDao.save(existing);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public Response check(Card card) {
        Card existing = cardDao.findByCardnumber(card.getCardnumber());
        if (existing == null || !passwordEncoder.matches(card.getCardid(), existing.getCardid())) {
            return new Response(false, 403, "Wrong card information");
        } else if (existing.getUser() != null) {
            return new Response(false, 400, "This card has been added to an existing account");
        } else {
            return new Response(true, 200, "card checked");
        }
    }

    @Transactional
    public boolean postedToCharge() {
        try {
            List<Card> cards = cardDao.findAll();
            cards.forEach( c -> {
              c.setTotalbalance(c.getTotalbalance() + c.getPostedcharge());
                c.setPostedcharge(0);
            });
            cardDao.saveAll(cards);
            List<Transaction> transactions = transactionDao.findAll();
            transactions.forEach(t -> t.setCharged(true));
            transactionDao.saveAll(transactions);
            emailService.sendSimpleMessage(
                    "ruich@umich.edu",
                    "New Statement checked",
                    "Dear Customer: \n\n" +
                            "    New Statement has been checked! \n" +
                            "    We appreciate your patronage as well as your attention to your account balance.");
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public Response pay(CardWithPayment cardWithPayment) {
        try {
            Card card = cardWithPayment.getCard();
            Card existing = cardDao.findByCardnumber(card.getCardnumber());
            existing.setTotalbalance(existing.getTotalbalance() - cardWithPayment.getPayment());
            cardDao.save(existing);
            return new Response(true, 200, "Payment successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Response(false, 400, "Payment failed, try again");
    }

}
