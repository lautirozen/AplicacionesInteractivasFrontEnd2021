import React, { useState } from "react";
import Navigation from '../components/Navbar';
import { useHistory} from "react-router-dom";
import Footer from '../components/Footer';
function Nosotros (props){  
    console.log("En Nosotros")
    const history= useHistory();
    const handleHistory = () => {
        history.push("/");
    }
    return (
    <div className="Nosotros">
        <Navigation />
      <div class="card">
        <h6 >Productos</h6>
      </div>
      <Footer />
    </div>
    )
}
export default Nosotros;