

require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "RB-tfqO18pMl86CV1TbBcBi-Dq56d6hG";
const GOERLI_PRIVATE_KEY = "1b5cfaecfbb865c5032e35cc73beb9f50be2acf784e5b7a9bf2abaa2986d6c07";
module.exports = {
  solidity: "0.8.17",

   networks:{
    Goerli:{
      url:`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${GOERLI_PRIVATE_KEY}`]

    },
   },
};
