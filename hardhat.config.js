require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-truffle5");
require ("@openzeppelin/hardhat-upgrades");
// require ("hardhat-typechain");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async () => {
//   const accounts = await ethers.getSigners();
//
//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
//npx hardhat run --network ropsten scripts/sample-script.js

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          }
        }
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1
          }
        }
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1
          }
        }
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1
          }
        }
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1
          }
        }
      }
    ],
  },
  etherscan: {
    apiKey: `QVDVP85WK5D2UT77DWYEZPHGWZ2U5JFU3K` // ETH Mainnet
    //   apiKey: `UMHGM6QP7MVI1NUVHBW4N3NZHTPJPAFG6J` // BSC
  },
  // defaultNetwork: "development",
  development: {
    //  host: "127.0.0.1",     // Localhost (default: none)
    //  port: 7545,            // Standard Ethereum port (default: none)
    gas: "auto",
    gasPrice: 20,
    //   network_id: "5777",       // Any network (default: none)
  },
  mocha: {
    // timeout: 100000
  },
  networks: {

    ropsten: {
      url: `https://ropsten.infura.io/v3/85c51263825545bf8496006327bd98d1`,
      accounts: [mnemonic],
      chainId: 3,
      gasPrice: 20000000000,
      gasMultiplier: 1.2
    },
    bsc_mainnet: {
      url: `https://bsc-dataseed.binance.org/`,
      accounts: [mnemonic],
      chainId: 56,
      gas: "auto",
      gasPrice: 15000000000,
      gasMultiplier: 1.2
    },
    bsc_test: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: [mnemonic],
      chainId: 97,
      gas: 'auto',
      gasPrice: 15000000000,
      gasMultiplier: 1.2
    },
    //https://prod-forge.prod.findora.org:8545   525
    //http://prod-testnet.prod.findora.org:8545/
    //http://prod-testnet.prod.findora.org:8545/
    forge_test: {
      url: `https://prod-testnet.prod.findora.org:8545/`,
      accounts: [mnemonic],
      chainId: 516,
      gas: 'auto',
      timeout: 20000000,
      gasPrice: 'auto',
      gasMultiplier: 1.2
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/85c51263825545bf8496006327bd98d1`,
      accounts: [mnemonic],
      chainId: 4,
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 1.2
    }
    // hardhat: {
    //     forking: {
    //         url: `https://rinkeby.infura.io/v3/85c51263825545bf8496006327bd98d1`,
    //         accounts: [mnemonic],
    //         blockNumber: 9468217
    //     }
    // }
  }
};

