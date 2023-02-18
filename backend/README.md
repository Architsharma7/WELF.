## Contracts

1. WelfDAO -- DAO Member entry and Proposal Creation
2. WelfDAONFT -- DAO Membership NFT contract ✅
3. WelfFund -- General DAO funds contracts , that enables users to donate even when no campaigns are enabled ✅
4. PropFund -- Funds contract to recieve the users funds and then withdraw them out according to the need
5. PropFund Factory -- Deploy new Funds contract
6. WelfDAOToken -- rewards and incentives ✅
7. DonorRegistery - records of all the donor ✅

Model

/// Users can also donate some money to DAO directly instead of the particular cause
/// DAO will also fund a proportion of the donation
/// The tokens can also be used here to pay some partial amounts of the user from the DAO's treasury and burn the Tokens , to control supply

// Token rewards will be given while voting on a proposal verification to all the DAO members
// Member creating proposal will also get the Tokens on the basis of what they offer
// These tokens can be reedemed in 2 ways , either monetary support , like cash out , which will be valued at certain value
// These tokens can also be used to pay some partial amount of a Dontation valued at a different valuation here.

// The campaign creator has some stakes first in the DAO
// They can raise amount upto a limit of 5k$ initial
// The funds will be put into an escrow , which can be reedemed in partial batches , of 2k$ and 3k$
// After the campaign ends , he has to provide bills in under 1 week , otherwise the staked amount will be taken away and the user will be flagged as a fraud
// DAO will then try to recover the funds and payback the users in DAO tokens to compensate

// DAO Member Onboarding
--> Name , Location , Bio , Pfp , Store the info
--> If we implement Polygon ID , the claim is issued by a mock entity for demo purposes , which will be kind of KYC stating that the person is a real user , in future , the entity could be a gov organisation or something similar
--> Stake some amount , and Then mint the NFT to him

// Dashboard (only For DAO Members)
--> Basically the profile of the user
--> Show all the proposals created by him (UnderVerification / Voting / Voted / Verified )
--> DAO token Balance
--> Stats of amount raised
--> Update
--> Upload proofs for completed
--> Reedem and Payout options to get the amount

// Dashboard (for normal Users)
--> Name optional , Address
--> Show all then donated campaigns

## USER FLOWS

### DAO Member Onboarding

--> Fill up details
--> Data Upload to IPFS
--> NFT Minting from the NFT Contract by paying up
--> Then Record being added to the DAO with the user Data CID

### Normal User Onboarding

--> They create a basic Account with Name and some other Info
--> Records added to IPFS and then to Contract via a Tx
--> Select the campaign , define the amount and payup by interacting with FundManager
--> Automatic donation record added in the backend

### Campaign Creation

--> Fill in the Data regarding the Campaign
--> Upload the images and videos to IPFS
--> Then upload the remaining data to IPFS
--> Add the Record into the DAO Contract , creation of a new Proposal , and addition of same into the Creator Profile
--> Later the Campaign is voted for under a period of 12 hrs
--> In the End the Campaign is Verified , later where the FUND Contrtacts is assigned for the same , from the FUND manager
--> This Campaign is open for funding , managed via the FUND Manager
--> On completion , the , funds could be withdrawn

/// WE have 2 IDs
--> Proposal IDs
--> Campaign IDs

### Fund Donation

--> Once the Campaign is verified , It will show up for the users to donate
--> The details will be then fetched from FUND Manager and the DAO Campaign Contract
--> Users can select the amount and donate via FUND Manager Intrn ,
--> Tokens credited to the user for donating in some proportions
--> The time completes , and the funding stops

### Withdraw method

-->
-->

## PENDING TASKS

--> Proper Withdrawl
--> Campaign Closing
--> Tokens redemption
