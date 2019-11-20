import React from 'react';
import { Link } from 'react-router-dom'
import { url } from './url';

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
        }
    }

    validateFields = () => {
        let render = true;
        if (this.refs.usernameRef.value === '' || this.refs.passwordRef.value === '') {
            alert('Please fill all the fields.');
            render = false;
        }
        if (render) {
            this.isValidUser();
        }
    }

    isValidUser = () => {
        fetch(`${url}/login`, {
            mode: 'cors',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: this.refs.usernameRef.value, password: this.refs.passwordRef.value })
        }).then(response => {
            if (response.status === 206) {
                alert('Sorry you entered wrong password.');
                this.refs.passwordRef.value = '';
            } else if (response.status === 404) {
                alert('Sorry you need to register yourself first.');
                this.refs.usernameRef.value = this.refs.passwordRef.value = '';
            }
            else {
                response.json().then(json => {
                    localStorage.setItem('webtoken', json.token);
                    localStorage.setItem('isValid', true);
                    this.props.history.push('/view');
                })
            }
        }).catch((err) => {
            if (err.message === 'Failed to fetch') {
                alert('Server not available plz try after some time....');
                this.refs.usernameRef.value = this.refs.passwordRef.value = '';
            }
        })
    }

    render() {
        return (
            <center>
                {localStorage.getItem('isValid') ?
                    <h1>You are already logged in.</h1> :
                    <form>
                        <br /><br /><br /><h1>Enter your credentials ....</h1><br />
                        Username : <input type="text" ref="usernameRef" /><br /><br />
                        Password : <input type="password" ref="passwordRef" /><br /><br />
                        <input type="button" value="Login" onClick={this.validateFields.bind()}></input><br /><br /><br />
                        <Link to="/register">register here!</Link>
                    </form>}
            </center >
        );
    }
}
