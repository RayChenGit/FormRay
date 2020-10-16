package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.DecideDispute;
import com.mercury.finalserver.bean.Dispute;
import com.mercury.finalserver.response.Response;
import com.mercury.finalserver.service.DisputeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/dispute")
public class DisputeController {


    @Autowired
    DisputeService disputeService;
    
    @GetMapping(value = "/all")
    public List<Dispute> getAll() { return disputeService.getAll(); }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('admin', 'banker')")
    public List<Dispute> getUndecidedDispute() {
        return disputeService.getUndecided();
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public Response postDispute(@RequestBody Dispute dispute) {
        return disputeService.postDispute(dispute);
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('admin', 'banker')")
    public Response decide(@RequestBody DecideDispute decideDispute) {
        return disputeService.decideDispute(decideDispute);
    }

}
