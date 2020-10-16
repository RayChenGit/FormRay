package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.Transaction;
import com.mercury.finalserver.response.Response;
import com.mercury.finalserver.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/transaction")
public class TransactionController {


    @Autowired
    TransactionService transactionService;


    @PostMapping
    public Response postTransaction(@RequestBody Transaction transaction) {
        return transactionService.post(transaction);
    }


    @PutMapping(value = "/reward")
    @PreAuthorize("isAuthenticated()")
    public Response rewardTransaction(@RequestBody Transaction transaction) {
        return transactionService.reward(transaction);
    }
}
