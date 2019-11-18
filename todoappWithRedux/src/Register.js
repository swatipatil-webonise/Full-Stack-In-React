import React from 'react';
import { url } from './url';

const Email_Format = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

export default class Register extends React.Component {

    validateFields = () => {
        let render = true;
        if (this.refs.firstnameRef.value === '' || this.refs.usernameRef.value === '' || this.refs.passwordRef.value === '' || this.refs.emailRef.value === '') {
            alert('Please fill all the fields.');
            render = false;
        } else if (!Email_Format.test(this.refs.emailRef.value)) {
            alert('Please enter correct email id.');
            this.refs.emailRef.value = ''
            render = false;
        }
        if (render) {
            this.registerUser();
        }
    }

    registerUser = () => {
        fetch(`${url}/register`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.refs.firstnameRef.value,
                username: this.refs.usernameRef.value,
                password: this.refs.passwordRef.value,
                email: this.refs.emailRef.value
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    alert('You registered successfully.');
                    this.props.history.push('/view');
                } else if (response.status === 205) {
                    alert('Entered username is not available for you try another.');
                    this.refs.usernameRef.value = '';
                } else if (response.status === 206) {
                    alert('Entered email is not available for you try another.');
                    this.refs.emailRef.value = '';
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <form>
                <center><br></br>
                    <h1>Register yourself here.......</h1><br></br>
                    <table>
                        <tr><td>First Name : </td><td><input type="text" ref="firstnameRef" /></td></tr>
                        <tr><td>Username : </td><td><input type="text" ref="usernameRef" /></td></tr>
                        <tr><td>Password : </td><td><input type="password" ref="passwordRef" /></td></tr>
                        <tr><td>Email : </td><td><input type="email" ref="emailRef" /></td></tr>
                    </table>
                    <input type="button" value="Register" onClick={this.validateFields.bind(this)}></input><br /><br /><br />
                </center>
            </form>
        );
    }
}
