describe('Add Blog Dialog', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
            // Step 1: Fill in login credentials
            cy.get('#email').type('admin@example.com');
            cy.get('#password').type('1234');

            // Step 2: Click the login button (verify the selector is correct)
            cy.get('.MuiButtonBase-root').click();

            // Step 3: Intercept the login request to ensure it completes successfully
            cy.intercept('POST', '**/login').as('loginRequest'); // Replace the URL pattern as per your backend endpoint

            // Step 4: Wait for the login request to finish
            cy.wait('@loginRequest').its('response.statusCode').should('eq', 200); // Ensure login success
        });



    it('Should open the Add Blog dialog, fill in the form, and submit it', () => {
        // Step 1: Open the Add Blog dialog
        cy.get('#addbutton').click();
        cy.get('[role="dialog"]', { timeout: 10000 });

        // Step 2: Fill in the form fields (Ensure input names match your form elements)
        cy.get('input[name="title"]').type('My New Blog Post');
        cy.get('textarea[name="text"]').type('This is the content of the new blog post.');
        cy.get('input[name="category"]').type('Technology');
        cy.get('input[name="author.id"]').type('ba804cb9-fa14-42a5-afaf-be488742fc54');
        cy.get('input[name="author.firstName"]').type('John');
        cy.get('input[name="author.lastName"]').type('Doe');
        cy.get('input[name="author.email"]').type('john.doe@example.com');

        // Step 3: Submit the form
        cy.intercept('POST', '**/blogposts', { statusCode: 201 }).as('createBlogPost');
        cy.contains('button', 'Create Blog Post').click();

        cy.wait('@createBlogPost').its('response.statusCode').should('eq', 201);

        cy.get('[role="dialog"]').should('not.exist');
        
    });
});

