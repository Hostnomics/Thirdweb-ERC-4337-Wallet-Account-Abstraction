 //Reviewed at (): 

// import { MediaRenderer, ThirdwebNftMedia } from "@thirdweb-dev/react"
import { useAddress, useContract, ConnectWallet, useOwnedNFTs, ThirdwebNftMedia, 
    useTransferNFT, useMetadata, useNFT, MediaRenderer, Web3Button } from "@thirdweb-dev/react";

import { NFT } from "@thirdweb-dev/sdk"

import Link from "next/link";

import styles from "../styles/ViewScripts.module.css";

import { useState, useEffect } from 'react';

import {ethers} from 'ethers';

import { addressShortener, formatDateTwoDigitYear, formatDateFourDigitYear, convertBigNumberToFourDigitYear} from '../lib/utils'; 

import { THIRDWEB_API_KEY, chain, nftCollection, solidityContractAddress } from '../lib/constants' 

import Axios from 'axios'

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


    const [transferAddress, setTransferAddress] = useState("");

    const handleTransferConfirmation = () => {
        alert("Success! Transfer has been sent!")
    }

//Load Pharmacies
const [pharmacy, setPharmacy] = useState([]);

useEffect(()=> { 
    // Make call to server to pull pharmacies:
    const loadViewPharmacy = async () => {
        const result = await Axios.get("https://rxminter.com/php-react/view-pharmacy.php");
        console.log(result);
        setPharmacy(result.data.records);      
    }

    loadViewPharmacy();
}, [])


    const [showName,setShowName] = useState('')


    const handlePharmacyChange=(e: any, id: any)=>{
        // setRxWallet({...rxWallet,[e.target.name]: e.target.value, tokenId: id })
        // console.log('handleChange just updated:',rxWallet);

        const {value, options } = e.target
        const rawName = options[e.target.selectedIndex].text;
        const formattedName = rawName.substring(0, rawName.indexOf(" ["));
        setShowName(formattedName)
        setTransferAddress(e.target.value)

        // setRxWallet({...rxWallet,[e.target.name]: e.target.value, tokenId: id, pharmacyName: options[e.target.selectedIndex].text })
        console.log("showName is now ", showName);
        console.log('transferAddress is now', transferAddress);
        console.log("event in handlePharmacyChange is ", e)
    }


    // const [pharmacyFax, setPharmacyFax] = useState({
    //     pharmacy_name: "",
    //     pharmacy_wallet: "",
    //     pharmacy_phone:"",
    //     pharmacy_fax:"",
    //     pharmacy_address:"",
    //     id:""
    // });    

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
                                        {/* <Link className="btn btn-primary" href={`https://doctors.rxminter.com/fax-prescription/${nft.metadata.id}`}>Send {nft.metadata.attributes[0].value} To A Pharmacy</Link> */}
                                        {/* <input 
                                                type="text"
                                                placeholder="0x00000"                                               
                                                value={transferAddress}
                                                onChange={(e) => setTransferAddress(e.target.value)}
                                               
                                        /> */}
                                    <h5 className="text-center display-8" style={{color:"white"}}>Select A Pharmacy from the drop down menu below:</h5>
                            <form>

                                        <div className={`${styles['view-scripts-card']}`}>
                                
                                                <div className={`${styles['input-group-mb-3']}`}>

                                                    <select className="form-select" aria-label="Select A Medication" name="pharmacy" onChange={(e) => handlePharmacyChange(e, nft.metadata.id)} >
                                                        <option selected value="">Select a Pharmacy...</option>

                                                        {pharmacy.map((pharmacy: any, index) => (
                                                            <option 
                                                                value={`${pharmacy.pharmacy_wallet}`}                                                                                  
                                                                key={`${index}`}>
                                                                    {pharmacy.pharmacy_name} [{addressShortener(pharmacy.pharmacy_wallet)}]
                                                            </option>                                                                            
                                                        ))}

                                                    </select>     
                                                </div>

                                                    {/* <input type="hidden" name="tokenIdInput" value={nft.metadata.id} ref={inputTokenId}></input> */}
                                                
                                                {/* <div className="row">
                                                    <div className="col-md-12">
                                                    
                                                        <button type="submit" className="btn btn-success">Submit {nft.metadata.medication} To Pharmacist</button>
                                                    </div>
                                                </div> */}
                                        </div>
                                </form>








                                            {transferAddress != "" && (
                                                
                                                    <Web3Button
                                                        contractAddress={solidityContractAddress}
                                                        action={(contract) => contract.erc721.transfer(transferAddress, nft.metadata.id)}
                                                        onSubmit={() => setTransferAddress("")}
                                                        onSuccess={() => {handleTransferConfirmation}}
                                                    >Transfer to {showName} ({addressShortener(transferAddress)})</Web3Button>
                                            )}
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
                <h2>There are no prescriptions found for your Wallet Address on the blockchain at this time.</h2>        
      )}
</div>
</div>
</div>

    </>   
        
    )
}