package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.Benefit;
import com.mercury.finalserver.response.Response;
import com.mercury.finalserver.service.BenefitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/benefit")
public class BenefitController {

    @Autowired
    BenefitService benefitService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('admin')")
    public Response addBenefit(@RequestBody Benefit benefit) {
        return benefitService.add(benefit);
    }

    @GetMapping
    public List<Benefit> get() {return benefitService.getAll();}
}
