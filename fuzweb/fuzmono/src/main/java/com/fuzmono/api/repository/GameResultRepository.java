package com.fuzmono.api.repository;

import com.fuzmono.api.domain.GameResult;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the GameResult entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GameResultRepository extends JpaRepository<GameResult, Long> {

}
