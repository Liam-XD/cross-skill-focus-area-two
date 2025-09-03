Feature: Shopping Cart Management
User story 2:
As a logged-in user, I want to add items to my shopping cart and review my selected items before checkout, so that I can ensure I am purchasing the correct products.

  Scenario: User adds an item to their cart
    Given I am on the product catalog page
    When I click the 'Add to cart' button for a chosen item
    Then the item should be added to my shopping cart, indicated by the shopping cart icon showing a '1'

  Scenario: User checks items in their cart
    Given I have an item in my shopping cart
    When I click the shopping cart icon
    Then I should be navigated to the 'Your Cart' page
    And I should see the selected item listed in my cart
