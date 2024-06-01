import React from "react";
import axios from 'axios';
import '../App.css';
import Navbar from "./navbar";
import {Link} from "react-router-dom";

class AssignStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            className: '',
            classId: '',
            studentId: '',
            archived: '',
            users: '',
            classes: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/users/search?role=student")
            .then(response => {
                const users = response.data;
                console.log(JSON.stringify(users));
                //console.log(products[1].product_id);
                this.setState({
                    users: users
                });
            });
        axios.get("http://localhost:3000/api/v1/classes")
            .then(response => {
                const classes = response.data;
                console.log(JSON.stringify(classes));
                //console.log(products[1].product_id);
                this.setState({
                    classes: classes
                });
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        let props = this.props;
        let data;
        data = {
            classId: this.state.classId,
            studentId: this.state.studentId,
            archived: this.state.archived
        };

        axios.delete("http://localhost:3000/api/v1/admission/" + this.state.studentId)
            .then(response => {
                if (response.status === 200) {
                    console.log("deleting admitted student from the admission table");
                } else {
                    console.log("admitted student deletions failed");
                }
            }).catch(function (error) {
            console.log(error);
        });

        axios.post('http://localhost:3000/api/v1/admission/', data)
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

        const userList = [];
        const classList = [];
        try {
            var temp = this.state.users;
            let myComponent = this;
            temp.map(function (index) {
                let tempUserId = index.userid;
                return userList.push(
                    <option value={index.userid}>{index.firstName} {index.lastName}</option>
                );
            });

            /*
            * class management
            * */
            var tempClass = this.state.classes;
            tempClass.map(function (index) {
                let tempClassId = index.classId;
                return classList.push(
                    <option value={index.classId}>{index.className}</option>
                );
            });
        }catch (e) {
            console.log(e);
        }

        return (
            <section>
                <Navbar navMenu={navMenu} navMenuLink={navMenuLink}/>
                <div className="container">
                    <div className="row justify-content-sm-center">
                        <div className="col-sm-6 editform">
                            <form className="form-signin" onSubmit={(e) => this.handleSubmit(e)}>
                                <h3>Assign Student</h3>
                                <label htmlFor="inputEmail" className="sr-only">Class Name</label>
                                <select name="classId" required value={this.state.classId} onChange={this.handleInputChange}>
                                    <option>Please select</option>
                                    {classList}
                                </select>
                                <br/>
                                <label htmlFor="inputEmail" className="sr-only">Student ID</label>
                                <select name="studentId" required value={this.state.studentId} onChange={this.handleInputChange}>
                                    <option>Please select</option>
                                    {userList}
                                </select>

                                <br/>

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

export default AssignStudent;


