const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const OneSplitAbi = require('./oneSplitAuditFull.json');

const weiEthDecimal = 18;

const provider = new Web3.providers.HttpProvider(
  'https://mainnet.infura.io/v3/a49493c5dfe6429f947699aa16bdd61b'
);

const web3 = new Web3(provider);

const fromTokenAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
const toTokenAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
const amount = 1;

const OneSplitContract = new web3.eth.Contract(
  OneSplitAbi,
  '0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E'
);

let splitExchanges = [
  'Uniswap',
  'Kyber',
  'Bancor',
  'Oasis',
  'Curve Compound',
  'Curve USDT',
  'Curve Y',
  'Curve Binance',
  'Curve Synthetix',
  'Uniswap Compound',
  'Uniswap CHAI',
  'Uniswap Aave',
  'Mooniswap',
  'Uniswap V2',
  'Uniswap V2 ETH',
  'Uniswap V2 DAI',
  'Uniswap V2 USDC',
  'Curve Pax',
  'Curve renBTC',
  'Curve tBTC',
  'Dforce XSwap',
  'Shell',
  'mStable mUSD',
  'Curve sBTC',
  'Balancer 1',
  'Balancer 2',
  'Balancer 3',
  'Kyber 1',
  'Kyber 2',
  'Kyber 3',
  'Kyber 4',
];

OneSplitContract.methods
  .getExpectedReturn(
    fromTokenAddress,
    toTokenAddress,
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
        returnAmount: ${new BigNumber(res.returnAmount).shiftedBy(
          -weiEthDecimal
        )}
    `);
    for (let i = 0; i < res.distribution.length; i++) {
      console.log(`
        ${splitExchanges[i] + ' :' + res.distribution[i]}`);
    }
  });
