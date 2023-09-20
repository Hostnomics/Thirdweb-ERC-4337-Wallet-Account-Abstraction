 //From (13:17) / (17:06): https://youtu.be/-RNQ5GoghGY?si=QrE6Jb9YPnqkhaEb&t=797
import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";
// import styles from "../styles/Home.module.css";
import 'bootstrap/dist/css/bootstrap.css'
import styles from "../styles/ViewScripts.module.css";
import logoPalau from '../assets/logoPalau.svg';
import Image from 'next/image';
import React from 'react'


import Link from "next/link";

type NavbarDashboardProps = {
    displayNav: boolean;
    logout: boolean;
  };

export const NavbarDashboard: React.FC<NavbarDashboardProps> = ({ displayNav, logout }) => {
// export const Navbar = () => {
// export default function Navbar() {
    const address = useAddress();
    const disconnect = useDisconnect();

    if (!displayNav) return null;

        function truncateAddress(address: string) {
            return address.slice(0,6) + "..." + address.slice(-4);
        }


    return (
        // <ConnectWallet 
        //     className={styles.walletButton}
        //     // btnTitle="Sign In"
        //     theme="dark"
        // />


        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container">

      {address ? (

          <Link className="navbar-brand" href="/">
            {/* <Image src={logoPalau} width="30" height="30" className="d-inline-block align-top image--cover--navbar" alt=""/> */}
            <Image src={logoPalau} width="30" height="30" className={`d-inline-block align-top ${styles['image--cover--navbar']}`} alt=""/>
             ACME Patient Dashboard <small >({truncateAddress(address)})</small>
          </Link>
     
      ):(
        <Link className="navbar-brand" href="/">
          <Image src={logoPalau} width="30" height="30" className={`d-inline-block align-top ${styles['image--cover--navbar']}`} alt=""/>
          ACME Health Patient Portal Login
        </Link>        
          
      )}

   
    {/* <ul className="navbar-nav mr-auto mt-2 mt-lg-0"> */}

   {logout ? ( 
        <ul className="nav navbar-nav">

                            {/* <Link className="navbar-brand btn btn-success" to="/">Patient Portal</Link> */}
            <li className="nav-item" style={{margin:"5px"}}>
                {/* <ConnectWallet dropdownPosition={{
                    align: 'center',
                    side: 'bottom'
                }} /> */}
                <button className="btn btn-light">Log Out</button>
            </li>

                                {/* <li className="nav-item" style={{margin:"5px"}}>
                                    <Link className="navbar-brand btn btn-primary" to="/add-patient">Add Patient</Link>
                                </li> */}

                                {/* <li className="nav-item">
                                <Link className="navbar-brand btn btn-primary" to="/edit-patient/:id">Edit Patient</Link>
                                </li> */}

                                {/* <li className="nav-item" style={{margin:"5px"}}>
                                <Link className="navbar-brand btn btn-primary" to="/pharmacy-list">Edit Pharmacy</Link>
                            </li> */}

                                {/* <li className="nav-item" style={{margin:"5px"}}>
                                <Link className="navbar-brand btn btn-primary" to="/view-script">Scripts For {addyShortner(address)} </Link>
                                </li> */}

        </ul>
        ) : (
            <ul>
                <li>{" "}</li>
            </ul>
        )}
  </div>
</nav>


    )
}