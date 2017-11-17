package io.orbiks.fuzz.cucumber.stepdefs;

import io.orbiks.fuzz.FuzzApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = FuzzApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
