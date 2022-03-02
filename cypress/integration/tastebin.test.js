/// <reference types="cypress"/>

describe("Index page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    })
    it("Add button is visible", () => {

        cy.get("#add-button").should("be.visible")
    })
    it("Contains title", () => {
        cy.contains("TasteBin")
    })
    it("Contains a editable pre element", () => {
        cy.get("#content").type("Hello").should("contain", "Hello")
    })
    it("Clears the page when the add button is pressed", () => {
        
        cy.get("#content").type("Hello")
        cy.get("#add-button").click()
        cy.get("#content").should("be.empty")
    })
    it("Redirects and shows the uploaded content", () => {
        cy.get("#content").type("Hello\nWorld!")
        cy.get("#upload").click();
        cy.contains("Hello\nWorld!")
    })
    it("Copy button is disabled", () => {
        cy.get("#copy").should("be.disabled")
    })
    it("Raw Text button is disabled", () => {
        cy.get("#raw-text").should("have.class", "disabled")
    })
})
describe("Post page", () => {
    beforeEach(() => {
        cy.visit("localhost:3000");
        cy.get("#content").type("Hello\nWorld!")
        cy.get("#upload").click();
        cy.wait(2000)
    })

    it("Copy button is enabled", () => {
        cy.get("#copy").should("be.enabled")
    })
    it("Raw Text button is enabled", () => {
        cy.get("#raw-text").should("not.have.class", "disabled")
    })
    it("Copy button copies the content to the main page", () => {
        cy.get("#copy").click()
        cy.location("href").should("contain", "/?text=")
        cy.contains("Hello\nWorld!")
    })
})
export {}