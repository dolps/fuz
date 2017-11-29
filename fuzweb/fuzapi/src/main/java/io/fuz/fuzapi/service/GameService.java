package io.fuz.fuzapi.service;

import io.fuz.fuzapi.service.dto.GameDTO;
import java.util.List;

/**
 * Service Interface for managing Game.
 */
public interface GameService {

    /**
     * Save a game.
     *
     * @param gameDTO the entity to save
     * @return the persisted entity
     */
    GameDTO save(GameDTO gameDTO);

    /**
     *  Get all the games.
     *
     *  @return the list of entities
     */
    List<GameDTO> findAll();

    /**
     *  Get the "id" game.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    GameDTO findOne(Long id);

    /**
     *  Delete the "id" game.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
