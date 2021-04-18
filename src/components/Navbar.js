import React, {useState}from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Modal from 'react-bootstrap/Modal';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles/';
import { useHistory} from "react-router-dom";
import CardMedia from '@material-ui/core/CardMedia';
import Logo from "./Assets/Logo.png";
import Stanley from "./Assets/Stanley.jpg";
import Bialetti from "./Assets/Bialetti.png";
import KitchenAid from "./Assets/KitchenAid.jpg";
import Mica from "./Assets/mica.jpg";
import Hudson from "./Assets/Hudson.jpg";
import Nadir from "./Assets/nadir.jpg";
import Park from "./Assets/park.PNG";
import Porcelana from "./Assets/porcelana-tsuji.jpg";
import Tomorrows from "./Assets/tomorrow.jpg"
import Tramontina from "./Assets/tramontina.png";
import Libbey from "./Assets/libbey.svg";
import Pyrex from "./Assets/pyrex.svg";
const Navigation = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history= useHistory();
    const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      marginLeft:"2%",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(2),
      width: 200,
    },
    modify: {
        padding:30,
    },
    modify1: {
        padding:10,
    },
    media: {
      height: 140,
    },
    title:{
        fontStyle:"italic", 
        marginTop:"10px"
    },
    title1:{
        fontWeight: 'bold',
        textAlign:"center",
        marginTop:"5px"
    },
    card:{
      padding:"4%",
      height:"12rem",
    }
  })); 
  const classes = useStyles();
  const onClick = (marca) =>{
    console.log(marca)
    history.push({
        pathname: '/productos',
        state: marca,
    })
}
  return (
    <Navbar expand="lg" expand="md" variant="dark" style={{backgroundColor:"#401801"}}>
        <Navbar.Brand ><img src={Logo} width="150" height="100" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{color:"white"}}/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link style={{color:"white", fontSize:"20px"}}  onClick={() => history.push({
              pathname: '/',})}>Home</Nav.Link>
            <Nav.Link style={{color:"white", fontSize:"20px"}}  onClick={() => history.push({
              pathname: '/Productos',})}>Productos</Nav.Link>
            <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={handleShow}>Marcas</Nav.Link>
            <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={() => history.push({
              pathname: '/Nosotros',})}>Nosotros</Nav.Link>
            </Nav>
            <Nav className="cerrarsesion">
                <Nav.Link style={{color:"white", fontSize:"20px"}} onClick={() => history.push({
              pathname: '/Login',})} >Ingresar</Nav.Link>
                <Nav.Link style={{color:"grey",  fontSize:"20px"}} ><ShoppingCartIcon /></Nav.Link>
            </Nav>
        </Navbar.Collapse>
<Modal size="lg" size="lg" style={{maxWidth: '1600px'}} show={show} onHide={handleClose} >
    <Modal.Header closeButton>
      <Modal.Title>Marcas</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div class="container">
    <div class="row">
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Bialetti")}}>
  <div class="card">
  <div className={classes.card}>
  <CardMedia
          className={classes.media}
          image={Bialetti}
          title="Bialetti"
        />
  </div>
  </div>
  </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Hudson")}}>
  <div class="card">
  <div className={classes.card}>
  <CardMedia
          className={classes.media}
          image={Hudson}
          title="Hudson"
        />
  </div>
  </div>
  </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() =>  history.push({
              pathname: '/Productos',
              state: "KitchenAid"
              })}>
  <div class="card">
  <div className={classes.card}>
  <CardMedia
          className={classes.media}
          image={KitchenAid}
          title="KitchenAid"
        />
  </div>
  </div>
  </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() =>  history.push({
              pathname: '/Productos',
              state: "Libbey"
              })}>
  <div class="card">
  <div className={classes.card}>
  <CardMedia
          className={classes.media}
          image={Libbey}
          title="Libbey"
        />
  </div>
  </div>
  </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() =>  history.push({
              pathname: '/Productos',
              state: "Mica"
              })}>
  <div class="card">
  <div className={classes.card}>
  <CardMedia
          className={classes.media}
          image={Mica}
          title="Mica"
        />
  </div>
  </div>
  </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() =>  history.push({
              pathname: '/Productos',
              state: "Nadir Argentina"
              })}>
  <div class="card">
  <div className={classes.card}>
  <CardMedia
          className={classes.media}
          image={Nadir}
          title="Nadir Argentina"
        />
  </div>
  </div>
  </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() =>  history.push({
              pathname: '/Productos',
              state: "Park Design"
              })}>
  <div class="card">
  <div className={classes.card}>
  <CardMedia
          className={classes.media}
          image={Park}
          title="Park Design"
        />
  </div>
  </div>
  </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() =>  history.push({
              pathname: '/Productos',
              state: "Porcelana Tsuji"
              })}>
  <div class="card">
  <div className={classes.card}>
  <CardMedia
          className={classes.media}
          image={Porcelana}
          title="Porcelana Tsuji"
        />
  </div>
  </div>
  </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() =>  history.push({
              pathname: '/Productos',
              state: "Pyrex"
              })}>
  <div class="card">
  <div className={classes.card}>
  <CardMedia
          className={classes.media}
          image={Pyrex}
          title="Pyrex"
        />
  </div>
  </div>
  </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() =>  history.push({
              pathname: '/Productos',
              state: "Stanley"
              })}>
  <div class="card">
  <div className={classes.card}>
  <CardMedia
          className={classes.media}
          image={Stanley}
          title="Stanley"
        />
  </div>
  </div>
  </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() =>  history.push({
              pathname: '/Productos',
              state: "Tomorrow's Kitchen"
              })}>
  <div class="card">
  <div className={classes.card}>
  <CardMedia
          className={classes.media}
          image={Tomorrows}
          title="Tomorrow´s Kitchen"
        />
  </div>
  </div>
  </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() =>  history.push({
              pathname: '/Productos',
              state: "Tramontina"
              })}>
  <div class="card">
  <div className={classes.card}>
  <CardMedia
          className={classes.media}
          image={Tramontina}
          title="Tramontina"
        />
  </div>
  </div>
  </CardActionArea>
</div>
</div>
</div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}  style={{backgroundColor: "#401801"}}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
    </Navbar>
    
)
}

export default withRouter(Navigation);