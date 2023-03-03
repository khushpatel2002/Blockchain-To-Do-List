import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//internal import

import { toDoListABI, toDoListAddress } from "./constants";

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(toDoListAddress, toDoListABI, signerOrProvider);

export const ToDoListContext = React.createContext();

export const ToDoListProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [allToDoList, setAllToDoList] = useState([]);
  const [myList, setMyList] = useState([]);

  const [allAddress, setAllAddress] = useState([]);

  // ---------- Connecting Metamask

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("Please Install MetaMask");

    const account = await window.ethereum.request({ method: "eth_accounts" });

    if (account.length) {
      setCurrentAccount(account[0]);
      console.log(account[0]);
    } else {
      setError("Please Install MetaMask & Connect, Reload");
    }
  };
  //   useEffect(() => {
  //     checkifWalletIsConnet();
  //   }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return setError("Please Install MetaMask");

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(account[0]);
  };

  // interacting with smart contract

  const toDoList = async (message) => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      // console.log(contract);

      const createList = await contract.createList(message);
      createList.wait();

      console.log(createList);
    } catch (error) {
      setError("error");
    }
  };

  const getToDoList = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      const getAllAddress = await contract.getAddress();
      setAllAddress(getAllAddress);

      getAllAddress.map(async (eL) => {
        const getSingleData = await contract.getCreatorData(eL);
        allToDoList.push(getSingleData);
      });

      const allMessage = await contract.getMessage();
      setMyList(allMessage);
    } catch (error) {
      setError("error");
    }
  };

  // toggle
  const change = async (address) => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      const state = await contract.toggle(address);
      state.wait();
      console.log(state);
    } catch (error) {
      setError("error");
    }
  };

  return (
    <ToDoListContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        getToDoList,
        toDoList,
        change,
        currentAccount,
        error,
        allToDoList,
        myList,
        allAddress,
      }}
    >
      {children}
    </ToDoListContext.Provider>
  );
};

const ToDolistApp = () => {
  return <div>ToDolistApp</div>;
};

export default ToDolistApp;
