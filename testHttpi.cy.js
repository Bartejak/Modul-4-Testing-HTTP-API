describe('HTTPBin API Tests', () => {
  
  // Test 1: Test GET z domyślnymi nagłówkami
  it('GET request with default headers', () => {
    cy.request('GET', 'https://httpbin.org/get')
      .its('status')
      .should('eq', 200);
  });

  // Test 2: Test GET z parametrami zapytania
  it('GET request with query parameters', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/get',
      qs: { name: 'Cypress', type: 'Test' }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.args).to.have.property('name', 'Cypress');
      expect(response.body.args).to.have.property('type', 'Test');
    });
  });

  // Test 3: Test POST z danymi JSON
  it('POST request with JSON body', () => {
    cy.request({
      method: 'POST',
      url: 'https://httpbin.org/post',
      body: { username: 'admin', password: '12345' },
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.json).to.have.property('username', 'admin');
      expect(response.body.json).to.have.property('password', '12345');
    });
  });

  // Test 4: Test wysyłania niestandardowego nagłówka
  it('GET request with custom headers', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/headers',
      headers: { 'X-Custom-Header': 'MyCustomHeaderValue' }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.headers).to.have.property('X-Custom-Header', 'MyCustomHeaderValue');
    });
  });

  // Test 5: Test POST z parametrami URL i nagłówkami
  it('POST request with URL parameters and headers', () => {
    cy.request({
      method: 'POST',
      url: 'https://httpbin.org/post?source=test&status=ok',
      body: { name: 'John' },
      headers: { 'User-Agent': 'Cypress Test' }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.url).to.include('source=test&status=ok');
      expect(response.body.headers['User-Agent']).to.eq('Cypress Test');
    });
  });

  // Test 6: Test PUT z danymi JSON
  it('PUT request with JSON body', () => {
    cy.request({
      method: 'PUT',
      url: 'https://httpbin.org/put',
      body: { key: 'value' },
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.json).to.have.property('key', 'value');
    });
  });

  // Test 7: Test DELETE zapytanie
  it('DELETE request', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://httpbin.org/delete',
      body: { id: 1 },
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.json).to.have.property('id', 1);
    });
  });

  // Test 8: Test sprawdzania treści odpowiedzi dla GET
  it('GET request to /html to check response content type', () => {
    cy.request('GET', 'https://httpbin.org/html')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('text/html');
        expect(response.body).to.include('<html>');
      });
  });

  // Test 9: Test opóźnienia zapytania
  it('GET request to /delay with delay parameter', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/delay/3', // opóźnienie 3 sekundy
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include('delay');
    });
  });

  // Test 10: Test sprawdzania czasu trwania zapytania
  it('GET request to check request duration', () => {
    const startTime = Date.now();
    cy.request('GET', 'https://httpbin.org/get')
      .then((response) => {
        const duration = Date.now() - startTime;
        expect(duration).to.be.lessThan(5000); // Czas odpowiedzi poniżej 5 sekund
        expect(response.status).to.eq(200);
      });
  });

});
