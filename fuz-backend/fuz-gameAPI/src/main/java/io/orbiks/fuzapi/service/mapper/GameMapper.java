package io.orbiks.fuzapi.service.mapper;

import io.orbiks.fuzapi.domain.*;
import io.orbiks.fuzapi.service.dto.GameDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Game and its DTO GameDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GameMapper extends EntityMapper<GameDTO, Game> {

    

    

    default Game fromId(Long id) {
        if (id == null) {
            return null;
        }
        Game game = new Game();
        game.setId(id);
        return game;
    }
}
