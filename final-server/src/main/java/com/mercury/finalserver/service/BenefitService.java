package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.Benefit;
import com.mercury.finalserver.dao.BenefitDao;
import com.mercury.finalserver.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BenefitService {

    @Autowired
    BenefitDao benefitDao;

    public Response add(Benefit benefit) {
        try {
            benefitDao.save(benefit);
            return new Response(true,200, "add successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Response(false, 403, "add failed");
    }

    public List<Benefit> getAll() {
        return benefitDao.findAll();
    }
}
