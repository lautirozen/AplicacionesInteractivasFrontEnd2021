import React,{useState} from "react";
import { useParams } from "react-router-dom";
import Navigation from '../components/Navbar';
import NavigationLog from '../components/Navbarlog';
import Footer from '../components/Footer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
function DetalleProducto(props) {
    const {titulo}= useParams();
    const [product,setProduct]=useState(props.location.state)
    var user =JSON.parse(localStorage.getItem('user'));
    const useStyles = makeStyles((theme) => ({
        Titulo:{
          fontFamily:"Garamond", 
          fontWeight:'bold',
          fontSize:"50px",
          textAlign:"left",
          marginTop:"3rem",
          marginLeft:"2rem"
        },
        Titulo1:{
            fontFamily:"Garamond", 
            fontWeight:'bold',
            fontSize:"50px",
            textAlign:"left",
            marginTop:"7rem",
            color:"#7F3004",
            marginLeft:"1rem"
          },
          Titulo2:{
            fontFamily:"Garamond", 
            fontWeight:'bold',
            fontSize:"35px",
            textAlign:"left",
            marginTop:"3rem",
            marginLeft:"2rem"
          },
          description:{
            textAlign:"justify",
            font: "25px/40px Garamond, Sans-Serif",
            marginLeft:"2rem"
          },
          button:{
            backgroundColor:"#401801",
            height:"4rem",
            width:"20rem",
            marginTop:"5rem"
          },
      })); 
    const classes = useStyles();
    return (
      <div className={classes.DetalleProducto}>
        {(user===null)? <Navigation />: <NavigationLog />}
        <div className={classes.Titulo}>
            {product.titulo}   
        </div>
        <div class="col-12 row mb-5">
            <div class="col-lg-6 col-md-8 col-sm-12 mt-5">
                <img src={product.image} height="500px" class="img-fluid" alt="Responsive image" />
            </div>
            <div class="col-lg-6 col-md-4 col-sm-12">
                <div className={classes.Titulo1}>
                    <div class="ml-lg-3">
                        ${product.precio}
                    </div>
                </div>
                <div class="col-lg-6 col-md-4 col-sm-12 ml-lg-3">
                    <div className={classes.button}>
                        <Button style={{color:"white", marginTop:"1rem"}} onClick={() => {console.log(product.titulo + " añadido")}}>AGREGAR AL CARRITO</Button>    
                    </div>
                </div>
                <div className={classes.Titulo2}>
                    Descripción   
                </div>
                <div className={classes.description}>
                    {product.descripcion}
                </div>
            </div>
        </div>
        <Footer />
      </div>
    );
  }
  export default DetalleProducto;