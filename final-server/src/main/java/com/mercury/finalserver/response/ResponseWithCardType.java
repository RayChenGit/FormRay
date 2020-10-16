package com.mercury.finalserver.response;

import com.mercury.finalserver.bean.CardType;
import com.mercury.finalserver.bean.NewCard;

public class ResponseWithCardType extends Response{
    private CardType cardType;

    public ResponseWithCardType(boolean success, int code, String message, CardType cardType) {
        super(success, code, message);
        this.cardType = cardType;
    }

    public CardType getCardType() {
        return cardType;
    }

    public void setCardType(CardType cardType) {
        this.cardType = cardType;
    }
}
