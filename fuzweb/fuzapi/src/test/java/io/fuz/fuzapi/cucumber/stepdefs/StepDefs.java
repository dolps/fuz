package io.fuz.fuzapi.cucumber.stepdefs;

import io.fuz.fuzapi.FuzapiApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = FuzapiApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
