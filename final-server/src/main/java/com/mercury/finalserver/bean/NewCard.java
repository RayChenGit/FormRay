package com.mercury.finalserver.bean;

public class NewCard {

    private String cardnumber;
    private String cardid;

    public NewCard() {
    }

    public NewCard(String cardnumber, String cardid) {
        this.cardnumber = cardnumber;
        this.cardid = cardid;
    }

    public String getCardnumber() {
        return cardnumber;
    }

    public void setCardnumber(String cardnumber) {
        this.cardnumber = cardnumber;
    }

    public String getCardid() {
        return cardid;
    }

    public void setCardid(String cardid) {
        this.cardid = cardid;
    }
}
