import React from "react";
import {Link} from "react-router-dom";
import '../App.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let navMenuLinkHTML = [];
        for(let i=0;i<this.props.navMenu.length; i++){
           navMenuLinkHTML.push( <li className="nav-item" key={"s"+i}>
               <Link className="nav-link" to={"/"+this.props.navMenuLink[i]}>{this.props.navMenu[i]}</Link>
           </li>);
        }
        return (
            <header className="navbar-header">
                <div className="">
                    <div className="">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <div className="container">
                                <a className="navbar-brand navbar_text" href="#"><img width={30} src="elearning.png"
                                                                                      alt=""/><span
                                    className="navbar_title">School Grading System</span></a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">
                                        {navMenuLinkHTML}
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default Navbar;


