package com.fuzmono.api.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fuzmono.api.domain.GameResult;

import com.fuzmono.api.repository.GameResultRepository;
import com.fuzmono.api.web.rest.errors.BadRequestAlertException;
import com.fuzmono.api.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing GameResult.
 */
@RestController
@RequestMapping("/api")
public class GameResultResource {

    private final Logger log = LoggerFactory.getLogger(GameResultResource.class);

    private static final String ENTITY_NAME = "gameResult";

    private final GameResultRepository gameResultRepository;

    public GameResultResource(GameResultRepository gameResultRepository) {
        this.gameResultRepository = gameResultRepository;
    }

    /**
     * POST  /game-results : Create a new gameResult.
     *
     * @param gameResult the gameResult to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gameResult, or with status 400 (Bad Request) if the gameResult has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/game-results")
    @Timed
    public ResponseEntity<GameResult> createGameResult(@RequestBody GameResult gameResult) throws URISyntaxException {
        log.debug("REST request to save GameResult : {}", gameResult);
        if (gameResult.getId() != null) {
            throw new BadRequestAlertException("A new gameResult cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GameResult result = gameResultRepository.save(gameResult);
        return ResponseEntity.created(new URI("/api/game-results/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /game-results : Updates an existing gameResult.
     *
     * @param gameResult the gameResult to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gameResult,
     * or with status 400 (Bad Request) if the gameResult is not valid,
     * or with status 500 (Internal Server Error) if the gameResult couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/game-results")
    @Timed
    public ResponseEntity<GameResult> updateGameResult(@RequestBody GameResult gameResult) throws URISyntaxException {
        log.debug("REST request to update GameResult : {}", gameResult);
        if (gameResult.getId() == null) {
            return createGameResult(gameResult);
        }
        GameResult result = gameResultRepository.save(gameResult);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gameResult.getId().toString()))
            .body(result);
    }

    /**
     * GET  /game-results : get all the gameResults.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gameResults in body
     */
    @GetMapping("/game-results")
    @Timed
    public List<GameResult> getAllGameResults() {
        log.debug("REST request to get all GameResults");
        return gameResultRepository.findAll();
        }

    /**
     * GET  /game-results/:id : get the "id" gameResult.
     *
     * @param id the id of the gameResult to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gameResult, or with status 404 (Not Found)
     */
    @GetMapping("/game-results/{id}")
    @Timed
    public ResponseEntity<GameResult> getGameResult(@PathVariable Long id) {
        log.debug("REST request to get GameResult : {}", id);
        GameResult gameResult = gameResultRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(gameResult));
    }

    /**
     * DELETE  /game-results/:id : delete the "id" gameResult.
     *
     * @param id the id of the gameResult to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/game-results/{id}")
    @Timed
    public ResponseEntity<Void> deleteGameResult(@PathVariable Long id) {
        log.debug("REST request to delete GameResult : {}", id);
        gameResultRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
