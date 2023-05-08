// import * as sinon from 'sinon';
// import * as chai from 'chai';
// import * as jwt from 'jsonwebtoken';
// import * as bcryptjs from 'bcryptjs';
// const { app } = require('../app');
// const { UserModel } = require('../database/models/UsersModel');
// const { validateLogin } = require('../database/middleware');
// const chaiHttp = require('chai-http');
// const { Response } = require('superagent');
// const { Model } = require('sequelize');

// chai.use(chaiHttp);
// const { expect  } = chai;

// //import { IUser } from '../intefaces/IUser';
// //import { IPayload } from '../intefaces/IPayload';

// //const verificaLogin: IUser = {
// //  username: "admin",
// //  role: "admin",
// //  email: "admin@admin.com",
// //  password: bcryptjs.hashSync("secret_admin", 10),
// //};

// //const token: string = jwt.sign({ payload: verificaLogin } as IPayload, process.env.SECRET_KEY as string, {
// //  expiresIn: "24h",
// //});

        
// //const verificaLogin = {
// //  email: "admin@admin.com",
// //  password: bcryptjs.hashSync("secret_admin", 10),
// //};


// const verificaLogin = {
//   email: "admin@admin.com",
//   password: bcryptjs.hashSync("secret_admin", 10),
// };

// sinon.stub(UserModel, 'findOne').resolves(verificaLogin as unknown as User);

// const token = jwt.sign({ payload: verificaLogin } as payload, process.env.SECRET_KEY as string, {
//   expiresIn: "24h",
// });

// describe('/login', async () => {
//   let resChaiHttp: Response;
//   //afterEach(function () {
//     //  sinon.restore();
//     //});
//     it('Retorna status 200 quando o login estiver correto', async function () {
//       //sinon.stub(Model, 'findOneLogin').resolves(verificaLogin as unknown as User);
//       sinon.stub(UserModel, 'findOne').resolves(verificaLogin as unknown as User);
//       resChaiHttp = await chai.request(app).post('/login').send({

    
//   });
//     expect(resChaiHttp.status).to.be.deep.equal(200);
// });


// it('retornar status 401 caso o email tenha um formato inválido', async () => {
//   const httpResponse = await chai.request(app).post('/login').send({
//   email: 'ad/_45dasioj',
//   password: '12345'
//   }) 
//   expect(httpResponse.status).to.be.equal(401)
//   expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' })
//   });

// it('retornar status 401 se a senha tiver menos de 6 caracteres', async () => {
//   const httpResponse = await chai.request(app).post('/login').send({
//   email: 'admin@admin.com',
//   password: '12345'
//   }) 
//   expect(httpResponse.status).to.be.equal(401)
//   expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' })
//   })

// it('retornar status 401 caso o email tenha um formato inválido', async () => {
//   const httpResponse = await chai.request(app).post('/login').send({
//   email: 'ad/_45dasioj',
//   password: '123456'
//   }) 
//   expect(httpResponse.status).to.be.equal(401)
//   expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' })
//   })

// it('informar após a tentativa que o login é inválido, retorna status 404', async () => {
// const httpResponse = await chai.request(app).post('/login').send({
// email: 'admin@admin.com',
// password: '',
// }) 
// expect(httpResponse.status).to.be.equal(404)
// expect(httpResponse.body).to.be.deep.equal({ message: 'Not found' })
// })
// //afterEach(function () {
// //  sinon.restore();
// //});
// });