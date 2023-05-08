const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../api/app');
const { Sale } = require('../../database/models');
const salesMock = require('../mocks/Sale');

chai.use(chaiHttp);

describe('Verifica as rotas de pedidos do vendedor', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('Testa se uma requisição do tipo GET retorna todos as vendas na rota /seller/orders', async function() {
    sinon.stub(Sale, 'findAll').resolves(salesMock.sales);

    const response = await chai.request(app).get('/seller/orders');
    expect(response.status).to.be.equals(200);
    expect(response.body).to.be.deep.equals(salesMock.sales);
  });

  it('Teste se uma requisição do tipo GET retorna as vendas de apenas um vendedor na rota /seller/orders/:id', async function() {
    sinon.stub(Sale, 'findAll').resolves(salesMock.salesId1);

    const response = await chai.request(app).get('/seller/orders/1');
    expect(response.status).to.be.equals(200);
    expect(response.body).to.be.deep.equals(salesMock.salesId1);
  });

  it('Teste se é possível criar uma nova venda em uma requisição do tipo POST na rota /seller/order', async function() {
    sinon.stub(Sale, 'create').resolves(salesMock.newSaleResponse);

    const response = await chai.request(app).post('/seller/orders').send(salesMock.newSaleRequest);
    expect(response.status).to.be.equals(201);
    expect(response.body).to.be.deep.equals(salesMock.newSaleResponse);
  });
});
