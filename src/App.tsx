import React, { useEffect } from 'react'
import './App.css'
import Citizens from './components/CitizensList/Citizens'
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from './store/store'
import { fetchCitizens } from './reducers/CitizensReducer'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCitizens())
  }, [dispatch])
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
  )
}

export default App
// const address = '0xA011799d9467D2b33768Fb1a3512f1b468B87E96'
// const abi = [
//   {
//     inputs: [],
//     stateMutability: 'nonpayable',
//     type: 'constructor',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: 'uint256',
//         name: 'id',
//         type: 'uint256',
//       },
//       {
//         indexed: true,
//         internalType: 'uint256',
//         name: 'age',
//         type: 'uint256',
//       },
//       {
//         indexed: true,
//         internalType: 'string',
//         name: 'city',
//         type: 'string',
//       },
//       {
//         indexed: false,
//         internalType: 'string',
//         name: 'name',
//         type: 'string',
//       },
//     ],
//     name: 'Citizen',
//     type: 'event',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: 'age',
//         type: 'uint256',
//       },
//       {
//         internalType: 'string',
//         name: 'city',
//         type: 'string',
//       },
//       {
//         internalType: 'string',
//         name: 'name',
//         type: 'string',
//       },
//       {
//         internalType: 'string',
//         name: 'someNote',
//         type: 'string',
//       },
//     ],
//     name: 'addCitizen',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: 'id',
//         type: 'uint256',
//       },
//     ],
//     name: 'getNoteByCitizenId',
//     outputs: [
//       {
//         internalType: 'string',
//         name: '',
//         type: 'string',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
// ]

// const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
//
// const contract = new web3.eth.Contract(abi, address);
// const cache = [];
// async function loadData(){
//   await contract.getPastEvents(
//       'Citizen',
//       {
//         fromBlock: 0,
//         toBlock: 'latest',
//       },
//       function(error,events){
//         events.map(el=>cache.push(el.returnValues))
//       }
//   );
//   return new Response(cache)
// };
//
// export default{
//   async fetch(request, env){
//     return await loadData()
//   }
// }
