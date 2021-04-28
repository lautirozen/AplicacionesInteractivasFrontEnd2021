import React from "react";
import Navigation from '../components/Navbar';
import NavigationLog from '../components/Navbarlog';
import { useHistory} from "react-router-dom";
import Footer from '../components/Footer';
import Carousel from 'react-bootstrap/Carousel';
import fotoC from "./Assets/imagen6.jpg";
import fotoB from "./Assets/home1.jpg";
import fotoA from "./Assets/homee.jpg";
import fotoD from "./Assets/home3.png";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import coffe from "./Assets/coffe2.jpg";
import cubierto from "./Assets/cubierto.jpg";
import mantel from "./Assets/mantel.jpg";
import ollas from "./Assets/ollas.jpg";
import reposteria from "./Assets/Reposteria.jpg";
import mate from "./Assets/Mate.jpg";
import copa from "./Assets/copa.jpeg";
import plato from "./Assets/platos.jpg";
import utensilio from "./Assets/utensillo.jpg"
function Home (){  
    console.log("En Home")
    const history= useHistory();
    var user =JSON.parse(localStorage.getItem('user'));
    const useStyles = makeStyles((theme) => ({
      Home:{
        backgroundColor:"#F2EFEB",
      },
      card:{
        padding:"2%",
        height:"25rem",
      },
      media: {
        height: "300px",
      },
      title:{
        fontFamily:"Garamond", 
        fontWeight:'bold',
         fontSize:"30px",
      }
    })); 
    const classes = useStyles();
    const onClick = (categoria) =>{
      history.push({
          pathname: '/productos',
          state: categoria,
      })
  }
    return (
    <div className={classes.Home}>
         {(user===null)?
      <Navigation />: <NavigationLog />}
      <div class="card">
          <Carousel fade>
            <Carousel.Item >
              <img
                className="d-block w-100"
                src={fotoA}
                height="750px"
              />
            </Carousel.Item>
            <Carousel.Item >
            <img
                className="d-block w-100"
                src={fotoB}
                height="750px"
              />
            </Carousel.Item>
            <Carousel.Item >
            <img
                className="d-block w-100"
                src={fotoC}
                height="750px"
              />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={fotoD}
                height="750px"
              />
            </Carousel.Item>
          </Carousel>
      </div>
      <div class="col-12 row">
      <div class="col-lg-3 col-md-6 col-sm-11 ml-lg-auto mb-2 mt-5">
    <CardActionArea   onClick={() => {onClick("cafe y te")}}>
      <div class="card">
      <div className={classes.card}>
      <CardMedia
          className={classes.media}
          image={coffe}
        />
         <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            Café y Té
          </Typography>
          </CardContent>
      </div>
      </div>
      </CardActionArea>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-11 ml-lg-auto mb-2 mt-5">
    <CardActionArea   onClick={() => {onClick("cubierto")}}>
      <div class="card">
      <div className={classes.card}>
      <CardMedia
          className={classes.media}
          image={cubierto}
        />
         <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            Cubiertos
          </Typography>
          </CardContent>
      </div>
      </div>
      </CardActionArea>
    </div>
      <div class="col-lg-3 col-md-6 col-sm-11 mb-2 ml-lg-auto mr-lg-5 mt-5">
    <CardActionArea   onClick={() => {onClick("mantel")}}>
      <div class="card">
      <div className={classes.card}>
      <CardMedia
          className={classes.media}
          image={mantel}
        />
         <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            Mantelería
          </Typography>
          </CardContent>
      </div>
      </div>
      </CardActionArea>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-11 ml-lg-auto mb-2 mt-5">
    <CardActionArea   onClick={() => {onClick("ollas y sartenes")}}>
      <div class="card">
      <div className={classes.card}>
      <CardMedia
          className={classes.media}
          image={ollas}
        />
         <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            Ollas y Sartenes
          </Typography>
          </CardContent>
      </div>
      </div>
      </CardActionArea>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-11 ml-lg-auto mb-2 mt-5">
    <CardActionArea   onClick={() => {onClick("reposteria")}}>
      <div class="card">
      <div className={classes.card}>
      <CardMedia
          className={classes.media}
          image={reposteria}
        />
         <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            Repostería
          </Typography>
          </CardContent>
      </div>
      </div>
      </CardActionArea>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-11 mb-2 ml-lg-auto mr-lg-5 mt-5">
    <CardActionArea  onClick={() => {onClick("termos y mates")}}>
      <div class="card">
      <div className={classes.card}>
      <CardMedia
          className={classes.media}
          image={mate}
        />
         <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            Termos y Mates
          </Typography>
          </CardContent>
      </div>
      </div>
      </CardActionArea>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-11 ml-lg-auto mb-2 mt-5">
    <CardActionArea   onClick={() => {onClick("utensilio")}}>
      <div class="card">
      <div className={classes.card}>
      <CardMedia
          className={classes.media}
          image={utensilio}
        />
         <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            Utensilios
          </Typography>
          </CardContent>
      </div>
      </div>
      </CardActionArea>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-11 ml-lg-auto mb-2 mt-5">
    <CardActionArea  onClick={() => {onClick("vajilla")}}>
      <div class="card">
      <div className={classes.card}>
      <CardMedia
          className={classes.media}
          image={plato}
        />
         <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            Vajilla
          </Typography>
          </CardContent>
      </div>
      </div>
      </CardActionArea>
    </div>
      <div class="col-lg-3 col-md-6 col-sm-11 mb-2 ml-lg-auto mr-lg-5 mt-5">
    <CardActionArea  onClick={() => {onClick("vasos y copas")}}>
      <div class="card">
      <div className={classes.card}>
      <CardMedia
          className={classes.media}
          image={copa}
        />
         <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            Vasos y Copas
          </Typography>
          </CardContent>
      </div>
      </div>
      </CardActionArea>
    </div>
      </div>
      <Footer />
    </div>
    )
}
export default Home;