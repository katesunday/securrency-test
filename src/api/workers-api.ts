import axios from 'axios'
import Web3 from 'web3'
import { SECURRENCY_SC_ADDRESS } from '../address'

const contractABI = require('../contract-abi.json')

//for workers
const instance = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: true,
})

//without workers
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
const contract = new web3.eth.Contract(contractABI, SECURRENCY_SC_ADDRESS)
const wallet = web3.givenProvider.selectedAddress
console.log(contract)

export type CitizenType = {
  id: string
  age: number
  city: string
  name: string
  someNote: string | null
  index?: number
}

export const workersAPI = {
  //for workers
  async getTest() {
    try {
      const res = await axios.get('http://localhost:8081/citizens')
      console.log('res', res)
      return res
    } catch (e) {
      console.log(e)
    }
  },

  async loadCitizens() {
    try {
      const response: any = []
      const result: CitizenType[] = []
      await contract.getPastEvents(
        'Citizen',
        {
          fromBlock: 0,
          toBlock: 'latest',
        },
        function (error: any, events: any) {
          return events.map((el: any) => response.push(el.returnValues))
        }
      )
      response.reverse().map((el: any) => {
        const obj = Object.assign(
          {},
          { name: el['name'] },
          { city: el['city'] },
          { age: el['age'] },
          { id: el['id'] }
        )
        return result.push(obj)
      })
      return result
    } catch (e) {
      console.log(e)
    }
  },

  async getNoteById(id: string) {
    try {
      return await contract.methods.getNoteByCitizenId(id).call()
    } catch (e) {
      console.log(e)
    }
  },
  async addCitizen(age: number, city: string, name: string, someNote: string) {
    try {
      const res = await contract.methods
        .addCitizen(age, city, name, someNote)
        .send({ from: wallet })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('confirmation', function (confirmationNumber: any, receipt: any) {
          console.log(confirmationNumber, receipt)
        })
        .on('receipt', function (receipt: any) {
          console.log(receipt)
        })
      console.log(res)
    } catch (e) {}
  },
}
