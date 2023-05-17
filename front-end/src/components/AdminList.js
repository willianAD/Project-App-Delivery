import React from 'react';
// import { MdOutlineDelete } from 'react-icons/md';
import { requestDelete, requestGet, setToken } from '../services/request';
import '../styles/adminList.css';

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

    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
  }

  async componentDidUpdate() {
    const users = await requestGet('/user');
    this.setState({ users });
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
      <div className="paiTable-adminList">
        <h1 className="title-adminList">Lista de usuários</h1>
        {/* <div className="paiSearch">
          <label htmlFor="search" className="inputPai-admin">
            <input
              id="search"
              name="search"
              type="search"
              data-testid="admin_manage__input-search"
              placeholder="Pesquise por nome, email ou tipo"
              value={ search }
              onChange={ this.handleChange }
              className="inputSearch-adminList"
            />
            <button
              type="submit"
              onClick={ this.search }
              className="btnSearch-adminList"
            >
              <p>{ searchBtn }</p>
            </button>
          </label>
        </div> */}
        <table className="table-adminList">
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
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${i}` }
                  data-label="Item"
                >
                  {ele.id}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${i}` }
                  data-label="Nome"
                >
                  {ele.name}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-email-${i}` }
                  data-label="Email"
                >
                  {ele.email}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${i}` }
                  data-label="Tipo"
                >
                  {ele.role}
                </td>
                <td data-label="Excluir" className="paibtnDelete-adminList">
                  <button
                    type="button"
                    data-testid={ `admin_manage__element-user-table-remove-${ele.id}` }
                    value={ ele.id }
                    onClick={ this.handleDelete }
                    className="btnDelete-adminList"
                  >
                    Excluir
                    {/* <MdOutlineDelete className="iconDelete-adminList" value={ ele.id } /> */}
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
        {users.length === 0
          ? <h2 className="anyRegister">Não existe nenhum usuário cadastrado!</h2> : null}
      </div>
    );
  }
}

export default AdminList;
