import React from "react";
import axios from 'axios';
import '../App.css';
import Navbar from "./navbar";

class AddNewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            role: '',
            archived: '',
            firstName: '',
            lastName: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let props = this.props;
        let data;
        data = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role,
            archived: this.state.archived,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        };

        axios.post('http://localhost:3000/api/v1/users/', data)
            .then(function (response) {
                console.log(response);
                console.log(data);
                if (response.status === 201) {
                    props.history.push('/admin');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const navMenu = ['Admin View', 'Log-out'];
        const navMenuLink = ['admin', '/'];

        return (
            <section>
                <Navbar navMenu={navMenu} navMenuLink={navMenuLink}/>
                <div className="container">
                    <div className="row justify-content-sm-center">
                        <div className="col-sm-6 editform">
                            <form className="form-signin" onSubmit={(e) => this.handleSubmit(e)}>
                                <h3>Add New User</h3>
                                <label htmlFor="inputEmail" className="sr-only">Username</label>
                                <input type="text" name="username" value={this.state.username}
                                       className="form-control"
                                       placeholder="Username"
                                       onChange={this.handleInputChange}
                                       required autoFocus/>
                                <label htmlFor="inputPassword" className="sr-only">Password</label>
                                <input type="password" required name="password" id="inputPassword" className="form-control"
                                       placeholder="Password" onChange={this.handleInputChange}
                                />
                                <label>First Name</label>
                                <input type="text" required name="firstName" value={this.state.firstName}
                                       className="form-control"
                                       placeholder="First Name" onChange={this.handleInputChange}
                                />
                                <label>Last Name</label>
                                <input type="text" required name="lastName" value={this.state.lastName}
                                       className="form-control"
                                       placeholder="Last Name" onChange={this.handleInputChange}
                                />

                                <label>Role</label>
                                <select name="role" required onChange={this.handleInputChange} value={this.state.role}>
                                    <option value="admin" selected>Admin</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="student">Student</option>
                                </select>

                                <br/>

                                <label>Archived</label>

                                <select name="archived" required value={this.state.archived} onChange={this.handleInputChange}>
                                    <option value="true">True</option>
                                    <option value="false" selected>False</option>
                                </select>

                                <br/>

                                <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default AddNewUser;


