package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.CardType;
import com.mercury.finalserver.response.Response;
import com.mercury.finalserver.response.ResponseWithCardType;
import com.mercury.finalserver.service.CardTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/cardtype")
public class CardTypeController {

    @Autowired
    CardTypeService cardTypeService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('admin')")
    public Response addCardType(@RequestBody CardType cardType) {
        return cardTypeService.addCardType(cardType);
    }

    @GetMapping
    public List<CardType> getAllTypes() {
        return cardTypeService.getAllTypes();
    }

    @GetMapping(value = "/{id}")
    public ResponseWithCardType getById(@PathVariable Long id) {return cardTypeService.getById(id);}

}
