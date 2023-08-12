import Web3 from 'web3'
import { ABI } from './ABI'

const CONTRACT_ADDRESS = '0xC15eEA3852Daf24e368a2A38c58d29eF92c09A10'

export async function doLogin() {
  if (!window.ethereum) throw new Error('No MetaMask Found')

  const web3 = new Web3(window.ethereum)
  const accounts = await web3.eth.requestAccounts()
  if (!accounts || !accounts.length) throw new Error('Wallet not found or not allowed')

  localStorage.setItem('wallet', accounts[0])

  return accounts[0]
}

function getContract() {
  if (!window.ethereum) throw new Error('No MetaMask Found')
  const web3 = new Web3(window.ethereum)
  const from = localStorage.getItem('wallet')
  if (!from) throw new Error('No Wallet Found')
  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from })
}

export async function addTweet(text: string) {
  const contract = getContract()
  return contract.methods.addTweet(text).send()
}

export async function changeUserName(newName: string) {
  const contract = getContract()
  return contract.methods.changeUsername(newName).send()
}