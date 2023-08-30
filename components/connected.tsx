//Built out at (42:54): https://youtu.be/D58EhH2em5s?si=xSTdYKawp1J8Kh5w&t=2574

import { ThirdwebSDKProvider, useAddress, useContract, useContractMetadata, useOwnedNFTs } from '@thirdweb-dev/react'
import { Signer } from 'ethers'
import { THIRDWEB_API_KEY, chain, nftCollection } from '../lib/constants'

import styles from "../styles/Home.module.css";

import loadingLottie from '../assets/lottie/loading.json';
import LottieLoader from 'react-lottie-loader';

import { NFTClaim } from '../components/nft-claim'
import { OwnedNFTs } from '../components/owned-nfts'



export const Connected = ({
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

    const {
        contract 
    } = useContract(nftCollection);
    const {
        data: contractMetadata,
        isLoading: contractMetadataLoading,
    } = useContractMetadata(contract);

    const {
        data: ownedNFTs,
        isLoading: ownedNFTsLoading,
    } = useOwnedNFTs(contract, address);

    return (
        <div className={styles.appContainer}>

            <div>
                {address && (
                    <>
                        <h1>Welcome <span className={styles.gradientText1}>{username}</span></h1>
                        <p className={styles.addressPill}>{truncateAddress(address!)}</p>
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
                <div className={styles.nftContainer}>
                        <div style={{ textAlign: "center" }}>
                                <NFTClaim 
                                    contractMetadata={contractMetadata}
                                />
                        </div>
                        <div className={styles.nftSection}>
                                <OwnedNFTs 
                                    ownedNFTs={ownedNFTs!}
                                    isLoading={ownedNFTsLoading}
                                />
                        </div>
                </div>

            )}
        </div>

    )

}