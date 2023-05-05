const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { product } = require('../../../src/database/controller');
const { productService } = require('../../../src/database/services')
const { allProducts, getByIdProduct, postProduct,
  postedProduct, updateProduct, updatedProduct } = require('./mocks/product.mock');

use(sinonChai);

describe('Verifica a controller de produtos se,', function () {
  describe('na função "getAll",', function () {
    it('é possível receber todos os produtos ', async function () {
      const req = {};
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      
      sinon.stub(productService, 'getAll').resolves(allProducts);
      await product.getAll(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });
  });

  describe('na função "getById", ', function () {
    it('é possível receber um produto de id específico ', async function () {
      const req = {
        params: { id: 1 },
      };
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      
      sinon.stub(productService, 'getById').resolves(getByIdProduct);
      await product.getById(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(getByIdProduct);
    });

    it('retorna um erro caso não encontre um produto específico', async function () {
      const req = {
        params: { id: 999 },
      };
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      
      sinon.stub(productService, 'getById').resolves(undefined);
      await product.getById(req, res);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: 'ID does not exist!' });
    });
  });

  describe('na função "create",', function() {
    it('é possível criar um produto com sucesso', async function() {
      const req = { body: postProduct };
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      
      sinon.stub(productService, 'create').resolves(postedProduct);
      await product.create(req, res);
  
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(postedProduct);
    });
  });

  describe('na função "update",', function() {
    it('é possível atualizar um produto com sucesso', async function() {
      const req = { params: { id: 2 }, body: { ...updateProduct }};
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      
      sinon.stub(productService, 'update').resolves(updatedProduct);
      await product.update(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedProduct);
    });

    it('não é possível atualizar um produto que não exista', async function() {
      const req = { params: { id: 2 }, body: { ...updateProduct }};
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      
      sinon.stub(productService, 'getById').resolves(undefined);
      await product.update(req, res);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: 'Product does not exist!' });
    });

    it('retorna uma mensagem quando o produto não pode ser modificado', async function() {
      const req = { params: { id: 2 }, body: { ...updateProduct }};
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      
      sinon.stub(productService, 'update').resolves(0);
      await product.update(req, res);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: 'Product cannot be changed!' });
    });
  })

  describe('na função "remove",', function() {
    it('é possível remover um produto com sucesso', async function() {
      const req = { params: { id: 3 } };
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      
      sinon.stub(productService, 'remove').resolves(3);
      await product.remove(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Product deleted successfully!' });
    });

    it('não é possível remover um item que não existe', async function() {
      const req = { params: { id: 99 } };
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      
      sinon.stub(productService, 'remove').resolves(undefined);
      await product.remove(req, res);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: 'Product does not exist!' });
    });
  });


  afterEach(function () {
    sinon.restore();
  });
});