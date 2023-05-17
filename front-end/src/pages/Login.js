import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';
import { ImWarning } from 'react-icons/im';
import { handleUser } from '../redux/actions';
import { requestPost } from '../services/request';
import DrinkUpRM from '../images/DrinkUp.png';
import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisable: true,
      messageError: true,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    history.push('/login');
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.verifyInputs);
  };

  verifyInputs = () => {
    const characters = 6;
    const { email, password } = this.state;
    const rejexEmail = /^[a-zA-Z0-9._-]+@([a-z]+\.)+[\w-]{2,4}$/;
    const validate = (rejexEmail.test(email) && password.length >= characters);

    this.setState({ buttonDisable: !validate });
  };

  handleSubmit = async () => {
    try {
      const { email, password } = this.state;
      const { dispatch, history } = this.props;
      const { token } = await requestPost('/user/login', { email, password });
<<<<<<< HEAD
      const { name, role } = await requestPost('/user/email', { email });

      localStorage.setItem('user', JSON.stringify({
        name, email, role, token,
=======
      const { id, name, role } = await requestPost('/user/email', { email });

      localStorage.setItem('user', JSON.stringify({
        id, name, email, role, token,
>>>>>>> bf77a0a (fix: details to make login possible)
      }));

      if (role === 'customer') {
        history.push('/customer/products');
      } else if (role === 'seller') {
        history.push('/seller/orders');
      } else {
        history.push('/admin/manage');
      }

      dispatch(handleUser(email));
    } catch (error) {
<<<<<<< HEAD
      this.setState({ messageError: false });
      const quatroSeg = 4000;
      setTimeout(() => { this.setState({ messageError: true }); }, quatroSeg);
    }
  };

  createAccount = () => {
    const { history } = this.props;
    history.push('/register');
=======
      return error;
    }
>>>>>>> bf77a0a (fix: details to make login possible)
  };

  render() {
    const { email, password, buttonDisable, messageError } = this.state;
    return (
      <form className="form-login">
        <div className="paiImg-login">
          <img src={ DrinkUpRM } alt="AppLogo" className="img-login" />
        </div>
        <div className="avoInputsButtonsMessageError-login">
          <div className="paiInputs-login">
            <label htmlFor="email">
              <MdOutlineMailOutline className="iconEmail-login" />
              <input
                autoComplete="off"
                id="email"
                name="email"
                type="email"
                data-testid="common_login__input-email"
                placeholder="Digite seu Email"
                value={ email }
                onChange={ this.handleChange }
                className="inputEmail-login"
              />
            </label>
            <label htmlFor="password">
              <FiLock className="iconPassword-login" />
              <input
                id="password"
                name="password"
                type="password"
                data-testid="common_login__input-password"
                placeholder="Digite sua Senha"
                value={ password }
                onChange={ this.handleChange }
                className="inputPassword-login"
              />
            </label>
          </div>
          <div className="paiButtons-login">
            <button
              type="button"
              data-testid="common_login__button-login"
              disabled={ buttonDisable }
              onClick={ this.handleSubmit }
              className="buttonLogin-login"
            >
              LOGIN
            </button>
            <button
              type="button"
              data-testid="common_login__button-register"
              onClick={ this.createAccount }
              className="buttonRegister-login"
            >
              AINDA NÃO TENHO CONTA
            </button>
          </div>
          <div className="paiMessageError-login">
            {
              !messageError ? (
                <span
                  data-testid="common_login__element-invalid-email"
                  className="error-login"
                >
                  <ImWarning className="iconError-login" />
                  <br />
                  Email e Password devem ser validos!
                  <div className="progress-login" />
                </span>
              ) : null
            }
          </div>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
