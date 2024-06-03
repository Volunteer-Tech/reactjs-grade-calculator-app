import React, {useState} from "react";
import axios from 'axios';
import '../../App.css';
import Navbar from "../navbar";
import DatePicker from "react-datepicker";


class AddTest extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            testName: '',
            testDate: '',
            teacherId: props.location.teacherId,
            teacherName: props.location.teacherName,
            subjectId: props.location.subjectId,
            subjectName: props.location.subjectName,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let props = this.props;
        let data;
        data = {
            testName: this.state.testName,
            testDate: this.state.testDate,
            subjectId: this.state.subjectId,
            subjectName: this.state.subjectName,
            teacherId: this.state.teacherId,
            teacherName: this.state.teacherName,
            archived: "false"
        };

        //console.log(data);
        let classInstance = this;
        axios.post('http://localhost:3000/api/v1/tests/', data)
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
        //const [startDate, setStartDate] = new Date();

        return (
            <section>
                <Navbar navMenu={navMenu} navMenuLink={navMenuLink}/>
                <div className="container">
                    <div className="row justify-content-sm-center">
                        <div className="col-sm-6 editform">
                            <form className="form-signin" onSubmit={(e) => this.handleSubmit(e)}>
                                <h3>Add New Test</h3>

                                <label htmlFor="inputEmail" className="sr-only">Test Name</label>
                                <input type="text" name="testName" value={this.state.testName}
                                       className="form-control"
                                       placeholder="Test Name"
                                       onChange={this.handleInputChange}
                                       required autoFocus/>
                                <br/>
                                <label htmlFor="inputEmail" className="sr-only">Test Date</label>
                                <input type="text" name="testDate" value={this.state.testDate}
                                       className="form-control"
                                       placeholder="Test Date"
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

export default AddTest;


