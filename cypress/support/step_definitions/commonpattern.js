/// <reference types="cypress" />

import {
  Given,
  When,
  Then,
  Before,
  And,
} from "cypress-cucumber-preprocessor/steps";

Given(/^I am logged in as (.*)$/, (user) => {
  cy.visit(`/web/index.php/auth/login`);
  
  cy.intercept('GET', "https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages").as('waitApiLogin')
//   cy.wait('@waitApiLogin')
  cy.login(user)
  global.user = user
});



Then(/^I Should be on (.*)$/, (pageName) => {
  
    cy.fixture(`pom/json/${pageName}.json`).as('pageName')
    cy.get('@pageName').then((SelectDomElement) => {
        cy.intercept('GET', `${SelectDomElement.API.endpoint}`).as(`${SelectDomElement.API.nameApi}`);
        cy.wait(`@${SelectDomElement.API.nameApi}`)
    })   
    cy.get(':nth-child(2) > .oxd-main-menu-item').should('be.visible')
   
})

And(/^I should EXPECT$/, (dataTable) => {     
    cy.get('@pageName').then((SelectDomElement) => {
   
    

    cy.log(dataTable)
    cy.log(dataTable.length)

        dataTable.hashes().forEach(row => {
            if(row.SelectorContains == 'VISIBLE') {
                // cy.xpath("//h6[contains(text(),'PIM')]").should('be.visible');
                cy.xpath(`${SelectDomElement.domElements[`${row.SelectorTitle}`].xpath}`).should('be.visible')
            }
            else {
                cy.xpath(`${SelectDomElement.domElements[`${row.SelectorTitle}`].xpath}`).contains(`${row.SelectorContains}`)
            }
        })   

    })
})


And(/^I am Click (.*)$/, (buttonTarget) => {
    cy.get('@pageName').then((SelectDomElement) => {
        let selector = SelectDomElement.domElements[`${buttonTarget}`].xpath
        Cypress.on('fail', (error, runnable) => {
            if(!error.message.includes(`${selector}`)) {
                throw error
            }
        })
        
    cy.log(`Test this one ${SelectDomElement.domElements[`${buttonTarget}`].xpath}`)
    cy.xpath(`${selector}`).click({scrollBehavior:false, force: true})
    })

})


And(/^I Enter$/, (dataTable) => {
    cy.get('@pageName').then((SelectDomElement) => {      
        dataTable.hashes().forEach(row => {   
            cy.xpath(`${SelectDomElement.domElements[`${row.SelectorField}`].xpath}`).type(`${row.FieldValue}`);            
        })

    })
})


And(/^In the table I checked the column (.*) with the value (.*) containing (.*) in column (.*)$/, (column1,value1,value2,column2) => {
    cy.get('@pageName').then((SelectDomElement) => {
        let selectorcolumn1 = SelectDomElement.domElements[`${column1}`].xpath
        let selectorcolumn2 = SelectDomElement.domElements[`${column2}`].id
       
        cy.xpath(`${selectorcolumn1}`,{scrollBehavior: 'nearest'}).each(($e1, index, $list) => {
            const text = $e1.text()
            if(text.includes(`${value1}`)){
                cy.xpath(`${selectorcolumn1}`).eq(index)
                .siblings(`${selectorcolumn2}`)
                .then(function(firstname){
                    const firstnameText = firstname.text()
                    expect(firstnameText).to.equal(`${value2}`)
                })
            }
            
        })
        
    })
})