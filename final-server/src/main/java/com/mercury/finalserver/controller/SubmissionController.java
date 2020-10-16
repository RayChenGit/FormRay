package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.Submission;
import com.mercury.finalserver.bean.SubmissionWithLimit;
import com.mercury.finalserver.response.Response;
import com.mercury.finalserver.response.ResponseWithCard;
import com.mercury.finalserver.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/submission")
public class SubmissionController {


    @Autowired
    SubmissionService submissionService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('admin')")
    public List<Submission> getAll() {
        return submissionService.getAll();
    }

    @PostMapping
    public Response submit(@RequestBody Submission submission) {
        return submissionService.post(submission);
    }

    @GetMapping(value = "/review")
    @PreAuthorize("hasAnyAuthority('banker', 'admin')")
    public List<Submission> getUnreviewedSubmission() {
        return submissionService.getUnreviewedSubmission();
    }

    @GetMapping(value = "/undecide")
    @PreAuthorize("hasAnyAuthority('banker', 'admin')")
    public List<Submission> getUnDecidedSubmission() {
        return submissionService.getUndecidedSubmission();
    }

    @GetMapping(value = "/decide")
    @PreAuthorize("hasAnyAuthority('admin')")
    public List<Submission> getDecidedSubmission() {
        return submissionService.getDecidedSubmission();
    }

    @PutMapping(value = "/review")
    @PreAuthorize("hasAnyAuthority('banker', 'admin')")
    public Response review(@RequestBody Submission submission) {
        return submissionService.bankReview(submission);
    }

    @PutMapping(value = "/decide")
    @PreAuthorize("hasAnyAuthority('banker', 'admin')")
    public ResponseWithCard decide(@RequestBody SubmissionWithLimit submissionWithLimit) {
        return submissionService.adminDecide(submissionWithLimit);
    }



}
