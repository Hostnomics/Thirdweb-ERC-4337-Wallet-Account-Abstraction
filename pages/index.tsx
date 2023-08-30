'use client';
import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { useState } from 'react';
import { Login } from "../components/login";

// Built out at (14:10): https://youtu.be/D58EhH2em5s?si=sgh2IcY71F9OPgf-&t=850
const Home: NextPage = () => {

  const [isModalOpen, setIsOpen] = useState(false);


  return (
    <>

      <div className={styles.container}>
        {!isModalOpen && (
          <div className={styles.card}>
              <h1>Onchain Login</h1>
              <p>Login with only a username and password.</p>
              <button
                className={styles.loginButton}
                onClick={() => setIsOpen(true)}
              >Login</button>
           </div>
        )}

          <Login 
            isOpen={isModalOpen}
            onClose={() => setIsOpen(false)}      
          />

      </div>
      
    </>
  );
};

export default Home;
