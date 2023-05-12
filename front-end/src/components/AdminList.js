import React from 'react';
// import { requestGet } from '../services/request';

class AdminList extends React.Component {
  // constructor() {
  //   super();
  //   // this.state = {
  //   //   messageError: true,
  //   // };
  // }
  // handleDelete = async () => {
  //   try {

  //   } catch (error) {
  //     this.setState({ messageError: false });
  //   }
  // };
  componentDidMount() {
    console.log('oi');
  }

  render() {
    return (
      <>
        <h1>Lista de usuários</h1>
        {/* <table>
          <thead>
            Item
          </thead>
        </table> */}
        <button
          type="button"
          data-testid="admin_manage__button-register"
          // disabled={ buttonDisable }
          // onClick={ this.handleSubmit }
        >
          Excluir
        </button>
      </>
    );
  }
}

export default AdminList;
