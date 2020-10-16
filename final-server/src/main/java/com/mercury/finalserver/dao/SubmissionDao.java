package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubmissionDao extends JpaRepository<Submission, Long> {

    @Query("select s from Submission s where s.reviewed = false")
    List<Submission> getUnreviewed();

    @Query("select s from Submission s where s.reviewed = true and s.decided = false")
    List<Submission> getUndecided();

    @Query("select s from Submission s where s.reviewed = true and s.decided = true")
    List<Submission> getDecided();


}
