package com.mercury.finalserver.bean;

public class UserWithPayment {

    private long userid;
    private Payment payment;

    public UserWithPayment() {
    }

    public long getUserid() {
        return userid;
    }

    public void setUserid(long userid) {
        this.userid = userid;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }
}
