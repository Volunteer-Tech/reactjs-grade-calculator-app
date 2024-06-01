import React from "react";
import axios from 'axios';
import '../App.css';
import Navbar from "./navbar";

class AddSubject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectName: '',
            className: '',
            classId: '',
            teacherName: '',
            teacherId: '',
            archived: '',
            users: '',
            classes: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let props = this.props;
        let data;
        data = {
            classId: this.state.classId,
            subjectName: this.state.subjectName,
            teacherId: this.state.teacherId,
            archived: "false"
        };

        this.state.classes.map(function (index) {
            if(index.classId == data.classId){
                data.className = index.className;
                return 1;
            }
        });

        this.state.users.map(function (index) {
            if(index.userid == data.teacherId){
                data.teacherName = index.firstName+" "+index.lastName;
                return 1;
            }
        });
        //console.log(data);

        axios.post('http://localhost:3000/api/v1/subjects/', data)
            .then(function (response) {
                console.log(response);
                //console.log(data);
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

    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/users/search?role=teacher")
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

    render() {
        const navMenu = ['Admin View', 'Log-out'];
        const navMenuLink = ['admin', '/'];

        const userList = [];
        const classList = [];
        try {
            var temp = this.state.users;
            temp.map(function (index) {
                return userList.push(
                    <option value={index.userid} >{index.firstName} {index.lastName}</option>
                );
            });

            /*
            * class management
            * */
            var tempClass = this.state.classes;
            tempClass.map(function (index) {
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
                                <h3>Add New Subject</h3>

                                <label htmlFor="inputEmail" className="sr-only">Subject Name</label>
                                <input type="text" name="subjectName" value={this.state.subjectName}
                                       className="form-control"
                                       placeholder="Subject Name"
                                       onChange={this.handleInputChange}
                                       required autoFocus/>

                                <label htmlFor="inputEmail" className="sr-only">Class Name</label>
                                <select name="classId" required onChange={this.handleInputChange}>
                                    <option>Please select</option>
                                    {classList}
                                </select>
                                <br/>
                                <label >Teacher Name</label>
                                <select name="teacherId" required onChange={this.handleInputChange}>
                                    <option >Please select</option>
                                    {userList}
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

export default AddSubject;


