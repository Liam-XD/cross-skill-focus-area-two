# cf-cross-skilling-focus-2

> My repository for the second focus area. A journey into UI tests in BDD format.

This repository contains an automated testing framework for the [SauceDemo](https://www.saucedemo.com/) e-commerce website. It is built using TypeScript, Playwright, and Cucumber for Behavior-Driven Development (BDD).

## Prerequisites

Before you begin, ensure you have the following installed on your system:
*   [Node.js](https://nodejs.org/)
*   Cucumber extension for VSCode: <br>
https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official 

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

1.  Create a new file named `.env` inside the `config/` directory.
2.  Add the following content to `config/.env`:

    ```env
    // filepath: config/.env
    USERNAME=[username]
    PASSWORD=[password]
    ```

    These credentials are used in the authentication setup script ([`src/setup/setupAuth.ts`](src/setup/setupAuth.ts)).
    Note: The necessary credentials can be found on the [SauceDemo](https://www.saucedemo.com/) website.

## Running the Tests

The project uses `npm` scripts defined in [`package.json`](package.json) to execute the tests.

#### Run All Tests

To run the entire test suite, use the following command. This command first runs a pre-test script to handle authentication and then executes all feature files.

```sh
npm test
```

#### Run a Specific Feature

To run a single feature file, use the `test:feature` script followed by the path to the feature file.

```sh
npm run test:feature -- src/tests/features/login.feature
```

## Test Reports

After a test run, Cucumber generates test reports in the `reports/` directory. You can view a detailed HTML report by opening [`reports/cucumber-report.html`](reports/cucumber-report.html) in a browser. 

A JSON report is also available at [`reports/cucumber-report.json`](reports/cucumber-report.json).

## Project Structure

I've aimed to have this laid out as logically as possible. 
The config directory holds files for any manual configuration setup. Eg, environmenbt variables.


The Playwright file contains a user.json file. This contains any session details, suchas cookies, which are saved to it while running a setup script.


The reports file is where any execution reports will be stored after running a test or tests.


The src file is the key location of the automation framework.
- The page-objects  folder holds the Page Object Models which represent different pages of the application.

- The setup folder contains scripts for setting up the test environment, such as the browser instance and the pre-test login process so we have an authenticated state that doesn't require us to login for every individual test.

- Tests is where the test definitions are stored.
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

Feedback always welcome, thanks!