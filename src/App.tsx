import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import { SECURRENCY_SC_ADDRESS } from './address';
import Citizens from './components/CitizensList/Citizens';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { workersAPI } from './api/workers-api';

const contractABI = require('./contract-abi.json');

function App() {
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
  const contract = new web3.eth.Contract(contractABI, SECURRENCY_SC_ADDRESS);
  console.log(contract);

  const loadBlockchainData = async () => {
    contract.once('Citizen', function (error, event) {
      console.log(event);
    });
    contract.events
      .Citizen()
      .on('connected', function (subscriptionId: any) {
        console.log(subscriptionId);
      })
      .on('data', function (event: any) {
        console.log(event);
      });
    await contract.once('Citizen', {}, function (error, event) {
      console.log(event);
    });
  };

  const [account, setAccount] = useState('');
  useEffect(() => {
    //loadBlockchainData()
    //
    workersAPI.getTest()
        .then((res:any)=>console.log(res))
        .catch((err:any)=>console.log(err))
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Citizens />} />
        <Route path="/citizens" element={<Citizens />} />
        {/*<Route path="/users/:userId" element={<UsersList />} />*/}
        <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
