package io.fuz.fuzapi.service.impl;

import io.fuz.fuzapi.service.GameService;
import io.fuz.fuzapi.domain.Game;
import io.fuz.fuzapi.repository.GameRepository;
import io.fuz.fuzapi.service.dto.GameDTO;
import io.fuz.fuzapi.service.mapper.GameMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Game.
 */
@Service
@Transactional
public class GameServiceImpl implements GameService{

    private final Logger log = LoggerFactory.getLogger(GameServiceImpl.class);

    private final GameRepository gameRepository;

    private final GameMapper gameMapper;

    public GameServiceImpl(GameRepository gameRepository, GameMapper gameMapper) {
        this.gameRepository = gameRepository;
        this.gameMapper = gameMapper;
    }

    /**
     * Save a game.
     *
     * @param gameDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GameDTO save(GameDTO gameDTO) {
        log.debug("Request to save Game : {}", gameDTO);
        Game game = gameMapper.toEntity(gameDTO);
        game = gameRepository.save(game);
        return gameMapper.toDto(game);
    }

    /**
     *  Get all the games.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GameDTO> findAll() {
        log.debug("Request to get all Games");
        return gameRepository.findAll().stream()
            .map(gameMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one game by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public GameDTO findOne(Long id) {
        log.debug("Request to get Game : {}", id);
        Game game = gameRepository.findOne(id);
        return gameMapper.toDto(game);
    }

    /**
     *  Delete the  game by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Game : {}", id);
        gameRepository.delete(id);
    }
}
