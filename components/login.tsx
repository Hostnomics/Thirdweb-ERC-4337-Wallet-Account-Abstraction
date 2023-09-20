// Created at (15:37): https://youtu.be/D58EhH2em5s?si=DDOCFXWx2fAcd4vv&t=937
import { useState } from 'react';

import styles from "../styles/Home.module.css"; 
// import "../styles/Home.module.css";

//At (19:09) import the animation_lludrgas.json file from our assets folder to serve as the loading icon
// import loadingLottie from '../assets/lottie/animation_lludrgas.json';
import loadingLottie from '../assets/lottie/loading.json';
// import loadingLottie from '../assets/lottie/loading.json';
import LottieLoader from 'react-lottie-loader';
import { connectToSmartWallet } from '../lib/wallets';
import { Connected } from './connected';
import { PatientDashboard } from './patient-dashboard';

import { Navbar } from "./navbar";
// import { NavbarDashboard } from "./navbar-dashboard";
import { useAddress } from "@thirdweb-dev/react";

// import {Link} from 'react-router-dom'

type LoginProps = {
  isOpen: boolean;
  onClose: () => void;
};


export const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  //set state variables for login modal
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signer, setSigner] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [error, setError] = useState('');

  const address = useAddress()

  if(!isOpen) return null;

//close out our modal (16:51)
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose(); 
    }
  };


//Create the connectWallet function at (21:31)
  // - Check username to see if there is an account deployed already
  // - Get/Generate local wallet with the password
  // - Connect said wallet with applications.
  // - (22:16) create Lib/constants.tsx 
  const connectWallet = async () => {
//Return and complete connectWallet at (39:47) after building out lib/wallets.ts: https://youtu.be/D58EhH2em5s?si=ku-jM7tOY9GrSuAY&t=2387
//Check if they lack username or password and exit function if missing either: 
      if(!username || !password) return;
  //otherwise: 
      try {
          setIsLoading(true); 
          //connect to smart wallet using function created: 
          const wallet = await connectToSmartWallet(
            username,
            password,
            (status) => setLoadingStatus(status)
          );
          
          //Get and set signer to smart wallet
          const s = await wallet.getSigner();
          setSigner(s); 
          setIsLoading(false);
      }catch (error) {
          setIsLoading(false); 
          console.error("Error in login.tsx connectWallet catch block is ", error); 
          setError((error as any).message);
      }
  };


// (16:54) - Check for various states: 
  return username && signer ? (

    <>

    {/* // build out connected.tsx Component at (41:10): https://youtu.be/D58EhH2em5s?si=NpPwt6Pv1HvzWMUO&t=2470 */}
    {/* //Then reviewed this Connected component display at (46:06): https://youtu.be/D58EhH2em5s?si=z4aJNW0zcBZK5A5E&t=2766 */}
        {/* <Connected
            signer={signer}
            username={username}
        /> */}

        <PatientDashboard
            signer={signer}
            username={username}
        />
    </>
  ) : isLoading ? (
      // <div className={styles.card}>
      //     <div style={{width:"440px"}}>
      //         <LottieLoader animationData={loadingLottie} />
      //         <p>{loadingStatus}</p>
      //     </div>
      // </div>
    <>
          {/* <NavbarDashboard displayNav={false} logout={false}/> */}
          <Navbar gotAddress={address} logout={false}/>
          <div className="row mt-5">
                <div className="col-sm-3">

                </div>


              <div className="col-sm-6">
                    <div className="card bg-light mb-3">


                        <div className='card-header bg-primary'>
                          <h5 style={{color:"white"}} className="text-center">Confirming your credentials on the blockchain...</h5>
                        </div>


                          <div className="card-body">
                              {/* <div style={{width:"440px"}}> */}
                                  <LottieLoader animationData={loadingLottie} />
                                  <h5 className="card-text text-center">{loadingStatus}</h5>
                              {/* </div> */}
                          </div>

                          <div className='card-footer'>

                          </div>

                    </div>
              </div>
          </div>
    </>

  ) : error ? (

  <>    
        {/* <NavbarDashboard displayNav={false} logout={false}/> */}
        <Navbar gotAddress={address} logout={false}/>


        <div className="row mt-5">
              <div className="col-sm-3">

              </div>


              <div className="col-sm-6">
                    <div className="card bg-light mb-3">
                        <div className='card-header bg-danger'>
                          <h5 style={{color:"white"}} className="text-center">Unable to Connect to your Account</h5>
                        </div>
                        <div className='card-body'>
                          <h5 className="card-text text-center">The password you tried did not work. Please try again.</h5>

                        </div>

                        <div className='card-footer'>
                            <div className="row">
                                  <button onClick={() => setError("")} className="btn btn-outline-danger btn-lg btn-block">
                                      Try again
                                  </button>
                            </div>
                        </div>
                              {/* 
                                  <hr></hr>
                                  <div className="row">
                                      <button onClick={() => setError("")} className="btn btn-outline-primary btn-lg btn-block">
                                          Forgot your password? Click here to reset it.
                                      </button>
                                </div> */}
                      </div>
                </div>

          </div>
  </>
  ) : (
      <>
            <Navbar gotAddress={address} logout={false}/>
            <div className="row mt-5">
            <div className="col-sm-3">

            </div>

            <div className="col-sm-6">

            {/* // <div className={`${styles.loginContainer} ${isOpen ? styles.open : ""}`} */}
            <div className={isOpen ? `card` : ""} 
                onClick={handleOutsideClick}
                //  style={{maxWidth:"18rem"}}
            >

                {/* <div className={`${styles.loginCard} ${isOpen ? styles.open : "" }`}> */}
                <div className={isOpen ? `card-header bg-primary` : ""}>

                  {/* <div className="row"> */}
                          <button 
                            onClick={onClose}
                            // className={styles.closeButton}
                            className="btn btn-outline-light"
                            // style={{color:"blue", fontWeight:"bold"}}
                          >
                            {/* &laquo;  */}
                            X
                          </button>
                          {/* <Link className="small font-weight-bold" to={`/`} onClick={onClose}>&laquo; Back to Posts List</Link> */}

                          <h1 style={{color:"white"}} className="text-center">Acme Portal Login</h1>
                      {/* </div> */}
                </div>

                <div className={isOpen ? `card-body` : ""}>
                      {/* Create inputs at (20:43) */}
                      {/* <div className={styles.loginInput}> */}
                      <div className="form-group">
                          <label >Email address: </label>{" "}
                                <input 
                                  className="form-control form-control-lg"
                                  type="email"
                                  placeholder="Enter your email address"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                />
                      </div>

                      <div className="form-group mt-2">
                          <label htmlFor="exampleInputPassword1">Password:</label>
                                <input 
                                  className="form-control form-control-lg"
                                  type="password"
                                  placeholder="Enter your Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                      </div>


                </div>
                <div className={isOpen ? `card-footer` : ""}>

                      <div className="row">
                            <button className="btn btn-success btn-large btn-block"
                              onClick={() => connectWallet()}
                            >
                                Login
                            </button>
                      </div>

                </div>

            </div>

        </div>

        </div>
    </>
  );


};

