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
    // build out ifConnected Component at (41:10): https://youtu.be/D58EhH2em5s?si=NpPwt6Pv1HvzWMUO&t=2470
    <>
      <p>Connected</p>
    </>
  ) : isLoading ? (
      <div className={styles.card}>
        <div style={{width:"440px"}}>
          <LottieLoader animationData={loadingLottie} />
          <p>{loadingStatus}</p>
        </div>
      </div>
  ) : error ? (

      <div>
        <p>Error</p>
          <button onClick={() => setError("")}>
              Try again
          </button>
      </div>

  ) : (

    <div className={`${styles.loginContainer} ${isOpen ? styles.open : ""}`}
         onClick={handleOutsideClick}
    >

        <div className={`${styles.loginCard} ${isOpen ? styles.open : "" }`}>

              <button 
                onClick={onClose}
                className={styles.closeButton}
              >
                  x
              </button>

              <h1>UniLogin</h1>

              {/* Create inputs at (20:43) */}
              <div className={styles.loginInput}>
                    <input 
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      onClick={() => connectWallet()}
                    >
                        Login
                    </button>
              </div>

        </div>

    </div>


  );

};

