package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDao extends JpaRepository<Payment, Long> {
}
