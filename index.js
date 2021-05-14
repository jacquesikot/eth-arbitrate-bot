const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const OneSplitAbi = require('./oneSplitAuditFull.json');
const erc20Abi = require('erc-20-abi');

const splitExchanges = require('./splitExchanges');

const weiEthDecimal = 18;

const provider = new Web3.providers.HttpProvider(
  'https://mainnet.infura.io/v3/a49493c5dfe6429f947699aa16bdd61b'
);

const web3 = new Web3(provider);

const fromAddress = '0xf60c2Ea62EDBfE808163751DD0d8693DCb30019c'; // Addres of random eth account with enough  ETh and DAI
const toTokenAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'; // Address of Eth
const fromTokenAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'; // Address of DAI
const amount = 1;
const OneSplitAddress = '0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E'; // Address of OneSplit smart contract
const amountToSwap = 1690;
const amountToSwapWei = new BigNumber(amountToSwap).shiftedBy(weiEthDecimal);

const OneSplitContract = new web3.eth.Contract(OneSplitAbi, OneSplitAddress);
var DaiContract = new web3.eth.Contract(erc20Abi, fromTokenAddress);

async function getExpectedReturn() {
  await OneSplitContract.methods
    .getExpectedReturn(
      toTokenAddress,
      fromTokenAddress,
      new BigNumber(amount).shiftedBy(weiEthDecimal),
      100,
      0
    )
    .call({}, (err, res) => {
      if (err) console.error(err);
      console.log(`
          from: ${fromTokenAddress}
          to: ${toTokenAddress}
          amount: ${amount}
          returnAmount: ${new BigNumber(res.returnAmount)
            .shiftedBy(-weiEthDecimal)
            .toString()}
      `);
      splitExchanges.forEach((dex, i) => {
        console.log(`${dex}: ${res.distribution[i]}%`);
      });
    });
}

getExpectedReturn();
