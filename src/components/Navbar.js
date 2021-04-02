import React, {useState}from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Modal from 'react-bootstrap/Modal';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles/';
import { useHistory} from "react-router-dom";


import Logo from "./Assets/Logo.png";
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
    <Navbar style={{backgroundColor:"#401801"}}>
        <Navbar.Brand ><img src={Logo} width="90" height="85" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link style={{color:"white"}}  onClick={() => history.push({
              pathname: '/Productos',})}>Productos</Nav.Link>
            <Nav.Link style={{color:"white"}} onClick={handleShow}>Marcas</Nav.Link>

                <Nav.Link style={{color:"white"}} onClick={() => history.push({
              pathname: '/',})}>Nosotros</Nav.Link>
            </Nav>
            <Nav className="cerrarsesion" style={{textAlign:"right"}}>
                <Nav.Link style={{color:"white"}} onClick={() => history.push({
              pathname: '/Login',})} >Ingresar</Nav.Link>
                <Nav.Link style={{color:"grey"}} ><ShoppingCartIcon /></Nav.Link>
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
    <h6 >Nosotros</h6>
  </div>
  </div>
  </CardActionArea>
</div>
</div>
</div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}  style={{backgroundColor: "#BF6D3A"}}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
    </Navbar>
    
)
}

export default withRouter(Navigation);