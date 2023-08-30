## Setup

1. Deploy the Demo NFT Collection from [Credential Account Factory](https://thirdweb.com/joenrv.eth/CredentialAccountFactory).

- - It has a `CredentialAccount.sol` file with a `register` function for `username` and `metadataURI`
    - After deploy, copy the CredentialAccountFactory address. [(at 11:32)](https://youtu.be/D58EhH2em5s?si=-IBr373HRuI780Rr&t=692)

2. Create the **App** (at 11:54)

- In desired directory, run command:

  - `npx thirdweb@latest create app`
    - Name project (`walletexperiment`)
    - Select **EVM** network since we deployed to mumbai.
    - Select **Next.js** with **TypeScript**.

- To install in current directory named `walletexperiment`:
  - `npx thirdweb@latest create . --app`
    - Name project `./`
    - Select **EVM** network since we deployed to mumbai.
    - Select **Next.js** with **TypeScript**.

3. Lottie Loading File from [Lottie Files.com](https://lottiefiles.com/)

- The animation shown at [(18:55)](https://youtu.be/D58EhH2em5s?si=4nZJEF8blDyHBF6Q&t=1135) was not provided, so I used another animation from [LottieFiles.com here](https://lottiefiles.com/animations/circules-22ZLntsKLN)
- At [(19:13)](https://youtu.be/D58EhH2em5s?si=PLFCpF99J2NSXsDr&t=1153) install the **react LottieLoader** with this command:
  - NPM **LottieLoader** package from [react-lottie-loader](https://www.npmjs.com/package/react-lottie-loader)
  - `yarn add react-lottie-loader`
  - or with npm:
    - `npm i react-lottie-loader`
-

4. Install Thirdweb's wallets package [at (25:45)](https://youtu.be/D58EhH2em5s?si=Jlqrky-dDpqCgmvx&t=1545)

- Instal package with yarn or npm:
  - `yarn add @thirdweb-dev/wallets`
  - `npm i @thirdweb-dev/wallets`
- import **SmartWallet** into `lib/wallets.ts`

5. At [(41:21)](https://youtu.be/D58EhH2em5s?si=uufpEcxutIrDImmV&t=2481) we run through a test of our smart login process.

6. At [(42:54)](https://youtu.be/D58EhH2em5s?si=xSTdYKawp1J8Kh5w&t=2574) build out the `connected.tsx` component for the user who has successfully connected.

## Minor Typos

1. Function Name

2. NFTClaim Prop - remove `default` from **export function NFTClaim()...**
   export default function NFTClaim({ contractMetadata }: ClaimProps) {

At [(45:40)](https://youtu.be/D58EhH2em5s?si=ibSf1TESITT0N4E9&t=2740)
