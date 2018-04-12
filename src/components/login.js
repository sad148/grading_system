import React, {Component} from 'react'
import {connect} from 'react-redux';
import login from '../actions/login'
import {browserHistory} from 'react-router'

class Login extends Component {
    componentWillMount = () => {
        sessionStorage.clear();
    }

    componentWillReceiveProps = (nextprops) => {
        if (nextprops.login) {
            if (nextprops.role == 1) {
                browserHistory.replace("/professor");
            } else {
                browserHistory.replace("/grader");
            }
        }
    }

    submitLogin = () => {
        let username = document.getElementById("username").value;
        username = username.trim();
        let password = document.getElementById("password").value
        if (username.length == 0) {

        } else if (password.length == 0) {

        } else {
            this.props.dispatch(login(username, password));
            //browserHistory.replace();
        }
    }

    render = () => {
        return (
            <div id={"login"} style={{backgroundImage: 'url(../login_bg.jpg)'}}>
                <div id={"usernameDiv"}>
                    <label>Username</label>
                    <input id={"username"} autoComplete={false} type={"text"}></input>
                </div>
                <div id={"passwordDiv"}>
                    <label>Password</label>
                    <input id="password" autoComplete={false} type={"password"}></input>
                </div>
                <div id={"login"}>
                    <input type={"submit"} id={"login"} value={"Login"} onClick={this.submitLogin}/>
                </div>
                <div id={"register"}>
                    <input type={"submit"} id={"register"} value={"Register"}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        login: store.login.loginFlag,
        role: store.login.role,
        userid: store.login.userid
    }
}

export default connect(mapStateToProps)(Login);