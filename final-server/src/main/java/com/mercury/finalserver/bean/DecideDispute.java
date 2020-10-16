package com.mercury.finalserver.bean;

public class DecideDispute {

    private boolean decide;
    private Dispute dispute;

    public DecideDispute() {
    }

    public boolean isDecide() {
        return decide;
    }

    public void setDecide(boolean decide) {
        this.decide = decide;
    }

    public Dispute getDispute() {
        return dispute;
    }

    public void setDispute(Dispute dispute) {
        this.dispute = dispute;
    }
}
