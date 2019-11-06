import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';

class Login extends Component {
    state = { 
        email:'',
        password:''
     }
     leerDatos= e =>{
         this.setState({[e.target.name]:e.target.value});
     }
     validar= e =>{
        e.preventDefault();
        const { firebase } = this.props;
        firebase.login({
            email:this.state.email,
            password:this.state.password
        }).then(result => {
            console.log(result)
        }).catch(error =>{
            console.log(error)
        })

     }
    render() { 
        return (
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                <i className="fas fa-lock"></i> Iniciar Sesión
                            </h2>
                            <form onSubmit={this.validar}>
                                <div className="form-group">
                                    <label for="InputEmail">Email address: </label>
                                    <input 
                                        type="email"
                                        className="form-control" 
                                        id="InputEmail" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Enter email" 
                                        name="email" 
                                        required 
                                        onChange={this.leerDatos}/>
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label for="InputPassword">Password: </label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="InputPassword" 
                                        name="password" 
                                        placeholder="Password" 
                                        required 
                                        onChange={this.leerDatos}/>
                                </div>
                                <input type="submit" className="btn btn_block btn-primary" value="Login"/> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}
 
export default firebaseConnect()(Login);