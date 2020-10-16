package com.mercury.finalserver.response;

import com.mercury.finalserver.bean.NewCard;

public class ResponseWithCard extends Response {

    private NewCard card;

    public ResponseWithCard(boolean success, int code, String message, NewCard card) {
        super(success, code, message);
        this.card = card;
    }

    public NewCard getCard() {
        return card;
    }

    public void setCard(NewCard card) {
        this.card = card;
    }
}
