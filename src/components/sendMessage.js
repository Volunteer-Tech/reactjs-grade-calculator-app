import React from "react";
import axios from 'axios';
import '../App.css';
import Navbar from "./navbar";

class SendMessage extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            senderId: this.props.location.userid,
            text: '',
            receiverId: '',
            user: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let props = this.props;
        let data;
        data = {
            senderId: this.state.senderId,
            receiverId: this.state.receiverId,
            text: this.state.text,
            archived: "false"
        };


        //console.log(data);
        let classInstance = this;
        axios.post('http://localhost:3000/api/v1/messages/', data)
            .then(function (response) {
                console.log(response);
                //console.log(data);
                if (response.status === 201) {
                    props.history.push({pathname: "/message", userid: classInstance.state.senderId, path: "student"});
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
        axios.get("http://localhost:3000/api/v1/admission/search?studentId=" + this.state.senderId)
            .then(response => {
                const classes = response.data;
                //console.log(JSON.stringify(classes));
                this.setState({
                    classes: classes
                });
            });
        axios.get("http://localhost:3000/api/v1/users/search?role=student")
            .then(response => {
                const users = response.data;
                this.setState({
                    users: users
                });
            });
    }
    getUser(user){
        axios.get("http://localhost:3000/api/v1/admission/search?studentId="+user)
            .then(response => {
                const classes = response.data;
                //console.log(JSON.stringify(classes));
                if(classes === this.state.classes){
                    return 1;
                }
            });
    }

    render() {
        const navMenu = ['Student View', 'Log-out'];
        const navMenuLink = ['student', '/'];

        let userList = [];
        let classInstance = this;
        try {
            var temp = this.state.users;
            temp.map(function (index) {
                    return userList.push(
                        <option value={index.userid} >{index.firstName} {index.lastName}</option>
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
                                <h3>Add Message</h3>

                                <label htmlFor="inputEmail" className="sr-only">Text</label>
                                <input type="textarea" name="text" value={this.state.text}
                                       className="form-control"
                                       placeholder="Text"
                                       onChange={this.handleInputChange}
                                       required autoFocus/>
                                <br/>
                                <label >Receiver Name</label>
                                <select name="receiverId" required onChange={this.handleInputChange}>
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

export default SendMessage;


