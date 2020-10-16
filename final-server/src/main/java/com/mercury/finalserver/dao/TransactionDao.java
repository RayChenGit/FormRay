package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionDao extends JpaRepository<Transaction, Long> {

}
