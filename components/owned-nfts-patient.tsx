 //Reviewed at (): 

// import { MediaRenderer, ThirdwebNftMedia } from "@thirdweb-dev/react"
import { useAddress, useContract, ConnectWallet, useOwnedNFTs, ThirdwebNftMedia, 
    useTransferNFT, useMetadata, useNFT, MediaRenderer, Web3Button } from "@thirdweb-dev/react";

import { NFT } from "@thirdweb-dev/sdk"

import Link from "next/link";

import styles from "../styles/ViewScripts.module.css";

import { useState, useEffect, useRef } from 'react';

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

const [resetDropDown,setResetDropDown] = useState('')

const toggleNFT = (item: any) => {
if (selectedNFT === item) {
    setSelectedNFT(null);
    // setResetDropDown('')
} else {
    setSelectedNFT(item);
    setTransferAddress('')
    setShowName('')
    handleBlur(item)
    // setResetDropDown('selected')
}
};

const displayTotalMessage = () => {
    if (ownedNFTs?.length == 1) {
        return `There is 1 prescription in your wallet.`
    }else if(ownedNFTs?.length > 1){
        return `There are ${ownedNFTs?.length} prescriptions in your wallet.`
    }else{
        return ``
    }
}



const handleTransferConfirmation = () => {
    alert("Success! Your Prescription has been transferred to your pharmacy!")
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

    const [selectedPharmacyWallets, setSelectedPharmacyWallets] = useState<{ [key: string]: string }>({});
    const [transferAddress, setTransferAddress] = useState("");

    
    // const [selectedPharmacyNames, setselectedPharmacyNames] = useState<{ [key: string]: string }>({});
    const [showName,setShowName] = useState('')
    // const [showName, setShowName] = useState<{ [key: string]: string }>({});


    // const handlePharmacyChange=(e: any, id: any)=>{
    const handlePharmacyChange=(e: React.ChangeEvent<HTMLSelectElement>, cardId: string) => {
        // setRxWallet({...rxWallet,[e.target.name]: e.target.value, tokenId: id })
        // console.log('handleChange just updated:',rxWallet);
      
        const {value, options } = e.target
        const rawName = options[e.target.selectedIndex].text;
        const formattedName = rawName.substring(0, rawName.indexOf(" ["));
        setShowName(formattedName)
        
setTransferAddress(e.target.value)
                // const transferAddress = e.target.value
    // Update the selected pharmacy for the specific card
        setSelectedPharmacyWallets((prevselectedPharmacyNames) => ({
            ...prevselectedPharmacyNames,
            [cardId]: transferAddress,
        }));

        // setRxWallet({...rxWallet,[e.target.name]: e.target.value, tokenId: id, pharmacyName: options[e.target.selectedIndex].text })
        console.log("Selected Pharmacy showName is now ", showName);
        console.log('Selected Pharmacy transferAddress is now', transferAddress);
        console.log("event in handlePharmacyChange is ", e)

        // let display_selected_pharmacy_ref = displaySelectedPharmacyRef.current.value
    }


    const handleBlur = (cardId: string) => {
            // Clear the selected pharmacy for the specific card
            setSelectedPharmacyWallets((prevSelectedPharmacies) => ({
            ...prevSelectedPharmacies,
            [cardId]: '',
            }));
      };


    //   const displaySelectedPharmacyRef = useRef("");  

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
                        <div className={`${styles['item']}`} key={nft.metadata.id} style={{width:"100%"}}> 
                                    {nft.metadata.attributes[2].value - nft.metadata.attributes[3].value !== 0 ? (

                                        <div className={`${styles['title']}`} onClick={() => toggleNFT(nft.metadata.id)}> 
                                            <h4>{nft.metadata.attributes[0].value} - {convertBigNumberToFourDigitYear(nft.metadata.attributes[5].value)}  </h4>
                                            <span>{selectedNFT == nft.metadata.id ? ' [ - ]' : ' [ + ]'}</span>
                                        </div>

                                    ) : (
                                        
                                        <div className={`${styles['title-filled']}`} onClick={() => toggleNFT(nft.metadata.id)}> 
                                                                {/* title-filled  */}
                                            <h4 >{nft.metadata.attributes[0].value} - {convertBigNumberToFourDigitYear(nft.metadata.attributes[5].value)}  </h4>
                                            <span style={{color:"red"}}>{selectedNFT == nft.metadata.id ? ' [ - ]' : ' [ + ]'}</span>
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

                                                    <select className="form-select" aria-label="Select A Medication" name="pharmacy" 
                                                        onChange={(e) => handlePharmacyChange(e, nft.metadata.id)} 
                                                        onBlur={() => handleBlur(nft.metadata.id)} // Clear the selected pharmacy on blur
                                                        // value={selectedPharmacyWallets[nft.metadata.id] || ''}
                                                        // value={transferAddress != "" ? selectedPharmacyWallets[nft.metadata.id] || '' : ''}  
                                                        // ref={displaySelectedPharmacyRef}  
                                                        value={showName}                                     
                                                    >
                                                        <option selected value="">Select a Pharmacy...</option>

                                                        {pharmacy.map((pharmacy: any) => (
                                                            <option 
                                                               
                                                                value={`${pharmacy.pharmacy_wallet}`}                                                               

                                                                key={`${pharmacy.id}`}>
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








                                            {/* {transferAddress != "" && ( */}
                                            {showName != "" && transferAddress != "" && (
                                                
                                                    <Web3Button
                                                        contractAddress={solidityContractAddress}
                                                        action={(contract) => contract.erc721.transfer(transferAddress, nft.metadata.id)}
                                                        onSubmit={() => setTransferAddress("")}
                                                        onSuccess={() => {handleTransferConfirmation}}
                                                        style={{backgroundColor:"yellow",color:"b"}}
                                                        className="btn btn-warning btn-lg btn-black"
                                                    >Transfer to {showName} ({addressShortener(transferAddress)})</Web3Button>
                                            )}
                                    </div>

                                </>
                            ) : (

                        <>

                    <div className={`${styles['view-scripts-card']}`}>

                        <div className={`${styles['input-group-mb-3']}`}>

                            {/* <h5 className="text-center display-8" style={{color:"white"}}>Medication {nft?.metadata.attributes[0].value}  */}
                            <h5 className="text-center display-8" style={{color:"white"}}>Medication was filled on {convertBigNumberToFourDigitYear(nft.metadata.attributes[6].value)}</h5>

                        </div>
                    </div>

                            {/* <form>


                                            <select className="form-select" aria-label="Select A Medication" name="pharmacy" 
                                                onChange={(e) => handlePharmacyChange(e, nft.metadata.id)} 
                                                onBlur={() => handleBlur(nft.metadata.id)} // Clear the selected pharmacy on blur
                                   
                                                value={showName}                                     
                                            >
                                                <option selected value="">Select a Pharmacy...</option>

                                                {pharmacy.map((pharmacy: any) => (
                                                    <option 
                                                    
                                                        value={`${pharmacy.pharmacy_wallet}`}                                                               

                                                        key={`${pharmacy.id}`}>
                                                            {pharmacy.pharmacy_name} [{addressShortener(pharmacy.pharmacy_wallet)}]

                                                    </option>                                                                            
                                                ))}

                                            </select>     
                                        </div>

      
                                    </div>
                                </form> */}
{/* Replaced Old Fill Message with above */}
                                {/*  <div className={`${styles['view-scripts-card']}`}>     */}
                                     {/* <div className={`${styles['input-group-mb-3']}`}>                       */}
                                        {/* <div className="input-group-mb">
                                            <p><b style={{color:"white"}}>Medication Filled: {convertBigNumberToFourDigitYear(nft.metadata.attributes[6].value)}</b></p>                                  
                                        </div> */}
                                     {/* </div> */}
                                {/*  </div> */}

                                </>
                            )}
                    </div>
                </div>
            </div>
            // </div>
            // </>
            )

            ) : (
                <div className="row mt-3">
                <div className="col-sm-1">
  
                </div>
  
  
                <div className="col-sm-10">
                      <div className="card bg-light mb-3">
                          <div className='card-header bg-light'>
                            <h5 className="text-center">No NFT Scripts Found</h5>
                          </div>
                          <div className='card-body'>
                           
                              <h5 className="card-text text-center">You do not currently have any NFT prescriptions in your wallet.</h5>
                           
                            <div className="text-center">
                            </div>
                          </div>
  
                          <div className='card-footer'>
                              <div className="row text-center">
                                    <i>If you have questions, please contact your provider or pharmacy.</i>
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
      )}
</div>
</div>
</div>

    </>   
        
    )
}