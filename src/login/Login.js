import React, {Component} from "react";
import {AuthService} from "./AuthService";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {email: '', password: '', successMsg: ''};

        this.onSubmit = this.onSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        AuthService.signinUser({email: this.state.email, password: this.state.password}).then(() => {
            this.setState({successMsg: 'Login success'});
        }).catch(() => {
            this.setState({successMsg: 'Wrong credentials!'});
        });
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h4>{this.state.successMsg}</h4>
                <div className="row">
                    <label htmlFor="loginName">User</label>
                    <input type="text" id="loginName" value={this.state.email} onChange={this.handleEmailChange}/>
                </div>
                <div className="row">
                    <label htmlFor="userPassword">Password</label>
                    <input type="password" id="userPassword" value={this.state.password}
                           onChange={this.handlePasswordChange}/>
                </div>
                <div className="row">
                    <input type="submit" value="Login"/>
                </div>
            </form>
        );
    }
}

export default Login;