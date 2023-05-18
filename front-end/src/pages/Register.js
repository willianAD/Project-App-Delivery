import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';
import { ImWarning } from 'react-icons/im';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { TbArrowBackUp } from 'react-icons/tb';
import { requestPost } from '../services/request';
import DrinkUpRM from '../images/DrinkUp.png';
import '../styles/register.css';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      buttonDisable: true,
      messageError: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.verifyInputs);
  };

  verifyInputs = () => {
    const nameMax = 12;
    const passwordMin = 6;
    const { name, email, password } = this.state;
    const rejexEmail = /^[a-zA-Z0-9._-]+@([a-z]+\.)+[\w-]{2,4}$/;
    const validate = (rejexEmail.test(email) && name.length >= nameMax
      && password.length >= passwordMin);

    this.setState({ buttonDisable: !validate });
  };

  backToLogin = async () => {
    const { history } = this.props;
    history.push('/login');
  };

  handleSubmit = async () => {
    try {
      const { name, email, password } = this.state;
      const { history } = this.props;

      const { token } = await requestPost('/user', { name, email, password });

      localStorage.setItem('user', JSON.stringify({
        name, email, role: 'customer', token,
      }));

      history.push('/customer/products');
    } catch (error) {
      this.setState({ messageError: false });
      const quatroSeg = 4000;
      setTimeout(() => { this.setState({ messageError: true }); }, quatroSeg);
    }
  };

  render() {
    const { name, email, password, buttonDisable, messageError } = this.state;
    return (
      <form className="form-register">
        <button
          type="button"
          onClick={ this.backToLogin }
          className="buttonBack-register"
        >
          <TbArrowBackUp />
        </button>
        <div className="paiImg-register">
          <img src={ DrinkUpRM } alt="AppLogo" className="img-register" />
        </div>
        <div className="avoInputsButtonsMessageError-register">
          <h1 className="title-register">CADASTRO</h1>
          <div className="paiInputs-register">
            <label htmlFor="name">
              <AiOutlineUserAdd className="iconName-register" />
              <input
                id="name"
                name="name"
                type="name"
                data-testid="common_register__input-name"
                placeholder="Seu nome"
                value={ name }
                onChange={ this.handleChange }
                className="inputName-register"
              />
            </label>
            <label htmlFor="email">
              <MdOutlineMailOutline className="iconEmail-register" />
              <input
                id="email"
                name="email"
                type="email"
                data-testid="common_register__input-email"
                placeholder="Digite seu Email"
                value={ email }
                onChange={ this.handleChange }
                className="inputEmail-register"
              />
            </label>
            <label htmlFor="password">
              <FiLock className="iconPassword-register" />
              <input
                id="password"
                name="password"
                type="password"
                data-testid="common_register__input-password"
                placeholder="Digite sua Senha"
                value={ password }
                onChange={ this.handleChange }
                className="inputPassword-register"
              />
            </label>
          </div>
          <div className="paiButtons-register">
            <button
              type="button"
              data-testid="common_register__button-register"
              disabled={ buttonDisable }
              onClick={ this.handleSubmit }
              className="buttonRegister-register"
            >
              CADASTRAR
            </button>
          </div>
          <div className="paiMessageError-register">
            {
              !messageError ? (
                <span
                  data-testid="common_register__element-invalid_register"
                  className="error-register"
                >
                  <ImWarning className="iconError-register" />
                  Dados Invalidos, preencha os campos corretamente!
                  <div className="progress-register" />
                </span>
              ) : null
            }
          </div>
        </div>
      </form>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Register;
