//created at (22:18): https://youtu.be/D58EhH2em5s?si=4ZZ9C7t-UDAh24NR&t=1338
import { Mumbai } from "@thirdweb-dev/chains";

export const THIRDWEB_API_KEY = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

export const chain = Mumbai;

//factoryAddress from deploying https://thirdweb.com/joenrv.eth/CredentialAccountFactory
export const factoryAddress = "0x67831d76DAB9B3ad49c7d6cc3C7C29f391b73Cf0";

//NFT collection that we do claims on once we have set up our login (22:54)
//https://thirdweb.com/mumbai/0xe3Ec3596Ca66aa5b223Fe5710Ff7622cDb2E066D
//wasae's addy: 
// export const nftCollection = "0x7019c5b78592C10258E8fEe26dF15dCC0Ad53bB";
export const nftCollection = "0xe3Ec3596Ca66aa5b223Fe5710Ff7622cDb2E066D";
