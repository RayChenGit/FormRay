package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.Benefit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BenefitDao extends JpaRepository<Benefit, Long> {
}
