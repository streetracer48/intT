import React, { Component } from "react";
import { getList, addToList, deleteItem, updateItem,loginUser } from "./actionsCreator";
import LoginForm from './login/loginForm'


class Home extends Component {
  
  state = {
      id: "",
      title: "",
      items: [],
      isAuth:false
    };

  componentDidMount() {
    this.getAll();
  }

  onChange = event => {
    this.setState({ title: event.target.value });
    
  };

  getAll = () => {
    getList().then(data => {
      this.setState(
        {
          title: "",
          items: [...data]
        },
        () => {
          
        }
      );
    });
  };

  onSubmitLogin =(userdata,e) => {
    e.preventDefault();
  loginUser(userdata)
  if(localStorage.getItem('auth_token'))
  {
    this.setState({
      ...this.state,
      isAuth:true 
    })
  }
  };

  onSubmit = e => {
    e.preventDefault();
    addToList(this.state.title).then(() => {

      this.getAll();
    });
  };

  onUpdate = e => {
    e.preventDefault();
    updateItem(this.state.title, this.state.id).then(() => {
      this.getAll();
    });
  };

  onEdit = (item, itemid, e) => {
    e.preventDefault();
    this.setState({
      id: itemid,
      title: item
    });
  };

  componentDidMount = () => {
    if(localStorage.getItem('auth_token')){
        this.setState({
            ...this.state,
            isAuth:true
        })
    }
  }

  onDelete = (val, e) => {
    e.preventDefault();
    deleteItem(val);

    var data = [...this.state.items];
    data.filter(function(item, index) {
      if (item[1] === val) {
        data.splice(index, 1);
      }
    });
    this.setState({ items: [...data] });
  };
  handleLogout = () => {
    localStorage.removeItem('auth_token');
    this.setState({
        ...this.state,
        isAuth:false
    })
}
  renderAuthButtons(isAuth) {
    if (isAuth) {
        console.log('true login')
      return <a className='' onClick={this.handleLogout}>Logout</a>
    }

    return (
      <LoginForm onSubmitLogin={(userdata,e) =>{this.onSubmitLogin(userdata,e)}}/>
    )
  }
    


  render() {
    return (
      <div className="container">
      <div className="col-md-6">
           {this.renderAuthButtons(this.state.isAuth)}
          </div>
      <div className="col-md-6 mx-auto">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
         
            <div className="row">
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="enter your task"
                  value={this.state.title || ""}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn "
                  onClick={(e)=>{this.onUpdate(e)}}
                >
                ✓
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={this.onSubmit}
            className="btn "
          >
            add
          </button>
        </form>
        <table className="table">
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                <td className="text-left">{item[0]}</td>
                <td className="text-right">
                  <button
                    href=""
                    className="btn"
                    onClick={(e)=>{this.onEdit(item[0], item[1],e)}}
                  >
                    ✓
                  </button>
                  <button
                    href=""
                    className="btn"
                    onClick={(e) =>{this.onDelete(item[1],e)}}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>  
    );
  }
}

export default Home;
