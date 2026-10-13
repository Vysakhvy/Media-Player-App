import React from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { PiVideoFill } from "react-icons/pi";

function Header() {
  return (
    <div>
     <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
            <span style={{fontSize:'50px',gap:'10px'}}>  < PiVideoFill size={50} style={{marginRight:'15px'}}/>media player</span>
        
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Header
