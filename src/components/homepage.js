/*
* Homepage Component
* Retrieve item from the Apigateway
* */
import React from 'react';
import '../App.css';
import axios from 'axios';

class Homepage extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        axios.get("http://localhost:3000/users")
            .then(response => {
                const products = response.data;
                console.log(JSON.stringify(products));
            });
    }
    render() {
        return (
            <div>
                <p>Homepage</p>
            </div>
        );
    }
}
export default Homepage;
