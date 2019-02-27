import React, {Component} from 'react'
import {Route,Redirect } from 'react-router-dom';


class Login extends Component {

 state = {
      email:"",
      password:"",
      isAuth:false
    };

    componentDidMount = () => {
      if(localStorage.getItem('auth_token')){
      }
    }
  
   onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
   }

    render () {
       return (
         <div>
        <form onSubmit={(e)=> {this.props.onSubmitLogin(this.state,e)}}>
          <div className="form-group">
            <div className="row">
              <div className="col-md-9">
                <label htmlFor="exampleInputEmail1">email</label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          name="email"
                          onChange={this.onChange}
                    
                        />
          <label htmlFor="exampleInputEmail2">pass</label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputEmail2"
                          name="password"
                          onChange={this.onChange}
                        />
              
          <button
            type="submit"
            onClick={this.onSubmit}
            className="btn btn-block"
          >
            login
          </button>
          </div>
          </div>
          </div>
        </form>
        </div>
      )


     }
 }
  

export default Login