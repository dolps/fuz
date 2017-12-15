package com.fuzmono.api.cucumber.stepdefs;

import com.fuzmono.api.FuzmonoApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = FuzmonoApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
