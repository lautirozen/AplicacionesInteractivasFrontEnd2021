import React, { useState } from "react";
import Navigation from '../Navbar';
import NavigationLog from '../Navbarlog';
import { makeStyles } from '@material-ui/core/styles/';
import Cocina from "./Assets/Home.jpg";
import Carousel from 'react-bootstrap/Carousel';
import Cocinaa from "./Assets/Cocina1.jpg";
import Cocinaaa from "./Assets/Cocina2.jpg";
import Cocinaaaa from "./Assets/Cocina4.jpg";
import Cocinas from "./Assets/Cocina5.jpg";
import Footer from '../Footer';
const Home = () => {
    var user =JSON.parse(localStorage.getItem('user'));
    const useStyles = makeStyles(() => ({
      Home:{
        backgroundColor:"#F2EFEB",
      },
      title:{
          fontStyle:"italic", 
          marginTop:"3rem",
          textAlign:"center",
          fontWeight: 'bold',
          marginBottom:"2rem",
      },
      text:{
        textAlign:"justify",
        font: "25px/40px Helvetica, Sans-Serif",
      },
    })); 
    const classes = useStyles();
    return (
    <div className={classes.Home}>
      {(user===null)?
      <Navigation />: <NavigationLog />}
        <div className={classes.title}>
          <h1>Nosotros</h1>
        </div>
        <div class="col-12 row mb-5">
          <div class="col-lg-6 col-md-8 col-sm-12">
          <Carousel fade>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={Cocina}
                height="500px"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={Cocinaa}
                height="500px"
              />

              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={Cocinaaa}
                height="500px"
              />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={Cocinaaaa}
                height="500px"
              />

              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={Cocinas}
                height="500px"
              />

              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          </div>
            <div class="col-lg-6 col-md-4 col-sm-12">
              <h3 style={{textAlign:"left", font:"bold"}}>Conocé nuestra historia...</h3>
              <div className={classes.text}>
                    <p>Kitchen Gadget es un Bazar dedicado a proveer todos los elementos necesarios
                      para la cocina. Todos y cada uno de nuestros productos son seleccionados
                      específicamente por su diseño, utilidad y originalidad. Nuestros productos se caracterizan
                      por contar con la más alta calidad, para convertir la cocina de tus sueños en realidad.
                    </p>
                  </div>
            </div>
          </div>
          <Footer />
        </div>
    )
}
export default Home;