package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.Payment;
import com.mercury.finalserver.bean.UserWithPayment;
import com.mercury.finalserver.response.Response;
import com.mercury.finalserver.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @PutMapping(value = "/add")
    @PreAuthorize("isAuthenticated()")
    public Response addPayment(@RequestBody UserWithPayment userWithPayment) {
        return paymentService.addPayment(userWithPayment);
    }

    @PutMapping(value = "/delete")
    @PreAuthorize("isAuthenticated()")
    public Response deletePayment(@RequestBody UserWithPayment userWithPayment) {
        return paymentService.deletePayment(userWithPayment);
    }
}
