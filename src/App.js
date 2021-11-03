import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {ethers} from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

const greeterAddress = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

function App() {
  const [greeting, setGreetingValue] = useState() 
  async function requestAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
    console.log({accounts})
    return accounts[0]
  }
  async function fetchGreeting() {
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.provider.Web3provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log('Error: ', err)
      }
    } 
  }
  async function setGreeting() {
    if(!greeting) return
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting() 
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)}placeholder="Set Greeting" />
      </header>
    </div>
  );
}

export default App;
