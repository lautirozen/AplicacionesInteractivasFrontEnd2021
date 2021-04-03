import React, { useState } from "react";
import Navigation from '../components/Navbar';
import NavigationLog from '../components/Navbarlog';
import { useHistory} from "react-router-dom";
import Footer from '../components/Footer';
function Nosotros (props){  
    console.log("En Nosotros")
    const history= useHistory();
    var user =JSON.parse(localStorage.getItem('user'));
    const handleHistory = () => {
        history.push("/");
    }
    return (
    <div className="Nosotros">
         {(user===null)?
      <Navigation />: <NavigationLog />}
      <div class="card">
        <h6 >Productos</h6>
      </div>
      <Footer />
    </div>
    )
}
export default Nosotros;