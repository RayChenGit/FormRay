package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.CardType;
import com.mercury.finalserver.dao.CardTypeDao;
import com.mercury.finalserver.response.Response;
import com.mercury.finalserver.response.ResponseWithCardType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardTypeService {

    @Autowired
    CardTypeDao cardTypeDao;


    public Response addCardType(CardType cardType) {

        if (cardTypeDao.findByName(cardType.getName()) == null) {
            cardTypeDao.save(cardType);
            return new Response(true, 200, "add successfully");
        } else {
            return new Response(false, 403, "card already exists");
        }
    }

    public List<CardType> getAllTypes() {
        return cardTypeDao.findAll();
    }

    public ResponseWithCardType getById(Long id) {
        CardType cardType = cardTypeDao.findById(id).orElse(null);
        if (cardType == null) {
            return new ResponseWithCardType(false, 404, "cardtype not exist", null);
        } else {
            return new ResponseWithCardType(true, 200, "get this cardtype", cardType);
        }
    }

}
