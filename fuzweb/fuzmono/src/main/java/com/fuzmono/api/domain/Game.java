package com.fuzmono.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Game.
 */
@Entity
@Table(name = "game")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Game implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "game")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Team> tOnes = new HashSet<>();

    @OneToMany(mappedBy = "game")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Team> tTwos = new HashSet<>();

    @OneToMany(mappedBy = "game")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Team> winnerTeams = new HashSet<>();

    @ManyToOne
    private GameResult gameResult;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Team> getTOnes() {
        return tOnes;
    }

    public Game tOnes(Set<Team> teams) {
        this.tOnes = teams;
        return this;
    }

    public Game addTOne(Team team) {
        this.tOnes.add(team);
        team.setGame(this);
        return this;
    }

    public Game removeTOne(Team team) {
        this.tOnes.remove(team);
        team.setGame(null);
        return this;
    }

    public void setTOnes(Set<Team> teams) {
        this.tOnes = teams;
    }

    public Set<Team> getTTwos() {
        return tTwos;
    }

    public Game tTwos(Set<Team> teams) {
        this.tTwos = teams;
        return this;
    }

    public Game addTTwo(Team team) {
        this.tTwos.add(team);
        team.setGame(this);
        return this;
    }

    public Game removeTTwo(Team team) {
        this.tTwos.remove(team);
        team.setGame(null);
        return this;
    }

    public void setTTwos(Set<Team> teams) {
        this.tTwos = teams;
    }

    public Set<Team> getWinnerTeams() {
        return winnerTeams;
    }

    public Game winnerTeams(Set<Team> teams) {
        this.winnerTeams = teams;
        return this;
    }

    public Game addWinnerTeam(Team team) {
        this.winnerTeams.add(team);
        team.setGame(this);
        return this;
    }

    public Game removeWinnerTeam(Team team) {
        this.winnerTeams.remove(team);
        team.setGame(null);
        return this;
    }

    public void setWinnerTeams(Set<Team> teams) {
        this.winnerTeams = teams;
    }

    public GameResult getGameResult() {
        return gameResult;
    }

    public Game gameResult(GameResult gameResult) {
        this.gameResult = gameResult;
        return this;
    }

    public void setGameResult(GameResult gameResult) {
        this.gameResult = gameResult;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Game game = (Game) o;
        if (game.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), game.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Game{" +
            "id=" + getId() +
            "}";
    }
}
