package io.orbiks.fuzgateway.cucumber.stepdefs;

import io.orbiks.fuzgateway.FuzgatewayApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = FuzgatewayApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
