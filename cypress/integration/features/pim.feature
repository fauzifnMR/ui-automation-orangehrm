Feature: PIM Feature

    Background: Logged as Admin and is in PIM Page
        Given I am logged in as Admin
        Then I Should be on PimPage
        And I should EXPECT
            |SelectorTitle              |SelectorContains|
            |PIM Title                  |VISIBLE  |
            |Sidebar PIM                |PIM      |

	Scenario: As a user, you can view and update employ
	    When I am Click EmployeListMenu
        And I Enter 
            |SelectorField    | FieldValue |
            | searchEmployeId | 0204 |
        And I am Click SearchEmploye
        
    