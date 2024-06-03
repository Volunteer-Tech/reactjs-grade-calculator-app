/*
* Admin view
* */
import React from 'react';
import '../App.css';
import './admin-stylesheets.css'
import axios from 'axios';
import Navbar from "./navbar";
import {Link} from "react-router-dom";

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: '',
            senderId: this.props.location.userid,
            receiverId:'',
            text: '',
            path: this.props.location.path
        };
    }
    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/messages/search?senderId="+this.state.senderId+'&receiverId='+this.state.senderId)
            .then(response => {
                const messages = response.data;
                //console.log(JSON.stringify(users));
                //console.log(products[1].product_id);
                this.setState({
                    messages: messages
                });
            });
    }


    render() {
        const navMenu = ['Student View', 'Log-out'];
        const navMenuLink = ['student', ''];
        /*
        * saving the list of users in array before rendering
        * */
        let messageList=[];
        try {
            let msgList = this.state.messages;
            let classCount = 0, max = 0, avg=0;
            let classInstance = this;
            for(let j=0; j<msgList.length;j++){
                classCount++;
                messageList.push(
                    <tr key={classCount+"d"+1}>
                        <td>{classCount}</td>
                        <td>{msgList[j].senderId}</td>
                        <td>{msgList[j].receiverId}</td>
                        <td>{msgList[j].text}</td>
                        <td>
                            <Link to={{
                                pathname: '/read-message',
                                messageId: msgList[j].messageId,
                                userid: classInstance.state.senderId
                            }} className="settings">Read!</Link>
                        </td>
                    </tr>);

            }

        } catch {
            console.log('... No data ...');
        }

        return (
            <div className="body">
                <Navbar navMenu={navMenu} navMenuLink={navMenuLink}/>
                {/* classes */}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="table-responsive">
                                <div className="table-wrapper">
                                    <div className="table-title">
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <h2>All Messages</h2>
                                            </div>
                                            <div className="col-sm-7">
                                                <a href="#" className="btn btn-secondary"><i
                                                    className="material-icons">&#xE147;</i>
                                                    <span><Link to={{pathname: "/send-message", userid: this.state.senderId, path: this.state.path}}>Send Message</Link></span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Sender</th>
                                            <th>Receiver</th>
                                            <th>Seen</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {messageList}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Message;
