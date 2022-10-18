Feature: Authentication

	Scenario: As a user can login to the application
	Given I am logged in as Admin
    Then I Should be on PimPage
    And I should EXPECT
        |SelectorTitle              |SelectorContains|
        |PIM Title                  |VISIBLE  |
        |Sidebar PIM                |PIM      |
        
    