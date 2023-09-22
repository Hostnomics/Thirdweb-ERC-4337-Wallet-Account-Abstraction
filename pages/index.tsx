'use client';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { useState } from 'react';
import { Login } from "../components/login";

// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css';
import { NavbarDashboard } from "../components/navbar-dashboard";
import { Navbar } from "../components/navbar";
import { PatientDashboard } from '../components/patient-dashboard';

//From https://github.com/vercel/next.js/blob/canary/examples/head-elements/pages/index.tsx
//via docs: https://nextjs.org/docs/pages/api-reference/components/head
import Head from 'next/head'

// Built out at (14:10): https://youtu.be/D58EhH2em5s?si=sgh2IcY71F9OPgf-&t=850
const Home: NextPage = () => {

  const [isModalOpen, setIsOpen] = useState(false);

  const address = useAddress()
  // const [findAddress, setFindAddress] = useState(null)
  // const [findLogout, setFindLogout] = useState(false)

  return (
    <> 
      <Head>
        <title>Acme Healthchain</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
  {!isModalOpen && (
    <>
        <NavbarDashboard displayNav={true} logout={false}/>
     

            <div className="row mt-5">
                <div className="col-sm-3">

                </div>

                <div className="col-sm-6">
          {/* <>  */}

                      <div className="card">         
                            <div className="card-header bg-primary">
                                <h1 style={{color:"white"}} className="text-center">Acme Health Patient Login</h1>
                            </div>

                            <div className="card-body">
                              {/* <p>Login with the username and password given to you by your medical provider.</p> */}
                              <h5 className="card-text text-center">Login with the username and password given to you by your medical provider.</h5>
                            </div>

                            <div className='card-footer'>
                                <div className="row">
                                      <button onClick={() => setIsOpen(true)} className="btn btn-primary btn-lg btn-block">
                                          Click Here To Login
                                      </button>
                                </div>
                            </div>

                               
                      </div>
         {/* </> */}
                  </div>
            </div>
          </>
        )}

          <Login 
            isOpen={isModalOpen}
            onClose={() => setIsOpen(false)}      
          />

      
    </>
  );
};

export default Home;
