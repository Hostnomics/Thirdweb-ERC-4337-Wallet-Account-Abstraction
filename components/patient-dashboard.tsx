//Built out at (42:54): https://youtu.be/D58EhH2em5s?si=xSTdYKawp1J8Kh5w&t=2574

import { ThirdwebSDKProvider, useAddress, useContract, useContractMetadata, useOwnedNFTs,
          ConnectWallet, ThirdwebNftMedia } from '@thirdweb-dev/react';
import { Signer, ethers } from 'ethers'
import { THIRDWEB_API_KEY, chain, nftCollection, solidityContractAddress } from '../lib/constants' 

import styles from "../styles/Home.module.css";

import loadingLottie from '../assets/lottie/loading.json';
import LottieLoader from 'react-lottie-loader';

import { NFTClaim } from '../components/nft-claim'
// import { OwnedNFTs } from '../components/owned-nfts'
import { PatientOwnedNFTs } from '../components/owned-nfts-patient'

import {Navbar} from './navbar';
// import { NavbarDashboard } from "./navbar-dashboard";

import Link from "next/link";

import { addressShortener, formatDateTwoDigitYear, formatDateFourDigitYear, convertBigNumberToFourDigitYear} from '../lib/utils'; 


export const PatientDashboard = ({
    username,
    signer,
} : {
    username: string,
    signer: Signer,
}) => {
    return (
        <ThirdwebSDKProvider
            signer={signer}
            activeChain={chain}
            clientId={THIRDWEB_API_KEY || ''}
        >

            <ConnectedInner username={username} />

        </ThirdwebSDKProvider>
    )
}


//At (44:44) create our ConnectedInner function
const ConnectedInner = ({ username } : { username: string} ) => {
    const address = useAddress(); 

    function truncateAddress(address: string) {
        return address.slice(0,6) + "..." + address.slice(-4);
    }

    // const {
    //     contract 
    // } = useContract(nftCollection);
    const { contract } = useContract(solidityContractAddress); // 13.1- Improved metadata and function callls (5/23/23)

    const {
        data: contractMetadata,
        isLoading: contractMetadataLoading,
    } = useContractMetadata(contract);

    const {
        data: ownedNFTs,
        isLoading: ownedNFTsLoading,
    } = useOwnedNFTs(contract, address);

    function handleRefresh(){
        window.location.reload();
    }



    return (
        <div className={styles.appContainer}>
    {/* <NavbarDashboard displayNav={false} logout={false}/> */}
    <Navbar gotAddress={address} logout={true}/>
            <div>
                {address && (
                    <>
                        <div className="mt-5">
                            {/* <h1 className="text-center">Welcome <span className={styles.gradientText1}>{username}</span> To Your Prescription Dashboard</h1> */}
                            <h1 className="text-center">Welcome <span className={styles.gradientText1}>Ian McGregor</span> To Your Prescription Dashboard</h1>

                            {/* <p className={styles.addressPill}>Short Version: {truncateAddress(address!)}</p> */}
                            {/* <p className={styles.addressPill}>Your Wallet Address: {address}</p> */}
            
                            {/* <h2 className={`align-center text-center ${styles.gradientText1}`}>Your Wallet Address: <span className={styles.gradientText1}>{address}</span></h2> */}
                            <h2 className={`align-center text-center`}>Your Wallet Address: <span className={styles.gradientText1}>{address}</span></h2>
                        </div>
                        
                    </>
                )}
            </div>
{/* contractMetadataLoading added (43:59) */}
            {contractMetadataLoading ? (
                
                <div className={styles.loadingContainer}>
                    <LottieLoader 
                        // animationData={nftLoader}
                        animationData={loadingLottie} 
                        className={styles.loadingAnimation}
                    />
                </div>
            ) : (
                // <div className={styles.nftContainer}>
                <div className="mt-5">
                        {/* <div style={{ textAlign: "center" }}>
                                <NFTClaim 
                                    contractMetadata={contractMetadata}
                                />
                        </div> */}

                        {/* <div className={styles.nftSection}> */}
                        <div>
                                <PatientOwnedNFTs 
                                    ownedNFTs={ownedNFTs!}
                                    isLoading={ownedNFTsLoading}
                                />
                        </div>
                </div>

            )}
        </div>

    )

}