Feature: Complete a purchase
User story 3:
As a logged-in user, I want to complete the purchase of an item from the product catalog so that I can receive my desired product.

  Scenario: User initiates checkout process
    Given I am on the 'Your Cart' page
    When I click the 'Checkout' button
    Then I should be navigated to the 'Checkout: Your Information' page

  Scenario: User inputs shipping information
    Given I am on the 'Checkout: Your Information' page
    When I enter valid shipping information
    And I click the 'Continue' button
    Then I should be navigated to the 'Checkout: Overview' page

  Scenario: User successfully completes their order
    Given I am on the 'Checkout: Overview' page
    When I review the order summary
    And I click the 'Finish' button
    Then I should be navigated to the 'Checkout: Complete!' page
    And I should see a confirmation message
