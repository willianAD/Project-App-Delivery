import React from 'react';
import { requestDelete, requestGet } from '../services/request';

class AdminList extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    const users = await requestGet('/user');
    this.setState({ users });
    console.log(users);
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
  }

  handleDelete = async ({ target }) => {
    try {
      await requestDelete(`/user/${target.value}`);
      const users = await requestGet('/user');
      this.setState({ users });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { users } = this.state;
    return (
      <div>
        <h1>Lista de usuários</h1>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {users.map((ele, i) => (
              <tr key={ ele.id }>
                <td data-testid={ `admin_manage__element-user-table-item-number-${i}` }>
                  {ele.id}
                </td>
                <td data-testid={ `admin_manage__element-user-table-name-${i}` }>
                  {ele.name}
                </td>
                <td data-testid={ `admin_manage__element-user-table-email-${i}` }>
                  {ele.email}
                </td>
                <td data-testid={ `admin_manage__element-user-table-role-${i}` }>
                  {ele.role}
                </td>
                <td>
                  <button
                    type="button"
                    data-testid={ `admin_manage__element-user-table-remove-${i}` }
                    value={ ele.id }
                    onClick={ this.handleDelete }
                  >
                    Excluir
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminList;
