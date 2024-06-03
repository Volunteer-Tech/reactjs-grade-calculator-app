/*
* teacher view
* */
import React from 'react';
import '../../App.css';
import '../admin-stylesheets.css'
import axios from 'axios';
import Navbar from "../navbar";
import {Link} from "react-router-dom";

class TeacherView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: '',
            count: 1,
            teacherId: this.props.location.userid
        };
    }


    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/subjects/search?teacherId="+this.state.teacherId)
            .then(response => {
                const subjects = response.data;
                console.log(JSON.stringify(subjects));
                //console.log(products[1].product_id);
                this.setState({
                    subjects: subjects
                });
            });
    }


    render() {
        const navMenu = ['Teacher View', 'Log-out'];
        const navMenuLink = ['teacher', ''];
        /*
        * saving the list of users in array before rendering
        * */
        const subjectsList = [];
        try {
            /*
            * Assign Subjects
            * */
            var tempSubjects = this.state.subjects;
            let classCount = 0;
            tempSubjects.map(function (index) {
                classCount++;
                let status = "";
                if (index.archived == "false") {
                    status = "Active";
                } else {
                    status = "Inactive";
                }
                let tempClassId = index.classId;
                return subjectsList.push(
                    <tr key={classCount+"d"+1}>
                        <td>{classCount}</td>
                        <td>{index.className}</td>
                        <td>{index.subjectName}</td>
                        <td><span className="status text-success">&bull;</span> {status}</td>
                        <td className="action-button">
                            <Link to={{
                                pathname: '/tests',
                                subjectId: index.subjectId,
                                classId: index.classId,
                                subjectName: index.subjectName,
                                teacherId: index.teacherId,
                                teacherName: index.teacherName
                            }} className="settings"><img src="./setting.png" width="20"/></Link>
                        </td>
                    </tr>
                );
            });


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
                                                <h2>Assign Subjects</h2>
                                            </div>
                                            <div className="col-sm-7">
                                                <a href="#" className="btn btn-secondary"><i
                                                    className="material-icons">&#xE147;</i>
                                                    <span><Link to={{pathname: "/message-teacher", userid: this.state.teacherId, path: "teacher"}}>Message</Link></span></a>

                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Class Name</th>
                                            <th>Subject Name</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {subjectsList}
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

export default TeacherView;
