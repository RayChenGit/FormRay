package com.mercury.finalserver.bean;

public class CardWithPayment {

    private Card card;
    private double payment;

    public CardWithPayment() {
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public double getPayment() {
        return payment;
    }

    public void setPayment(double payment) {
        this.payment = payment;
    }
}
