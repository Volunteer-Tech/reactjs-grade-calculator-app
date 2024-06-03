import React from "react";
import axios from 'axios';
import '../App.css';
import Navbar from "./navbar";

class AddNewClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            className: '',
            archived: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let props = this.props;
        let data;
        data = {
            className: this.state.className,
            archived: this.state.archived
        };

        axios.post('http://localhost:3000/api/v1/classes/', data)
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
                                <h3>Add New Class</h3>
                                <label htmlFor="inputEmail" className="sr-only">Class Name</label>
                                <input type="text" name="className" value={this.state.className}
                                       className="form-control"
                                       placeholder="Class Name"
                                       onChange={this.handleInputChange}
                                       required autoFocus/>

                                <label>Archived</label>

                                <select name="archived" required value={this.state.archived} onChange={this.handleInputChange}>
                                    <option value="false" selected>False</option>
                                    <option value="true">True</option>
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

export default AddNewClass;


