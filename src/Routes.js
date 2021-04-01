import React, { Component } from "react";
import { BrowserRouter as Router,Route, useHistory, Switch} from "react-router-dom";
import Home from "./Home/Home";
import history from './history';
import Nosotros from "./Nosotros/Nosotros";
import Login from "./Login/Login";
export default class Routes extends Component {
    render() {
        console.log("Redirigiendo")
        return (
            <Router history={useHistory}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/Productos" component={Nosotros} />
                    <Route exact path="/Login" component={Login} />
                </Switch>
            </Router>
        )
    }
}