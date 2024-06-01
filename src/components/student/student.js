/*
* Admin view
* */
import React from 'react';
import '../../App.css';
import '../admin-stylesheets.css'
import axios from 'axios';
import Navbar from "../navbar";
import {Link} from "react-router-dom";

class StudentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grades: '',
            subjects: '',
            count: 1,
            studentId: this.props.location.userid
        };
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/grades/search?studentId="+this.state.studentId)
            .then(response => {
                const grades = response.data;
                //console.log(JSON.stringify(users));
                //console.log(products[1].product_id);
                this.setState({
                    grades: grades
                });
            });

        axios.get("http://localhost:3000/api/v1/subjects")
            .then(response => {
                const subjects = response.data;
                //console.log(JSON.stringify(users));
                //console.log(products[1].product_id);
                this.setState({
                    subjects: subjects
                });
            });
    }


    render() {
        const navMenu = ['Student View', 'Log-out'];
        const navMenuLink = ['student', ''];
        /*
        * saving the list of users in array before rendering
        * */
        let gradeList = [], subjectList=[];
        try {
            /*
            * Assign Subjects
            * */
            var tempGrades = this.state.grades;
            let subjectList = this.state.subjects;
            let classCount = 0, max = 0, avg=0;
            let subjectNameList=[], gradeMax, gradeAvg;
            for(let i=0;i< subjectList.length;i++){
                for(let j=0; j<tempGrades.length;j++){
                    if(subjectList[i].subjectId == tempGrades[j].subjectId){
                       subjectNameList.push(subjectList[i].subjectName);
                    }
                }
            }

            console.log(subjectNameList);
            tempGrades.map(function (index) {
                classCount++;
                max += parseInt(index.grade);
                return max;
            });
            console.log(max / classCount);
            avg = max / classCount;
            classCount = 0;
            for(let j=0; j<tempGrades.length;j++){
                classCount++;
                gradeList.push(
                    <tr key={classCount+"d"+1}>
                        <td>{classCount}</td>
                        <td>{subjectNameList[j]}</td>
                        <td>{tempGrades[j].testName}</td>
                        <td>{avg}</td>
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
                                                <h2>Assign Subjects</h2>
                                            </div>
                                            <div className="col-sm-7">
                                                <a href="#" className="btn btn-secondary"><i
                                                    className="material-icons">&#xE147;</i>
                                                    <span><Link to={{pathname: "/message", userid: this.state.studentId, path: "student"}}>Messages</Link></span></a>

                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Subject Name</th>
                                            <th>Test Name</th>
                                            <th>Grades</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {gradeList}
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

export default StudentView;
