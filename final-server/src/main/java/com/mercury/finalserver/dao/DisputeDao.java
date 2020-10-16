package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.Dispute;
import com.mercury.finalserver.bean.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DisputeDao  extends JpaRepository<Dispute, Long> {

    @Query("select d from Dispute d where d.decided = false")
    List<Dispute> getUnDecided();
}
