const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../api/app');
const { Sale } = require('../../database/models');
const salesMock = require('../mocks/Sale');

chai.use(chaiHttp);

describe('Verifica se é possível ver os detalhes de um pedido', function () {
  afterEach(function () {
    sinon.restore();
  });

  it(
  'Testa se é retornado os detalhes de um pedido de acordo com o id passado na url',
  async function () {
    sinon.stub(Sale, 'findAll').resolves(salesMock.salesDetails);

    const response = await chai.request(app).get('/seller/orders/details/1');
    expect(response.status).to.be.equals(200);
    expect(response.body).to.be.deep.equals(salesMock.salesDetails);
  },
);
});
