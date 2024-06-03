import React from 'react';
import './App.css';
import LoginPage from "./components/login";
import AdminPage from "./components/admin";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import axios from "axios";
import AdminEditUser from "./components/adminEditUser";
import AddNewUser from "./components/addNewUser";
import AddNewClass from "./components/addNewClass";
import AssignStudent from "./components/assignStudent";
import DeassignStudent from "./components/deassignStudent";
import AddSubject from "./components/addSubject";
import EditSubject from "./components/editSubject";
import TeacherView from "./components/teacher/teacher";
import Tests from "./components/teacher/tests";
import AddTest from "./components/teacher/addTest";
import AddGrade from "./components/teacher/addGrade";
import Results from "./components/teacher/results";
import EditTest from "./components/teacher/editTests";
import StudentView from "./components/student/student";
import Message from "./components/message";
import SendMessage from "./components/sendMessage";
import MessagesTeacher from "./components/teacher/messagesTeacher";
import SendMessageTeacher from "./components/teacher/sendMessageTeacher";


class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Router>
                <div className="main_body">
                    <Switch>
                        <Route path="/" exact component={LoginPage}/>
                        <Route path="/admin" exact component={AdminPage}/>
                        <Route path="/teacher" exact component={TeacherView}/>
                        <Route path="/add-user" exact component={AddNewUser}/>
                        <Route path="/edit-user" exact component={AdminEditUser}/>
                        <Route path="/add-class" exact component={AddNewClass}/>
                        <Route path="/assign-student" exact component={AssignStudent}/>
                        <Route path="/deassign-student" exact component={DeassignStudent}/>
                        <Route path="/add-subject" exact component={AddSubject}/>
                        <Route path="/edit-subject" exact component={EditSubject}/>

                        {/*teacher view */}
                        <Route path="/tests" exact component={Tests}/>
                        <Route path="/add-test" exact component={AddTest}/>
                        <Route path="/add-grade" exact component={AddGrade}/>
                        <Route path="/results" exact component={Results}/>
                        <Route path="/edit-test" exact component={EditTest}/>

                        {/*student view */}
                        <Route path="/student" exact component={StudentView}/>

                        <Route path="/message" exact component={Message}/>
                        <Route path="/send-message" exact component={SendMessage}/>

                        <Route path="/message-teacher" exact component={MessagesTeacher}/>
                        <Route path="/send-message-teacher" exact component={SendMessageTeacher}/>

                    </Switch>
                    <div className="footer-container">
                        <div className="footer container text-center">
                            <p>&copy; Developed by Meshu Deb Nath and Nafisa Islam.</p>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
