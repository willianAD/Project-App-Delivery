const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { user } = require('../../../src/database/controller');
const { userService } = require('../../../src/database/services')
const { allUsers } = require('./mocks/user.mock');

use(sinonChai);

describe('Verifica se na controller, ', function() {
  describe('na função "getAll",', function () {
    it('é possível receber todos os usuários ', async function () {
      const req = {};
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      
      sinon.stub(userService, 'getAll').resolves(allUsers);
      await user.getAll(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allUsers);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});