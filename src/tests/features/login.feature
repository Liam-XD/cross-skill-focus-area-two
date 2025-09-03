Feature: User Login
User story 1: 
As a returning user, I want to securely log in to the SauceDemo website so that I can access the product catalog and proceed with my shopping experience.

  Scenario: Successful login with Valid Credentials
    Given I am on the login page
    When I enter valid credentials
    And I click the 'Login' button
    Then I should be redirected to the product catalogue page
    And I should see the product listings
