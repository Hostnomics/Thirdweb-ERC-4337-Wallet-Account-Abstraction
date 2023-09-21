 //Reviewed at (): 

// import { MediaRenderer, ThirdwebNftMedia } from "@thirdweb-dev/react"
import { useAddress, useContract, ConnectWallet, useOwnedNFTs, ThirdwebNftMedia, 
    useTransferNFT, useMetadata, useNFT, MediaRenderer } from "@thirdweb-dev/react";

import { NFT } from "@thirdweb-dev/sdk"

import Link from "next/link";

import styles from "../styles/ViewScripts.module.css";

import { useState } from 'react';

import {ethers} from 'ethers';

import { addressShortener, formatDateTwoDigitYear, formatDateFourDigitYear, convertBigNumberToFourDigitYear} from '../lib/utils'; 

type PatientOwnedNFTsProps = {
    ownedNFTs: NFT[]
    isLoading: boolean
}
// address: string | undefined

export const PatientOwnedNFTs: React.FC<PatientOwnedNFTsProps> = ({ ownedNFTs, isLoading }) => {


//Accordion Toggle 
// const [selectedNFT, setSelectedNFT] = useState<any | null>(null);
const [selectedNFT, setSelectedNFT] = useState(null);

const toggleNFT = (item: any) => {
if (selectedNFT === item) {
    setSelectedNFT(null);
} else {
    setSelectedNFT(item);
}
};

const displayTotalMessage = () => {
    if (ownedNFTs?.length == 1) {
        return `There is 1 prescription available for you to manage.`
    }else if(ownedNFTs?.length > 1){
        return `There are ${ownedNFTs?.length} prescriptions available for you to manage.`
    }else{
        return ``
    }
}

    return (

       <>
            <div>
                
                {isLoading ? (
                    // <p>Loading...</p>
                    <p className="text-center">Loading...</p>
                ) : (
                    
                        <h5 className="text-center">{displayTotalMessage()}</h5>  
                    
                )}
            </div>

<div className={`${styles['wrapper']}`}>     
<div className={`${styles['accordion']}`}>
<div className={`${styles['view-scripts-card']}`}>

            {ownedNFTs && ownedNFTs.length > 0 ? 
                // <>
                // <div style={{
                //     width: "100%",
                //     display: "flex",
                //     flexDirection: "row",
                //     flexWrap: "wrap",
                //     justifyContent: "space-between",
                // }}>

                    ownedNFTs.map((nft: any) => (
                        <div className={`${styles['item']}`}> 
                                    {nft.metadata.attributes[2].value - nft.metadata.attributes[3].value !== 0 ? (
                                        <div className={`${styles['title']}`} onClick={() => toggleNFT(nft.metadata.id)}> 
                                            <h4>{nft.metadata.attributes[0].value} - {convertBigNumberToFourDigitYear(nft.metadata.attributes[5].value)}  </h4>
                                            <span>{selectedNFT == nft.metadata.id ? ' [ - ]' : ' [ + ]'}</span>
                                        </div>
                                    ) : (
                                        <div className={`${styles['title-filled']}`} onClick={() => toggleNFT(nft.metadata.id)}> 
                                            <h4>{nft.metadata.attributes[0].value} - {convertBigNumberToFourDigitYear(nft.metadata.attributes[5].value)}  </h4>
                                            <span>{selectedNFT == nft.metadata.id ? ' [ - ]' : ' [ + ]'}</span>
                                        </div>
                                    )}
                                    
                        <div className={selectedNFT == nft.metadata.id ? `${styles['contento show']}` : `${styles['contento']}`}>
                            <div key={nft.metadata.id.toString()} className={`${styles['view-scripts-card']}`}>

                                            

                                                <ThirdwebNftMedia metadata={nft.metadata} 
                                                    // className={`${styles['view-scripts-card']}`}
                                                    // className="mb-240"
                                                    style={{marginBottom:"-240px"}}
                                                /> 

                                                    <p><b>Patient:</b> {nft?.metadata.name.startsWith('0x') ? (
                                                                            ethers.utils.toUtf8String(ethers.utils.RLP.decode(nft.metadata.name))
                                                                        ) : (
                                                                            nft.metadata.name
                                                                        ) } | 
                                                        <b> DOB:</b> {nft?.metadata.attributes[1].value.startsWith('0x') ? (
                                                                            formatDateTwoDigitYear(ethers.utils.toUtf8String(ethers.utils.RLP.decode(nft.metadata.attributes[1].value)))
                                                                        ) : (
                                                                            formatDateTwoDigitYear(nft.metadata.attributes[1].value)
                                                                        )
                                                                        }
                                                    </p>
                                      
                                                    <p className={`${styles['hyphens']}`}><b>Medication:</b> {nft.metadata.attributes[0].value}</p>
                                                    <p className={`${styles['hyphens']}`}><b>SIG:</b> {nft.metadata.description}</p>
                      

                                                    <p><b>Qty:</b> {nft.metadata.attributes[2].value} | <b>Date Prescribed:</b> {convertBigNumberToFourDigitYear(nft.metadata.attributes[5].value)}</p>
                                            {nft.metadata.attributes[3].value != 0 && 
                                                    <p><b>Qty Filled:</b> {nft.metadata.attributes[3].value} | <b>Last Filled:</b> {convertBigNumberToFourDigitYear(nft.metadata.attributes[6].value)}</p>
                                            }

             
                            {nft.metadata.attributes[2].value - nft.metadata.attributes[3].value !== 0 ? (
                                <>          

                                    <div className={`${styles['view-scripts-card']}`}>

                                        {/* <Link className="btn btn-primary" href={`/patient-fax-script/${nft.metadata.id}`}>Send {nft.metadata.attributes[0].value} To A Pharmacy</Link> */}
                                        <Link className="btn btn-primary" href={`https://doctors.rxminter.com/fax-prescription/${nft.metadata.id}`}>Send {nft.metadata.attributes[0].value} To A Pharmacy</Link>
                                        

                                    </div>

                                </>
                            ) : (
                                <div className={`${styles['view-scripts-card']}`}>    
                                                          
                                    <div className="input-group-mb">
                                        <p><b style={{color:"white"}}>Medication Filled: {convertBigNumberToFourDigitYear(nft.metadata.attributes[6].value)}</b></p>                                  
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
            // </div>
            // </>
            )

            ) : (
                <h2>Nada</h2>        
      )}
</div>
</div>
</div>

    </>   
        
    )
}