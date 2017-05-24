import React from 'react';
import {Sidebar} from "../components/Sidebar"
import {Footer} from "../components/Footer"
import {HeadLine} from "../components/Headline"

import {NavBar} from "../components/NavBar"
import {RegistrationForm} from "../components/RegistrationForm";
export class LandingPage extends React.Component {


    render()
    {

        console.log("Landing page because you are not logged in")
        console.log(this.props)
        return (
                <div className="container ">

                    <div className="row text-center">
                        <h1>Welcome to yet another RSS reader</h1>
                        <p> Please Login first or register on D+R to start having fun!</p>
                        <br/>
                        <RegistrationForm {...this.props}/>


                    </div>
                    <hr/>
                    <Footer/>
                </div>

        );
    }

}
