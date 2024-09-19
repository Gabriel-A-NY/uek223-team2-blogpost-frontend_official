describe('Add Blog Dialog', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Should open the Add Blog dialog, fill in the form, and submit it', () => {
        // Step 1: Open the Add Blog dialog
        cy.contains('button', 'Add Blog Post', { timeout: 10000 }).click();

        // Verify that the dialog is open
        cy.get('[role="dialog"]').should('be.visible');

        // Step 2: Fill in the form fields
        cy.get('input[name="Title"]').type('My New Blog Post');
        cy.get('textarea[name="Text"]').type('This is the content of the new blog post.');
        cy.get('input[name="Category"]').type('Technology');
        cy.get('input[name="Author ID"]').type('ba804cb9-fa14-42a5-afaf-be488742fc54');
        cy.get('input[name="First Name"]').type('John');
        cy.get('input[name="Last Name"]').type('Doe');
        cy.get('input[name="Email"]').type('john.doe@example.com');

        // Step 3: Submit the form
        cy.intercept('POST', '**/blogposts', { statusCode: 201 }).as('createBlogPost');
        cy.contains('button', 'Create Blog Post').click();

        cy.wait('@createBlogPost').its('response.statusCode').should('eq', 201);

        cy.get('[role="dialog"]').should('not.exist');

        cy.contains('h6', 'My New Blog Post').should('exist');
    });
});

export {}