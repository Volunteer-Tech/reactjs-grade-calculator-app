import React, {useState} from "react";
import axios from 'axios';
import '../../App.css';
import Navbar from "../navbar";

class AddGrade extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            testName: props.location.testName,
            testId: props.location.testId,
            grade: '',
            studentId: '',
            studentName: '',
            students: '',
            admittedStudent: '',
            classId: props.location.classId,
            teacherId: props.location.teacherId,
            teacherName: props.location.teacherName,
            subjectId: props.location.subjectId,
            subjectName: props.location.subjectName,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/users/search?role=student")
            .then(response => {
                const students = response.data;
                //console.log(JSON.stringify(students));
                //console.log(products[1].product_id);
                this.setState({
                    students: students
                });
            });
        console.log("class id: "+ this.state.classId);
        axios.get("http://localhost:3000/api/v1/admission/search?classId="+this.state.classId)
            .then(response => {
                const admittedStudent = response.data;
                //console.log(JSON.stringify(admittedStudent));
                //console.log(products[1].product_id);
                this.setState({
                    admittedStudent: admittedStudent
                });

            });
    }


    handleSubmit(e) {
        e.preventDefault();
        let props = this.props;
        let data;
        data = {
            testId: this.state.testId,
            testName: this.state.testName,
            classId: this.state.classId,
            subjectId: this.state.subjectId,
            studentId: this.state.studentId,
            subjectName: this.state.subjectName,
            grade: this.state.grade,
            archived: "false"
        };

        for(let i=0;i< this.state.students.length;i++){
            if(this.state.students[i].userid == data.studentId){
                console.log("student name: "+ this.state.students[i].studentName);
                data.studentName = this.state.students[i].studentName;
            }
        }

        //console.log(data);
        let classInstance = this;
        axios.post('http://localhost:3000/api/v1/grades/', data)
            .then(function (response) {
                console.log(response);
                //console.log(data);
                if (response.status === 201) {
                    props.history.push({
                        pathname: '/tests',
                        subjectId: classInstance.state.subjectId,
                        subjectName: classInstance.state.subjectName,
                        teacherId: classInstance.state.teacherId,
                        teacherName: classInstance.state.teacherName,
                        testName: classInstance.state.testName,
                        testId: classInstance.state.testId,
                        classId: classInstance.state.classId,
                    });
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
        const navMenu = ['<- All Tests','Teacher View', 'Log-out'];
        const navMenuLink = ['tests','teacher', '/'];
        let studentList = [];
        try {
            var tempStudent = this.state.students;
            var tempAdmittedStudent = this.state.admittedStudent;

            for(let i=0; i<tempAdmittedStudent.length; i++){
               // console.log(tempStudent);
                for(let j=0; j<tempStudent.length; j++){
                    //console.log(tempAdmittedStudent);
                    if(tempAdmittedStudent[i].studentId == tempStudent[j].userid){
                        console.log(tempStudent[j].userid + " " + tempAdmittedStudent[i].studentId);
                        studentList.push(
                            <option value={tempStudent[j].userid}>{tempStudent[j].firstName} {tempStudent[j].lastName}</option>
                        );
                    }
                }
            }

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
                                <h3>Add Grade</h3>

                                <label >Student Name</label>
                                <select name="studentId" required onChange={this.handleInputChange}>
                                    <option >Please select</option>
                                    {studentList}
                                </select>

                                <br/>
                                <label htmlFor="inputEmail" className="sr-only">Grade</label>
                                <input type="text" name="grade" value={this.state.grade}
                                       className="form-control"
                                       placeholder="Grade"
                                       onChange={this.handleInputChange}
                                       required autoFocus/>
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

export default AddGrade;


