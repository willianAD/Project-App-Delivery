const chai = require('chai');
const { use, expect } = chai;
const { stub } = require('sinon');
const chaiHttp = require('chai-http');

use(chaiHttp);

const app = require('../../api/app');
const { allUsers } = require('./mocks/user.mock');

describe(' Verifica a rota User', () => {
  describe('get: ', () => {
    describe('quando tenta pegar todos os itens do banco', () => {
      let getUser;
      before(async () => {
        try {  
          getUser = await chai.request(app)
            .get(`/user/`);
        } catch (error) {
          console.error(error.message);
        }
      });
      it('retorna status 200 - OK', () => {
        const { status } = getUser;
  
        expect(status).to.be.equals(200);
      });
      it('retorna todos os itens', () => {
        const { body } = getUser;
  
        expect(body).to.be.deep.equals(allUsers);
      });
    });
  });
});
