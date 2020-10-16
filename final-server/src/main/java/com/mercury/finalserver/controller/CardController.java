package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.Card;
import com.mercury.finalserver.bean.CardWithPayment;
import com.mercury.finalserver.response.Response;
import com.mercury.finalserver.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/card")
public class CardController {

    @Autowired
    CardService cardService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('admin')")
    public Response postNewCard(@RequestBody Card newCard) {
        return cardService.postNewCard(newCard);
    }

    @PostMapping(value = "/check")
    public Response checkCard(@RequestBody Card card) {
        return cardService.check(card);
    }


    @PutMapping(value = "/statementCheck")
    public boolean postToCharge() {
        return cardService.postedToCharge();
    }

    @PutMapping(value = "/pay")
    @PreAuthorize("isAuthenticated()")
    public Response payBalance(@RequestBody CardWithPayment cardWithPayment) {
        return cardService.pay(cardWithPayment);
    }

}
