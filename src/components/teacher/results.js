/*
* Admin view
* */
import React from 'react';
import '../../App.css';
import '../admin-stylesheets.css'
import axios from 'axios';
import Navbar from "../navbar";
import {Link} from "react-router-dom";

class Results extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            grades: '',
            testId: this.props.location.testId,
            subjectId: this.props.location.subjectId,
            classId: this.props.location.classId,
            subjectName: this.props.location.subjectName,
            teacherId: this.props.location.teacherId,
            teacherName: this.props.location.teacherName,
        };
    }


    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/grades/search?subjectId=" + this.state.subjectId+"&testId="+this.state.testId)
            .then(response => {
                const grades = response.data;
                //console.log(JSON.stringify(users));
                //console.log(products[1].product_id);
                this.setState({
                    grades: grades
                });
            });
    }


    render() {
        const navMenu = ['<- Teacher View', 'Log-out'];
        const navMenuLink = ['teacher', ''];
        /*
        * saving the list of users in array before rendering
        * */
        const gradesList = [];
        let myComponent = this;
        try {
            /*
            * Assign Subjects
            * */
            var tempGrades = this.state.grades;
            let classCount = 0;
            tempGrades.map(function (index) {
                classCount++;
                return gradesList.push(
                    <tr key={classCount+1}>
                        <td>{classCount}</td>
                        <td>{index.testName}</td>
                        <td>{index.studentId}</td>
                        <td>{index.grade}</td>
                    </tr>
                );
            });


        } catch {
            console.log('... No data ...');
        }

        return (
            <div className="body">
                <Navbar navMenu={navMenu} navMenuLink={navMenuLink}/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="table-responsive">
                                <div className="table-wrapper">
                                    <div className="table-title">
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <h2>Tests List</h2>
                                            </div>
                                            <div className="col-sm-7">


                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Test Name</th>
                                            <th>Student ID</th>
                                            <th>Grades</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {gradesList}
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

export default Results;
