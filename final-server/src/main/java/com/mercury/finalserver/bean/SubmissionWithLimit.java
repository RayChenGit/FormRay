package com.mercury.finalserver.bean;

public class SubmissionWithLimit {

    private Submission submission;
    private int limit;

    public SubmissionWithLimit() {
    }

    public Submission getSubmission() {
        return submission;
    }

    public void setSubmission(Submission submission) {
        this.submission = submission;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }
}
