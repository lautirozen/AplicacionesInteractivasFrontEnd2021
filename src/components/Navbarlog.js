import React, {useState}from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Modal from 'react-bootstrap/Modal';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles/';
import { useHistory} from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Badge from '@material-ui/core/Badge';
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
    const[user, setUser]=useState(JSON.parse(localStorage.getItem('nombre')));
    const[usera, setUsera]=useState(JSON.parse(localStorage.getItem('apellido')));
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history= useHistory();
    const onClick= () =>{
        localStorage.clear();
        var userrr = JSON.parse(localStorage.getItem('user'));
        console.log(userrr)
        history.push("/")
    }
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
    media: {
      height: 140,
    },
    modify1: {
        padding:10,
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

  return (
    <Navbar expand="lg" expand="md" variant="dark" style={{backgroundColor:"#401801"}}>
        <Navbar.Brand ><img src={Logo} width="150" height="100" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link style={{color:"white", fontSize:"20px"}}  onClick={() => history.push({
              pathname: '/',})}>Home</Nav.Link>
            <Nav.Link style={{color:"white",  fontSize:"20px"}}  onClick={() => history.push({
              pathname: '/Productos',})}>Productos</Nav.Link>
            <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={handleShow}>Marcas</Nav.Link>

                <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={() => history.push({
              pathname: '/Nosotros',})}>Nosotros</Nav.Link>
            </Nav>
            <Nav className="cerrarsesion">
                <Nav.Link style={{color:"white",  fontSize:"20px"}}><AccountCircle />  {user} {usera}</Nav.Link>
                <Nav.Link style={{color:"grey",  fontSize:"20px"}} ><Badge badgeContent={2} color='error'>
                  <ShoppingCartIcon />
                </Badge></Nav.Link>
                <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={onClick} >Cerrar sesión</Nav.Link>

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
<CardActionArea onClick={() =>  history.push({
              pathname: '/Productos'})}>
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
<CardActionArea onClick={() =>  history.push({
              pathname: '/Productos'})}>
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
              pathname: '/Productos'})}>
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
              pathname: '/Productos'})}>
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
              pathname: '/Productos'})}>
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
              pathname: '/Productos'})}>
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
              pathname: '/Productos'})}>
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
              pathname: '/Productos'})}>
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
              pathname: '/Productos'})}>
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
              pathname: '/Productos'})}>
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
              pathname: '/Productos'})}>
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
              pathname: '/Productos'})}>
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