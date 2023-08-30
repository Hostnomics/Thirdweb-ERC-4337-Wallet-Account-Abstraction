//Reviewed at (45:40): https://youtu.be/D58EhH2em5s?si=Rsvze01RJPMxAQSp&t=2740

import { ThirdwebSDKProvider, useAddress, 
    useContract, useContractMetadata, useOwnedNFTs, MediaRenderer, Web3Button } from '@thirdweb-dev/react'
import { nftCollection } from '../lib/constants'


type ClaimProps = {
    contractMetadata: any
  };

 
// At (45:40) the nft-claim.tsx export function has typo default? Tried removing 'default' and it worked for me: export default function NFTClaim({ contractMetadata }: ClaimProps) {
// export default function NFTClaim({ contractMetadata }: ClaimProps) {
export function NFTClaim({ contractMetadata }: ClaimProps) {
    return (
        <>

            <h2>{contractMetadata?.name}</h2>

                <MediaRenderer 
                    src={contractMetadata?.image}
                    width="90%"
                    height="auto"
                    style={{
                        borderRadius: "20px",
                        overflow: "hidden",
                    }}
                />

                <Web3Button
                    contractAddress={nftCollection}
                    action={(contract) => contract.erc721.claim(1)}
                    style={{
                        marginTop: "20px",
                        width: "80%",
                    }}
                >
                    Claim Collectible
                </Web3Button>
        
        </>
    )
}

