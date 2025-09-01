Feature: User Login

  Scenario: Successful login with Valid Credentials
    Given I am on the login page
    When I enter valid credentials in the respective fields
    And I click the 'Login' button
    Then I should be redirected to the product catalogue page
    And I should see the product listings
