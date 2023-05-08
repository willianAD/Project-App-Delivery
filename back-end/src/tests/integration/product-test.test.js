// const chai = require('chai');
// const { use, expect } = chai;
// const sinon = require('sinon');
// const chaiHttp = require('chai-http');

// use(chaiHttp);

// const app = require('../../api/app');
// const { allProducts } = require('./mocks/product.mock');

// // const consoleLogStub = stub(console, 'log');
// // before(() => consoleLogStub.returns(true));
// // after(() => consoleLogStub.restore());

// describe('Rota post /product', function() {
//   before(async () => {
//     try {
//       postProducts = await chai.request(app).post('/product').send({
//         name: "Cerveja Amanteigada 250ml",
//         price: "4.00",
//         urlImage: "https://teste.test.jpg"
//         });

//       const { body : { id } } = postProducts;
//       getProduct = await chai.request(app).get(`/product/${id}`);
//     } catch (error) {
//       console.log(error.message)
//     }
//   })

//   it('Verifica se é possível criar um novo produto com sucesso', async function() {
//     const { status } = postProducts;

//     expect(status).to.be.equals(201);
//   });

//   afterEach(function () {
//     sinon.restore();
//   });
// });