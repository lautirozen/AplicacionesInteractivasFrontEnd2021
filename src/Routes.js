import React, { Component } from "react";
import { BrowserRouter as Router,Route, useHistory, Switch} from "react-router-dom";
import Home from "./Home/Home";
import Productos from "./Productos/Productos";
import Login from "./Login/Login";
import Registrarse from "./Registrarse/Registrarse";
export default class Routes extends Component {
    render() {
        console.log("Redirigiendo")
        return (
            <Router history={useHistory}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/Productos" component={Productos} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/Registrarse" component={Registrarse} />
                </Switch>
            </Router>
        )
    }
}