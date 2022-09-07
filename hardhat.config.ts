import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import * as dotenv from 'dotenv' 



require('dotenv').config()


const config = {
 networks: {
    hardhat: {
      chainId: 1337,
      
    },
    mumbai: {
      url: `${process.env.NEXT_PUBLIC_RPC}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  
  
  },
  solidity: "0.8.9",

};

export default config;
