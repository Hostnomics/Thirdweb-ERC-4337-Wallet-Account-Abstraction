//From (13:17) / (17:06): https://youtu.be/-RNQ5GoghGY?si=QrE6Jb9YPnqkhaEb&t=797
import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";
// import styles from "../styles/Home.module.css";
import 'bootstrap/dist/css/bootstrap.css'
import styles from "../styles/ViewScripts.module.css";
import logoPalau from '../assets/logoPalau.svg';
import Image from 'next/image';
import React from 'react'


import Link from "next/link";
// import {useRouter} from "next/router";

type NavbarProps = {
    gotAddress: string | undefined;
    logout: boolean;
  };

export const Navbar: React.FC<NavbarProps> = ({ gotAddress, logout }) => {
// export const Navbar = () => {
// export default function Navbar() {
    const address = useAddress();
    const disconnect = useDisconnect();


        function truncateAddress(gotAddress: string) {
            return gotAddress.slice(0,6) + "..." + gotAddress.slice(-4);
        }

        // function handleRefresh(){
        //     window.location.reload();
        // }

        // const handleLogOut = (e: React.MouseEvent<HTMLDivElement>) => {
        const handleLogOut = (e: any) => {
            // if (e.currentTarget === e.target) {
            //   onClose(); 
            window.location.reload();
            // }
          };

        // const router = useRouter();

    return (
        // <ConnectWallet 
        //     className={styles.walletButton}
        //     // btnTitle="Sign In"
        //     theme="dark"
        // />


        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container">

      {gotAddress ? (

          <Link className="navbar-brand" href="/">
            {/* <Image src={logoPalau} width="30" height="30" className="d-inline-block align-top image--cover--navbar" alt=""/> */}
            <Image src={logoPalau} width="30" height="30" className={`d-inline-block align-top ${styles['image--cover--navbar']}`} alt=""/>
             ACME Patient Dashboard <small >({truncateAddress(gotAddress)})</small>
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
               
                <button className='btn btn-light' onClick={(e) => handleLogOut(e)}>Log Out</button>
                {/* <button className='btn btn-light' onClick={() => router.push("/")}>Log Out</button> */}
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