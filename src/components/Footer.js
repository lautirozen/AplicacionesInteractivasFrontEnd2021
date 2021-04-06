import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { makeStyles } from '@material-ui/core/styles/';
import Logo from "./Assets/Logo.png";
const FooterPage = () => {
    const useStyles = makeStyles((theme) => ({
        container: {
            backgroundColor:"#401801",
        },
        title:{
            color:"white",
        },
        logo:{
            marginLeft:"10rem"
        }
      })); 
      const classes = useStyles();
  return (
    <div className={classes.container}>
    <MDBFooter className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className={classes.logo}><img src={Logo} width="220" height="185" /></h5>
          </MDBCol>
          <MDBCol md="4">
            <h5 className={classes.title}>Contacto</h5>
            <ul>
              <li className={classes.title}>
                <a>Teléfono: +54 9 11 5599-6606</a>
              </li>
              <li className={classes.title}>
                <a>Email: kitchengadget@hotmail.com / kitchengadget@gmail.com</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className={classes.title}>
        <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright: <a>Kitchen Gadget</a>
            </MDBContainer>
        </div>
      </div>
    </MDBFooter>
    </div>
  );
}

export default FooterPage;