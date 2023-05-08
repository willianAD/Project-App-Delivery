const chai = require('chai');
const { use, expect } = chai;
const { stub } = require('sinon');
const chaiHttp = require('chai-http');

use(chaiHttp);

const app = require('../../api/app');
const { allProducts, productMock } = require('./mocks/product.mock');

describe(' Verifica a rota Product', () => {
  describe('get: ', () => {
    describe('quando tenta verificar todos os itens do banco', () => {
      let getProduct;
      before(async () => {
        try {  
          getProduct = await chai.request(app)
            .get(`/product/`);
        } catch (error) {
          console.error(error.message);
        }
      });
      it('retorna status 200 - OK', () => {
        const { status } = getProduct;
  
        expect(status).to.be.equals(200);
      });
      it('retorna todos os itens', () => {
        const { body } = getProduct;
  
        expect(body).to.be.deep.equals(allProducts);
      });
    });

    describe('quando tenta verificar um item específico existente', () => {
      let getProduct;
      before(async () => {
        try {  
          getProduct = await chai.request(app)
            .get(`/product/1`);
        } catch (error) {
          console.error(error.message);
        }
      });
      it('retorna status 200 - OK', () => {
        const { status } = getProduct;
  
        expect(status).to.be.equals(200);
      });
      it('retorna o item correto', () => {
        const { body } = getProduct;
  
        expect(body).to.be.deep.equals(allProducts[0]);
      });
    });

    describe('quando tenta verificar um item específico inexistente', () => {
      let getProduct;
      before(async () => {
        try {  
          getProduct = await chai.request(app)
            .get(`/product/100000`);
        } catch (error) {
          console.error(error.message);
        }
      });
      it('retorna status 400 - Bad Request', () => {
        const { status } = getProduct;
  
        expect(status).to.be.equals(400);
      });
      it('retorna o item correto', () => {
        const { body: { message } } = getProduct;
  
        expect(message).to.be.deep.equals('ID does not exist!');
      });
    });
  });

  describe('post: ', () => {
    describe('quando os dados do "body" são válidos', () => {
      let postProduct;
      let getProduct;

      before(async () => {
        try {
          postProduct = await chai.request(app)
            .post('/product')
            .send({...productMock});
    
          const { body : { id } } = postProduct;
    
          getProduct = await chai.request(app)
            .get(`/product/${id}`);
    
          deleteProduct = await chai.request(app)
          .delete(`/product/${id}`);
        } catch (error) {
          console.error(error.message);
        }
      });
      it('retorna status 201 - Created', () => {
        const { status } = postProduct;
  
        expect(status).to.be.equals(201);
      });
      it('retorna um atributo `id`, que é um número', async () => {
        const { body: { id } } = postProduct;
  
        expect(typeof id).to.be.equals('number');
      });
      it('retorna todos os campos corretamente', async () => {
        const { body: { name, price, urlImage } } = getProduct;
  
        expect(name).to.be.equals(productMock.name);
        expect(price).to.be.equals(productMock.price);
        expect(urlImage).to.be.equals(productMock.urlImage);
      });
  
      it('é possível consultar a pessoa criada através do `id` retornado', async () => {
        const { body: { id: postId } } = postProduct;
        const { body: { id: getId } } = getProduct;
  
        expect(postId).to.be.equals(getId);
      });
    });

    describe('quando os dados do `body` não são válidos', () => {
      let postProduct;
  
      before(async () => {
        try {
          // removendo price
          postProduct = await chai.request(app)
            .post('/product')
            .send({name: productMock.name, urlImage: productMock.urlImage});
        } catch (error) {
          console.error(error.message);
        }
      });
      
      it('retorna status 400 - Bad Request', async () => {
        const { status } = postProduct;
      
        expect(status).to.be.equals(400);
      });
  
      it('retorna uma menssagem de erro', async () => {
        const { body: { message } } = postProduct;
      
        expect(message).to.be.equals('Some required fields are missing!');
      });
    });
  });

  describe('delete: ', () => {
    describe('quando tentamos deletar um item existente', () => {
      let postProduct;
      let deleteProduct;
        before(async () => {
          try {
            postProduct = await chai.request(app)
              .post('/product')
              .send({...productMock});
    
           const { body : { id } } = postProduct;
    
            getProduct = await chai.request(app)
              .get(`/product/${id}`);
    
            deleteProduct = await chai.request(app)
            .delete(`/product/${id}`);
          } catch (error) {
            console.error(error.message);
          }
        });
        it('retorna status 200 - OK', () => {
          const { status } = deleteProduct;
    
          expect(status).to.be.equals(200);
        });
        it('retorna uma menssagem ao deletar o produto', () => {
          const { body: { message } } = deleteProduct;
    
          expect(message).to.be.equals('Product deleted successfully!');
        });
      });
      describe('quando tentamos deletar um item inexistente', () => {
        let deleteProduct;
        before(async () => {
          try {  
            deleteProduct = await chai.request(app)
              .delete('/product/100000');
          } catch (error) {
            console.error(error.message);
          }
        });
        it('retorna um status 400 - Bad Request', () => {
          const { status } = deleteProduct;
    
          expect(status).to.be.equals(400);
        });
        it('retorna uma menssagem de erro', () => {
          const { body: { message } } = deleteProduct;
    
          expect(message).to.be.equals('Product does not exist!');
        });
      })
  })
});
