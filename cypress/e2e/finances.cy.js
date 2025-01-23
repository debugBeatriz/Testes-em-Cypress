
//nessa primeira etapa descrever as entradas no site
describe('Transações', () => {
    //Hooks em automação são funções que contém códigos que devem ser rodados antes ou depois da execução de um teste.
    //before
    //after
    //beforeEach
    //afterEach

    beforeEach(() => {
        cy.visit("https://dev-finance.netlify.app/#")
    })

    it('Cadastrar uma entrada', () => {
       cy.visit("https://dev-finance.netlify.app/#")

       criarTransacao("Freela", 250)
       

       cy.get("tbody tr td.description").should("have.text", "Freela") //capturar o elemento e esperar que tenho o texto freela
    });

    it('Cadastrar uma saída', () => {
        cy.visit("https://dev-finance.netlify.app/#")

        criarTransacao("Cinema", -45)

        cy.get("tbody tr td.description").should("have.text", "Cinema")
    });

    it('Excluir transação', () => {
        criarTransacao("Freela", 100)
        criarTransacao("bombom", 50)

        cy.contains(".description", "Freela") //depois encontrar uma imagem que é o botão excluir
            .parent()
            .find('img')
            .click()

        cy.get('tbody tr').should("have.length", 1)
    });
    
    
});

function criarTransacao(descricao, valor){ 
    cy.contains("Nova Transação").click()
    cy.get('#description').type(descricao)
    cy.get('#amount').type(valor)
    cy.get('#date').type("2023-02-15")
    cy.contains('button', 'Salvar').click()
}