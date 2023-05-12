import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestPost, setToken } from '../services/request';
import AdminList from '../components/AdminList';

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

  async componentDidMount() {
    const { token, role } = JSON.parse(localStorage.getItem('user'));
    this.setState({ roleAtual: role });
    await setToken(token);
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
    }
  };

  render() {
    const { email,
      password, buttonDisable, name, messageError, role, url, roleAtual } = this.state;
    return (
      <div>
        {
          url === '/admin/manage' && roleAtual === 'administrator'
            ? (
              <div>
                <h1>Cadastro novo usuário</h1>
                {!messageError
                  ? (
                    <span data-testid="admin_manage__element-invalid-register">
                      Email e Password devem ser validos!
                    </span>
                  ) : null}
                <label htmlFor="name">
                  Nome
                  <input
                    id="name"
                    name="name"
                    type="name"
                    data-testid="admin_manage__input-name"
                    placeholder="Nome e sobrenome"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="email">
                  Email
                  <input
                    id="email"
                    name="email"
                    type="email"
                    data-testid="admin_manage__input-email"
                    placeholder="Seu Email"
                    value={ email }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="password">
                  Senha
                  <input
                    id="password"
                    name="password"
                    type="password"
                    data-testid="admin_manage__input-password"
                    placeholder="Digite sua Senha"
                    value={ password }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="role">
                  Tipo:
                  <select
                    name="role"
                    id="role"
                    data-testid="admin_manage__select-role"
                    value={ role }
                    onChange={ this.handleChange }
                  >
                    {/* <option>DEFAULT</option> */}
                    <option value="customer">Comprador</option>
                    <option value="seller">Vendedor</option>
                    <option value="administrator">admin</option>
                  </select>
                </label>
                <button
                  type="button"
                  data-testid="admin_manage__button-register"
                  disabled={ buttonDisable }
                  onClick={ this.handleSubmit }
                >
                  CADASTRAR
                </button>
                <AdminList />
              </div>
            )
            : null
        }
      </div>
    );
  }
}

Admin.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Admin);
