package com.fuzmono.api.web.rest;

import com.fuzmono.api.FuzmonoApp;

import com.fuzmono.api.domain.GameResult;
import com.fuzmono.api.repository.GameResultRepository;
import com.fuzmono.api.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.fuzmono.api.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GameResultResource REST controller.
 *
 * @see GameResultResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FuzmonoApp.class)
public class GameResultResourceIntTest {

    @Autowired
    private GameResultRepository gameResultRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGameResultMockMvc;

    private GameResult gameResult;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GameResultResource gameResultResource = new GameResultResource(gameResultRepository);
        this.restGameResultMockMvc = MockMvcBuilders.standaloneSetup(gameResultResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GameResult createEntity(EntityManager em) {
        GameResult gameResult = new GameResult();
        return gameResult;
    }

    @Before
    public void initTest() {
        gameResult = createEntity(em);
    }

    @Test
    @Transactional
    public void createGameResult() throws Exception {
        int databaseSizeBeforeCreate = gameResultRepository.findAll().size();

        // Create the GameResult
        restGameResultMockMvc.perform(post("/api/game-results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameResult)))
            .andExpect(status().isCreated());

        // Validate the GameResult in the database
        List<GameResult> gameResultList = gameResultRepository.findAll();
        assertThat(gameResultList).hasSize(databaseSizeBeforeCreate + 1);
        GameResult testGameResult = gameResultList.get(gameResultList.size() - 1);
    }

    @Test
    @Transactional
    public void createGameResultWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gameResultRepository.findAll().size();

        // Create the GameResult with an existing ID
        gameResult.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGameResultMockMvc.perform(post("/api/game-results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameResult)))
            .andExpect(status().isBadRequest());

        // Validate the GameResult in the database
        List<GameResult> gameResultList = gameResultRepository.findAll();
        assertThat(gameResultList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGameResults() throws Exception {
        // Initialize the database
        gameResultRepository.saveAndFlush(gameResult);

        // Get all the gameResultList
        restGameResultMockMvc.perform(get("/api/game-results?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gameResult.getId().intValue())));
    }

    @Test
    @Transactional
    public void getGameResult() throws Exception {
        // Initialize the database
        gameResultRepository.saveAndFlush(gameResult);

        // Get the gameResult
        restGameResultMockMvc.perform(get("/api/game-results/{id}", gameResult.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gameResult.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGameResult() throws Exception {
        // Get the gameResult
        restGameResultMockMvc.perform(get("/api/game-results/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGameResult() throws Exception {
        // Initialize the database
        gameResultRepository.saveAndFlush(gameResult);
        int databaseSizeBeforeUpdate = gameResultRepository.findAll().size();

        // Update the gameResult
        GameResult updatedGameResult = gameResultRepository.findOne(gameResult.getId());
        // Disconnect from session so that the updates on updatedGameResult are not directly saved in db
        em.detach(updatedGameResult);

        restGameResultMockMvc.perform(put("/api/game-results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGameResult)))
            .andExpect(status().isOk());

        // Validate the GameResult in the database
        List<GameResult> gameResultList = gameResultRepository.findAll();
        assertThat(gameResultList).hasSize(databaseSizeBeforeUpdate);
        GameResult testGameResult = gameResultList.get(gameResultList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingGameResult() throws Exception {
        int databaseSizeBeforeUpdate = gameResultRepository.findAll().size();

        // Create the GameResult

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGameResultMockMvc.perform(put("/api/game-results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameResult)))
            .andExpect(status().isCreated());

        // Validate the GameResult in the database
        List<GameResult> gameResultList = gameResultRepository.findAll();
        assertThat(gameResultList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGameResult() throws Exception {
        // Initialize the database
        gameResultRepository.saveAndFlush(gameResult);
        int databaseSizeBeforeDelete = gameResultRepository.findAll().size();

        // Get the gameResult
        restGameResultMockMvc.perform(delete("/api/game-results/{id}", gameResult.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GameResult> gameResultList = gameResultRepository.findAll();
        assertThat(gameResultList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GameResult.class);
        GameResult gameResult1 = new GameResult();
        gameResult1.setId(1L);
        GameResult gameResult2 = new GameResult();
        gameResult2.setId(gameResult1.getId());
        assertThat(gameResult1).isEqualTo(gameResult2);
        gameResult2.setId(2L);
        assertThat(gameResult1).isNotEqualTo(gameResult2);
        gameResult1.setId(null);
        assertThat(gameResult1).isNotEqualTo(gameResult2);
    }
}
