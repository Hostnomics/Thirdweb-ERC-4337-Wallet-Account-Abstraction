//Reviewed at (): 

import { MediaRenderer } from "@thirdweb-dev/react"
import { NFT } from "@thirdweb-dev/sdk"

type OwnedNFTsProps = {
    ownedNFTs: NFT[]
    isLoading: boolean
}

export const OwnedNFTs: React.FC<OwnedNFTsProps> = ({ ownedNFTs, isLoading }) => {
    return (

        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    width: "100%",
                }}
            >
                {/* <h2>My Collectibles</h2> */}
                {isLoading ? (
                    // <p>Loading...</p>
                    <p>{" "}</p>
                ) : (
                    <>
                        <p style={{
                            color: "#fff",
                            borderRadius: "15px",
                            padding: "0.5rem",
                            marginTop: "-0.5rem",
                            marginBottom: "1rem",
                            border: "1px solid #fff",

                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",

                            fontSize: "x-small",
                        }}>
                            Total owned: {ownedNFTs?.length}
                        </p>
                    </>
                )}
            </div>
        
            {ownedNFTs && ownedNFTs.length > 0 ? (
                <div style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}>

                    {ownedNFTs.map((nft) => (
                        <div 
                            key={nft.metadata.id}
                            style={{
                                position: "relative",
                                borderRadius: "20px",
                                overflow: "hidden",
                                width: "48%",
                                marginBottom: "1rem",
                            }}
                        >
                                <MediaRenderer 
                                    src={nft.metadata.image}
                                    width="100%"
                                    height="auto"
                                />


                            <p style={{ position:"absolute", bottom:"0", left: "15px", 
                            backgroundColor: "rgba(0,0,0,0.75)", padding: "5px 10px", borderRadius: "10px"
                            }}>
                                {nft.metadata.name}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                }}>

                    <p style={{
                        color: "lightcoral",
                        borderRadius: "15px",
                        padding: "0.5em",
                        marginTop: "-0.5rem",
                        marginBottom: "1rem",
                        border: "1px solid lightcoral",

                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",   
                        alignItems: "center",

                        fontSize: "small",

                    }}>
                        {/* You don't own any collectibles yet! */}
                        You don't have any prescriptions yet. 
                    </p>

                </div>
            )}


        </>
    )
}