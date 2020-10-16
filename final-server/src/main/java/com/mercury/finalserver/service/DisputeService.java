package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.DecideDispute;
import com.mercury.finalserver.bean.Dispute;
import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.dao.DisputeDao;
import com.mercury.finalserver.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DisputeService {

    @Autowired
    DisputeDao disputeDao;

    @Autowired
    TransactionService transactionService;

    @Autowired
    EmailService emailService;

    public List<Dispute> getAll() {
        return disputeDao.findAll();
    }

    public List<Dispute> getUndecided() {
        return disputeDao.getUnDecided();
    }

    public Response postDispute(Dispute dispute) {
        try {
            if (!transactionService.dispute(dispute.getTransaction().getId())) {
                return new Response(false, 400, "Dispute failed");
            };
            disputeDao.save(dispute);
            return new Response(true, 200, "Dispute successfully, result will be sent to you through email");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Response(false, 400, "Dispute failed");
    }

    public Response decideDispute(DecideDispute decideDispute) {
        boolean decide = decideDispute.isDecide();
        Dispute dispute = decideDispute.getDispute();
        try {
            if (!transactionService.decideDispute(dispute.getTransaction().getId(), decide)) {
                return new Response(false, 400, "decide failed");
            }
            Dispute existing = disputeDao.findById(dispute.getId()).orElse(new Dispute());
            existing.setDecided(true);
            existing.setResult(decideDispute.isDecide());
            disputeDao.save(existing);
            User user = existing.getTransaction().getCard().getUser();
            if (user != null) {
                if (decide) {
                    emailService.sendSimpleMessage(user.getUserInformation().getEmail(),
                            "Your dispute has been approved!",
                            "Dear Customer: \n\n" +
                                    "    Your dispute on transaction: " + existing.getTransaction().getDescription() + " " + existing.getTransaction().getTime().toString().substring(11, 19) + " has been approved! \n" +
                                    "    This transaction has been canceled and corresponding charge has been revoked. ");
                } else {
                    emailService.sendSimpleMessage(user.getUserInformation().getEmail(),
                            "Your dispute has been rejected",
                            "Dear Customer: \n\n" +
                                    "    Your dispute on transaction: " + existing.getTransaction().getDescription() + " " + existing.getTransaction().getTime().toString().substring(11, 19) + " has been rejected. \n" +
                                    "    If you has any question and concern, please call us through the service line: 734-888-8888. Thank you!");
                }
            }
            return new Response(true, 200, "decide successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Response(false, 400, "decide failed");
    }



}
