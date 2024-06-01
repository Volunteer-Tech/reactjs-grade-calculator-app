/*
* Admin view
* */
import React from 'react';
import '../../App.css';
import '../admin-stylesheets.css'
import axios from 'axios';
import Navbar from "../navbar";
import {Link} from "react-router-dom";

class Tests extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            tests: '',
            count: 1,
            newTest: '',
            subjectId: this.props.location.subjectId,
            classId: this.props.location.classId,
            subjectName: this.props.location.subjectName,
            teacherId: this.props.location.teacherId,
            teacherName: this.props.location.teacherName,
        };
        this.handleDeleteTests = this.handleDeleteTests.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let component = this;
        if(this.state.newTest === true){
            this.state.newTest = false;
            axios.get("http://localhost:3000/api/v1/tests")
                .then(response => {
                    const tests = response.data;
                    component.setState({
                        tests: tests
                    });
                });
            console.log("update tests");
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/tests/search?subjectId=" + this.state.subjectId)
            .then(response => {
                const tests = response.data;
                //console.log(JSON.stringify(users));
                //console.log(products[1].product_id);
                this.setState({
                    tests: tests
                });
            });
    }

    /*
    * Delete event for /test
    * */
    handleDeleteTests(e, index) {
        e.preventDefault();
        /*
        * checking weather the teacher has atleast one subjects.
        * */
        console.log(index);
        let myComponent = this;
        axios.delete("http://localhost:3000/api/v1/tests/" + index.testId)
            .then(function (response) {
                console.log(response);
                myComponent.setState({ newTest: true });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const navMenu = ['<- Teacher View', 'Log-out'];
        const navMenuLink = ['teacher', ''];
        /*
        * saving the list of users in array before rendering
        * */
        const testsList = [];
        let myComponent = this;
        try {
            /*
            * Assign Subjects
            * */
            var tempTests = this.state.tests;
            let classCount = 0;
            tempTests.map(function (index) {
                classCount++;
                let status = "";
                if (index.archived == "false") {
                    status = "Active";
                } else {
                    status = "Inactive";
                }
                let tempClassId = index.classId;

                return testsList.push(
                    <tr key={classCount+1}>
                        <td>{classCount}</td>
                        <td>{index.testName}</td>
                        <td>{index.testDate}</td>
                        <td><span className="status text-success">&bull;</span> {status}</td>
                        <td>
                            <Link to={{
                                pathname: '/add-grade',
                                testId: index.testId,
                                testName: index.testName,
                                subjectId: index.subjectId,
                                classId: myComponent.state.classId,
                                archived: index.archived,
                                subjectName: myComponent.state.subjectName,
                                teacherId: myComponent.state.teacherId,
                                teacherName: myComponent.state.teacherName
                            }} className="settings">Add Grade</Link>
                            |
                            <Link to={{
                                pathname: '/results',
                                testId: index.testId,
                                subjectId: index.subjectId,
                                classId: myComponent.state.classId,
                                subjectName: myComponent.state.subjectName,
                                teacherId: myComponent.state.teacherId,
                                teacherName: myComponent.state.teacherName
                            }} className="settings">Results</Link>
                        </td>
                        <td className="action-button">
                            <Link to={{
                                pathname: '/edit-test',
                                testId: index.testId,
                                testName: index.testName,
                                subjectId: index.subjectId,
                                classId: myComponent.state.classId,
                                archived: index.archived,
                                subjectName: myComponent.state.subjectName,
                                teacherId: myComponent.state.teacherId,
                                teacherName: myComponent.state.teacherName
                            }} className="settings"><img src="./setting.png" width="20"/></Link>

                            | <a href="#" key={classCount + 1} onClick={(e) => myComponent.handleDeleteTests(e, index)}
                                 className="delete"><img src="./delete.png" width="20"/></a>
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

                                                <a href="#" className="btn btn-secondary"><i
                                                    className="material-icons">&#xE147;</i>
                                                    <span>
                                                        <Link to={{
                                                            pathname: '/add-test',
                                                            testId: this.state.testId,
                                                            subjectId: this.state.subjectId,
                                                            subjectName: this.state.subjectName,
                                                            teacherId: this.state.teacherId,
                                                            teacherName: this.state.teacherName,
                                                        }}>Add New Test</Link>
                                                        </span></a>

                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Test Name</th>
                                            <th>Test Date</th>
                                            <th>Status</th>
                                            <th>Grades</th>
                                            <th>Show Results</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {testsList}
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

export default Tests;
