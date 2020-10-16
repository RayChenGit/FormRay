package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.CardType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardTypeDao extends JpaRepository<CardType, Long> {

    CardType findByName(String name);

}
