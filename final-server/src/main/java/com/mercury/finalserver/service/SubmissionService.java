package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.NewCard;
import com.mercury.finalserver.bean.Submission;
import com.mercury.finalserver.bean.SubmissionWithLimit;
import com.mercury.finalserver.dao.SubmissionDao;
import com.mercury.finalserver.response.Response;
import com.mercury.finalserver.response.ResponseWithCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SubmissionService {

    @Autowired
    SubmissionDao submissionDao;

    @Autowired
    CardService cardService;

    @Autowired
    EmailService emailService;

    public List<Submission> getAll() {
        return submissionDao.findAll();
    }


    public Response post(Submission submission) {
        try{
            submissionDao.save(submission);
            return new Response(true, 200, "Submit successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Response(false, 403, "Submit failed, try again");
    }

    public List<Submission> getUnreviewedSubmission() {
        return submissionDao.getUnreviewed();
    }

    public List<Submission> getUndecidedSubmission() {
        return submissionDao.getUndecided();
    }

    public List<Submission> getDecidedSubmission() {
        return submissionDao.getDecided();
    }

    public Response bankReview(Submission submission) {
        try {
            Submission existing = submissionDao.getOne(submission.getId());
            existing.setReviewed(true);
            existing.setBankeradvice(submission.getBankeradvice());
            submissionDao.save(existing);
            return new Response(true, 200, "Review successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
            return new Response(false, 403, "Review failed, try again");
    }


    @Transactional
    public ResponseWithCard adminDecide(SubmissionWithLimit submissionWithLimit) {

        Submission submission = submissionWithLimit.getSubmission();

        try {
            Submission existing = submissionDao.getOne(submission.getId());
            if (existing.isDecided()) {
                return new ResponseWithCard(false, 403, "Submission has been decided!", null);
            }
            existing.setDecided(true);
            existing.setApproval(submission.isApproval());
            if (submission.isApproval()) {
                NewCard newCard = cardService.createNewCard(existing.getCardtype(), submissionWithLimit.getLimit());
                existing.setFinalresult("Approve, card number is " + newCard.getCardnumber() + " card limit is " + submissionWithLimit.getLimit());
                submissionDao.save(existing);
                emailService.sendSimpleMessage(existing.getEmail(),
                        "Your credit card application on " + existing.getCardtype().getName() + " has been approved!",
                        "Dear applicant: \n\n" +
                                "    Congratulations! Your application has been approved.\n" +
                                "    The card number is " + newCard.getCardnumber() + " , and the four-digit card id is " + newCard.getCardid() + ".");
                return new ResponseWithCard(true, 200, "Approve successfully, new card generated", newCard);
            } else {
                existing.setFinalresult("Rejected");
                submissionDao.save(existing);
                emailService.sendSimpleMessage(existing.getEmail(),
                        "Sorry, your credit card application on " + existing.getCardtype().getName() + " has been rejected",
                        "Dear applicant: \n\n" +
                                "    We are sorry to notify you that your credit card application has been denied due to some reason.");
                return new ResponseWithCard(true, 201, "Reject successfully", null);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseWithCard(false, 403, "Decide failed, try again", null);
    }

}
