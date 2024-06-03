import React from "react";
import {Link} from "react-router-dom";
import '../App.css';
import axios from 'axios';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberMe: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    /*
    * handle form submit event
    * */
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post('http://localhost:3000/api/v1/users/login', data)
            .then(response => {
                const users = response.data;
                console.log(JSON.stringify(users));
                //console.log(products[1].product_id);

                if (response.status === 200) {
                    if (users.role === "admin") {
                        this.props.history.push({pathname: '/admin', userid: users.userid});
                    } else if (users.role === "teacher") {
                        this.props.history.push({pathname: '/teacher', userid: users.userid});
                    } else if (users.role === "student") {
                        this.props.history.push({pathname: '/student', userid: users.userid});
                    }
                }
            }).catch(error => {
            console.error(error)
        });
    }

    render() {
        return (
            <section className="d-flex align-items-center justify-content-sm-center col-sm-12">
                <div className="col-sm-4 loginpage">
                    <form className="form-signin" onSubmit={(e) => this.handleSubmit(e)}>
                        <a href="#"><img className="mb-4" src="elearning.png"
                                         alt="" width="72" height="72"/> <span>School Grading System</span></a>
                        <h1 className="h3 mb-3">Please sign in</h1>
                        <label htmlFor="inputEmail" className="sr-only">Username</label>
                        <input type="text" name="username" className="form-control" placeholder="Username"
                               required autoFocus value={this.state.username} onChange={this.handleInputChange}/>
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" name="password" value={this.state.password} id="inputPassword" className="form-control"
                               placeholder="Password" onChange={this.handleInputChange}
                               required/>
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" name="remember_me"/> Remember me </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    </form>
                </div>
            </section>
        )
    }
}

export default LoginPage;


