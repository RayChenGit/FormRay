package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardDao extends JpaRepository<Card, Long> {

    Card findByCardnumber(String cardnumber);

    boolean existsByCardnumber(String cardnumber);
}
