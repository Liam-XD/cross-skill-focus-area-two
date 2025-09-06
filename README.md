# cf-cross-skilling-focus-2

> My repository for the second focus area. A journey into UI tests in BDD format.

This repository contains an automated testing framework for the [SauceDemo](https://www.saucedemo.com/) e-commerce website. It is built using TypeScript, Playwright, and Cucumber for Behavior-Driven Development (BDD).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [Clone the Repository](#1-clone-the-repository)
    - [Install Dependencies](#2-install-dependencies)
    - [Set Up Environment Variables](#3-set-up-environment-variables)
- [Running the Tests](#running-the-tests)
    - [Headed or Headless](#headed-or-headless)
    - [Run All Tests](#run-all-tests)
    - [Run a Specific Feature](#run-a-specific-feature)
- [Test Reports](#test-reports)
- [Project Structure](#project-structure)
- [A Note on BDD](#a-note-on-bdd)
    - [The Feature file](#the-feature-file)
    - [The Step Definition file](#the-step-definition-file)
    - [Interaction](#interaction)
    - [Conduct a Dry Run](#conduct-a-dry-run)

## Prerequisites

Before you begin, ensure you have the following installed on your system:
*   [Node.js](https://nodejs.org/)
*   [`Cucumber extension for VSCode`](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official)

## Getting Started

Follow these steps to set up and run the project on your local machine.

### 1. Clone the Repository

```sh
git clone <your-repository-url>
cd cross-skill-focus-area-two
```

### 2. Install Dependencies

Install the project dependencies defined in [`package.json`](package.json) by running:

```sh
npm install
```

### 3. Set Up Environment Variables

The project uses a `.env` file to manage credentials for logging in.

1.  If it doesn't already exist, create a new file named `.env` inside the `config/` directory.
2.  Add the following content to `config/.env`:

    ```env
    // filepath: config/.env
    USERNAME=[username]
    PASSWORD=[password]
    BASE_URL=https://www.saucedemo.com
    HEADLESS=[true or false]
    ```

    These credentials are used in the authentication setup script ([`src/setup/setupAuth.ts`](src/setup/setupAuth.ts)).<br>
    Note: The necessary credentials can be found on the [SauceDemo](https://www.saucedemo.com/) website.

## Running the Tests

The project uses `npm` scripts defined in [`package.json`](package.json) to execute the tests.

### Headed or Headless

Within the [`config/.env`](config/env.ts) file the headless state of the browser is set. This can be set to true for headless mode and false for headed/visible browser mode.


### Run All Tests

To run the entire test suite, use the following command. This command first runs a pre-test script to handle authentication and then executes all feature files.

```sh
npm test
```

### Run a Specific Feature

To run a single feature file, use the `test:feature` script followed by the path to the feature file.

```sh
npm run test:feature -- src/tests/features/login.feature
```

## Test Reports

After a test run, Cucumber generates test reports in the `reports/` directory. You can view a detailed HTML report by opening the report in a browser. 

A JSON report is also available under the `reports/` directory. 

## Project Structure

I've aimed to have this laid out as logically as possible.<br> 
The config directory holds files for any manual configuration setup. Eg, environment variables.<br>

The Playwright file contains a user.json file. This contains any session details, suchas cookies, which are saved to it while running a setup script.<br>

The reports file is where any execution reports will be stored after running a test or tests.<br>

The src file is the key location of the automation framework:
- The [`page-objects folder`](src/page-objects)holds the Page Object Models which represent different pages of the application.

- The [`setup folder`](src/setup)contains scripts for setting up the test environment, such as the browser instance and the pre-test login process so we have an authenticated state that doesn't require us to login for every individual test.

- The [`tests folder`](src/tests) is where the test definitions are stored.
   - The feature files are in BDD format and gherking language to describe the behaviours under test.
   - The Steps files are where the code that implements the steps describes in the feature files live. These are linked so you can cmd+click on a feature and it will direct you to the test step that executes it.

```
.
├── config/
│   ├── .env              # Environment variables (needs to be created)
│   └── cucumber.json     # Cucumber configuration
├── playwright/
│   └── .auth/            # Stores authentication state
├── reports/              # Test execution reports
├── src/
│   ├── page-objects/     # Page Object Models (POMs)
│   ├── setup/            # Browser and authentication setup
│   └── tests/
│       ├── features/     # Cucumber feature files
│       └── steps/        # Step definitions for features
└── package.json          # Project dependencies and scripts
```

## A Note on BDD
The tests in this repository are written in Cucumber gherkin syntax.
Scenarios are added in the feature files found within [`src/test/features`](src/test/features).<br>
The step definitions of how to test those steps are implemented in the [`src/tests/steps`](src/tests/steps) file.

### The Feature file
The feature files should be readable to anyone on the team, including non-technical members. It will explain the test case but will contain no code.

### The Step Definition file
This is where the code that executes the behaviour described in the feature file lives.<br>
Each line in the feature file will be linked to a block of code in the definition file. This is where the playwright test framework is ued to interact with the browser and execute the tests.

### Interaction
Cucumber will read the steps defined in the .feature file and then look through all the step definitions for a named function that matches the text pattern.
Once found, playwright will execute the code within that function. This process will be repeated for each step in the scenario defined in the .feature file.

If a step is written in the feature file but has no matching code in a step definition file, when running the test, Cucumber will fail the test and print out snipets for any steps that are defined in the .feature files but a matching step definition could not be found. 

### Conduct a Dry Run
If you want to quickly find missing or unimplemented steps and/or confirm that the feature files and step definitions within this file are correctly linked you can run the following command:

```sh
npm run dryrun
```
This will save time by not running the underlying code in the steps folder and just check the step coverage.