import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';
import { TbSelector } from 'react-icons/tb';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { ImWarning } from 'react-icons/im';
import { requestPost, setToken } from '../services/request';
import AdminList from '../components/AdminList';
import PageNotFound from '../components/PageNotFound';
import '../styles/admin.css';
import NavBar from '../components/NavBar';

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      role: 'customer',
      buttonDisable: true,
      messageError: true,
      url: window.location.pathname,
      roleAtual: 'customer',
    };
  }

  componentDidMount() {
    const { token, role } = JSON.parse(localStorage.getItem('user'));
    this.setState({ roleAtual: role });
    setToken(token);
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

  handleSubmit = async () => {
    try {
      const { name, email, password, role } = this.state;
      await requestPost('/user/admin', { name, email, password, role });
      this.setState({
        name: '',
        email: '',
        password: '',
        role: 'customer',
      });
    } catch (error) {
      this.setState({ messageError: false });
      const quatroSeg = 4000;
      setTimeout(() => { this.setState({ messageError: true }); }, quatroSeg);
    }
  };

  render() {
    const { email, password, buttonDisable,
      name, messageError, role, url, roleAtual } = this.state;
    return (
      <div>
        <NavBar />
        {
          url === '/admin/manage' && roleAtual === 'administrator'
            ? (
              <div>
                <h1 className="title-admin">Cadastro novo usuário</h1>
                <div className="paiMessageError-register">
                  {!messageError
                    ? (
                      <span
                        data-testid="admin_manage__element-invalid-register"
                        className="error-register"
                      >
                        <ImWarning className="iconError-register" />
                        Email e Password devem ser validos!
                        <div className="progress-register" />
                      </span>
                    ) : null}
                </div>
                <div className="paiForm-Admin">
                  <label htmlFor="name" className="inputPai-admin">
                    <AiOutlineUserAdd className="iconName-admin" />
                    <input
                      id="name"
                      name="name"
                      type="name"
                      data-testid="admin_manage__input-name"
                      placeholder="Nome e sobrenome"
                      value={ name }
                      onChange={ this.handleChange }
                      className="inputName-admin"
                    />
                  </label>
                  <label htmlFor="email" className="inputPai-admin">
                    <MdOutlineMailOutline className="iconEmail-admin" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      data-testid="admin_manage__input-email"
                      placeholder="Seu Email"
                      value={ email }
                      onChange={ this.handleChange }
                      className="inputEmail-admin"
                    />
                  </label>
                  <label htmlFor="password" className="inputPai-admin">
                    <FiLock className="iconPassword-admin" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      data-testid="admin_manage__input-password"
                      placeholder="Digite sua Senha"
                      value={ password }
                      onChange={ this.handleChange }
                      className="inputPassword-admin"
                    />
                  </label>
                  <label htmlFor="role" className="inputPai-admin">
                    <TbSelector className="iconRole-admin" />
                    <select
                      name="role"
                      id="role"
                      data-testid="admin_manage__select-role"
                      value={ role }
                      onChange={ this.handleChange }
                      className="inputRole-admin"
                    >
                      <option value="customer">Comprador</option>
                      <option value="seller">Vendedor</option>
                      <option value="administrator">admin</option>
                    </select>
                  </label>
                </div>
                <div className="btn-admin">
                  <button
                    type="button"
                    data-testid="admin_manage__button-register"
                    disabled={ buttonDisable }
                    onClick={ this.handleSubmit }
                    className="buttonRegister-admin"
                  >
                    CADASTRAR
                  </button>
                </div>
                <AdminList />
              </div>
            )
            : <PageNotFound />
        }
      </div>
    );
  }
}

Admin.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Admin);
