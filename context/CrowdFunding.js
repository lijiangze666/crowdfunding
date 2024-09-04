import React, {useState, useEffect} from 'react';
import {ethers} from "ethers";
import Web3Modal from 'web3modal';
import {contractABI, contractAddress} from "./constants";

export const CrowdFundingContext = React.createContext();

//Gets the deployed contract instance
const fetchContract = (signerOrProvider) => new ethers.Contract(contractAddress, contractABI, signerOrProvider);
//Create the Provider
export const CrowdFundingProvider = ({children}) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");
    const createCampaign = async (campaign) => {
        const {title, description, target, deadline} = campaign;
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        console.log(currentAccount);
        try {
            const transaction = await contract.createCampaign(
                currentAccount,//owner
                title,//title
                description,//description
                ethers.parseUnits(target, 18),//target
                new Date(deadline).getTime()//deadline
            );
            //Wait for the transaction to be mined
            await transaction.wait();
            console.log("contract call success", transaction);

        } catch (error) {
            console.log("contract call failure", error)
        }
    }

    const getCampaigns = async () => {
        const provider = new ethers.JsonRpcProvider();
        const contract = fetchContract(provider);
        const campaigns = await contract.getCampaigns();
        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
            pId: i,
        }));
        return parsedCampaigns;
    }
    const getUserCampaigns = async () => {
        const provider = new ethers.JsonRpcProvider();
        const contract = fetchContract(provider);
        const campaigns = await contract.getCampaigns();
        const accounts = await window.ethereum.request({method: 'eth_accounts'});
        const currentUser = accounts[0];
        //Filter the campaigns by the current user
        const filteredCampaigns = campaigns.filter((campaign) => campaign.owner === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
        const userData = filteredCampaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
            pId: i,
        }))
        return userData;
    }
    const donate = async (pId, amount) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        const transaction = await contract.donateToCampaign(pId, {
            value: ethers.parseEther(amount),
        });
        await transaction.wait();
        window.location.reload();
        return transaction;
    }

    const getDonations = async (pId) => {
        const provider = new ethers.JsonRpcProvider();
        const contract = fetchContract(provider);
        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;
        const parsedDonations = [];
        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.formatEther(donations[1][i].toString()),
            })
        }
        return parsedDonations;
    }

    //check if wallet is connected
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask");
            const accounts = await window.ethereum.request({method: "eth_accounts"});
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    }, []);
    //connect wallet
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask");
            const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }
    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                connectWallet,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    )

}

