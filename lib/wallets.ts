//created (23:08): https://youtu.be/D58EhH2em5s?si=Ue9d5G7t4RUropZp&t=1388
  // - create everything to generate our smart wallet and local wallet to log the user in
  // - See roadmap at (23:24): https://youtu.be/D58EhH2em5s?si=vBvHzPSOtzSB5A48&t=1404
      // - check username & password match account
          // - if not, create acocunt, upload to ipfs, register and connect
          // - if already have account, retrieve ipfs metadata, import and connect

// import our constants
import { THIRDWEB_API_KEY, chain, factoryAddress } from './constants'; 

// import Thirdweb's SmartWallet
// import { SmartWallet, LocalWallet } from '@thirdweb-dev/wallets';
import { SmartWallet, LocalWallet } from '@thirdweb-dev/wallets'

import { ThirdwebSDK, isContractDeployed } from '@thirdweb-dev/sdk';
import { create } from 'domain';

//1. Create a function to create a new smart wallet (24:13)
export function createSmartWallet(): SmartWallet {
  const smartWallet = new SmartWallet ({
    chain: chain,
    factoryAddress: factoryAddress,
    gasless: true,
    clientId: THIRDWEB_API_KEY || "",
  });
  return smartWallet;
}


//1B. Install thirdweb-dev/wallets at (25:48): https://youtu.be/D58EhH2em5s?si=a0rAHGoPItLZlvKW&t=1548
  // - run yarn add @thirdweb-dev/wallets


//2. (26:11) - Get the wallet address for the user
export async function getWalletAddressForUser(
  sdk: ThirdwebSDK,
  username: string, //check if username is attached to a wallet address
): Promise<string> {
  const factory = await sdk.getContract(factoryAddress);
  const smartWalletAddress: string = await factory.call(
    "accountOfUsername",  //at (28:10) per the Thirdweb Explorer console (Read), the function name is `accountOfUsername`, (lowercase 'n') NOT `accountOfUserName` as shown at (27:50)
    [username]
  );
  return smartWalletAddress;
}


// 3. (28:24) function to either
  // 3A. Generate and upload the local wallet to IPFS, OR
  // 3B. Download the metadata and import it and connect it to our wallet. 
export async function connectToSmartWallet(
  username: string,
  pwd: string,
  statusCallback?: (status: string) => void
): Promise<SmartWallet> {
    //check username
    statusCallback?.("Checking if user has a wallet...");

    //get an instance of the Thirdweb SDK (29:43)
    const sdk = new ThirdwebSDK(
        chain,
        {
          clientId: THIRDWEB_API_KEY || "",
        }
    )

    const smartWalletAddress = await getWalletAddressForUser(sdk, username);

    //custom isDeployed function
    const isDeployed = await isContractDeployed(
      smartWalletAddress,
      sdk.getProvider()
    );

    //each flow will need a smart wallet and contract addresss
    //(31:27) - create new smart wallet with our fn above
    const smartWallet = createSmartWallet(); 
    // create personal wallet
    const personalWallet = new LocalWallet(); 

    //check if contract deployed (31:49)
    if (isDeployed) {
        statusCallback?.("User name exists, accessing onchain data...")
        const contract = await sdk.getContract(smartWalletAddress);
        const metadata = await contract.metadata.get(); 

        //get encrypted Wallet
        const encryptedWallet = metadata.encryptedWallet; 
        if (!encryptedWallet) {
          throw new Error("No encrypted wallet found");
        }

        statusCallback?.("Decrypting wallet...");

        //Decrypt it using our password (33:31)
        await new Promise((resolve) => setTimeout(resolve,300));
        //Import our encrypted wallet and decrypt it with password: 
        await personalWallet.import({
          encryptedJson: encryptedWallet,
          password: pwd,
        });

        //connect to personalWallet we just decrypted
        statusCallback?.("Connecting...");
        await smartWallet.connect({
          personalWallet
        });

        return smartWallet;

    } else {
      
//IF THEY DON'T HAVE AN ACCOUNT REGISTERED TO THEIR USERNAME WE CREATE THAT ACCOUNT HERE: (35:20)
        statusCallback?.("New username, generating personal wallet...");
        await personalWallet.generate();

        const encryptedWallet = await personalWallet.export({
          strategy: "encryptedJson",
          password: pwd,
        });

        await smartWallet.connect({
          personalWallet
        });

  //Caveat @ (37:00) - a BRAND NEW smart wallet is not deployed until it has a first transaction. 
        //Manually deploy wallet, upload json, etc.
        await smartWallet.deploy(); 

        const contract = await smartWallet.getAccountContract(); 

        const encryptedWalletUri = await sdk.storage.upload({
            name: username,
            encryptedWallet,
        });

    //(38:35) register username
        await contract.call(
          "register",
          [username, encryptedWalletUri]
        );

        return smartWallet;

    }

}

//See summary of above at (38:55): https://youtu.be/D58EhH2em5s?si=qA6bRaGLwWQFpDN9&t=2335