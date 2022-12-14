# XMR Monero Payments with Wallet Bot

Your apps can send Monero payments to one or more recipients using wallet bot by connecting to the Monero Wallet RPC.

Monero Wallet RPC is a program that you run on your local computer or over a network which manages your Monero payment and view keys. The program stays in sync with the Monero network to provide up to date balance and transaction information to your wallet bot.

Because transactions on Monero are universally private a few more steps are required in order to make and receive payments. We cannot rely on public blockchain providers to give us information about our Monero transactions due to Monero's nature.

## Configuring Monero Wallet RPC



The monero wallet RPC software comes bundled with a program called monero-wallet-cli which you will use to generate a new monero wallet. If you already have a monero wallet seed phrase you would like to use you may bring that.

```
monero-wallet-cli
```

That will prompt you to enter the file name of your wallet. If a wallet with that file name does not exist a new one will be created. Do ensure you save your password in a plain text file that can be used later to easily start and unlock your monero wallet rpc server.

```
monero-wallet-rpc --pidfile=/run/monero/monero-wallet-rpc.pid \
  --rpc-bind-port 18082 \
  --wallet-file /etc/monero/wallets/my_wallet_name \
  --password-file=/etc/monero/wallets/my_wallet_name.password \
  --log-file /var/log/monero/monero-wallet-rpc.log \
  --max-log-files 2 \
  --daemon-address=162.0.211.127:18081 \
  --trusted-daemon --non-interactive \
  --rpc-bind-ip=0.0.0.0 \
  --confirm-external-bind \
  --disable-rpc-login \
  --log-level=1
```

Once Monero Wallet RPC is started up and connected to a fully synced node you should be able to start using it with your wallet bot by connecting the credentials and configuring a new Card on your wallet bot.

```
import { loadWallet } from 'wallet-bot'

async function run() {

  const wallet = await loadWallet([{                                                                
    asset: 'XMR',                                                                                   
    address: 'http://localhost:18082',
    privatekey: 'rpc_username:rpc_password'
  }])                                                                                               
                                                                                                    
  console.log(wallet)                                                                               
                                                                                                   
  const [balance] = await wallet.balances()
  
  expect(balance).to.be.a('number')
	
}

run()

```

Your Wallet Bot maintains a number of different wallets with their own separate coin networks and balances through the concept of a Card. A Card represents a single account on a currency or chain. If you have a wallet backup seed phrase or extended private key that works for multiple currencies or multiple accounts you will still be using a single Card instance for each of those accounts, instantiated with the corresponding private key.

Wallet Bot fetches its XMR balance directly from your Monero Wallet RPC node since there are no other parties in the world that could tell you your balance without your account view key. If you do give your account view key to a third party they will still have to index your wallet's transaction history. Likely third party services offering such capability will run a Monero Wallet RPC process on your behalf, so that could be substituted here if you can find a Monero Wallet RPC SaaS back end.

## Making Payments

You may send payments to one or more recipients within a single Monero transaction from your wallet bot by either calling the wallet bot card library directly or by sending it the request via the Wallet Bot API currently hosted at anypayx.com. To send the payment using the wallet bot library directly the bot specifies the JSON Payment Protocol standard format for requesting a payment from your wallet bot.

Normally a payment request will contain network information, transaction fee data, and one or more instructions which represent a template from which wallet bot constructs a signed transaction. The template is a list of Monero addresses and amount to send to each address.

```

  const payment = await wallet.buildPayment({
    chain: 'XMR',
    currency: 'XMR',
    instructions: [{
    	outputs: [{
    		address: '463jsVqBMm36nf4EM8QEZnPBSFVAoNP1ydfJGbkePR5q53CU3UDjGBGfHDDT2dNowZh1PeqYZbFvjMr1hac2kpaoKGcF2fk',
    		amount: 21800000
    	}]
    }]
  })
  // amounts are indicated using the smallest indivisible base units
  
  expect(payment.tx_hash).to.be.a('string')

  expect(payment.tx_key).to.be.a('string')
  // The view key which may be used to decode the transaction.
  // This must be used when paying invoices via the JSON Payment Protocol
  // to allow the merchant payment processor to verify payment was completed correctly
  
  expect(payment.tx_blob).to.be.a('string')
  // The signed transaction in hex format


```

When using the Anypay API for Wallet Bot remote clients may request that your wallet bot send a transaction. Anypay will authenticate the original request and then provide the payment request in the form of JSON Payment Protocol URL where the transaction template identical to the one exemplified above will be downloaded from the API and sent. 

When an application gives you such a Payment Request URL it can be provided directly to the wallet bot in order to send payment using that protocol. The benefit of sending payment via the JSON Payment Protocol comes as the merchant processor can process the transaction much more rapidly, with greater precision, and at much greater scale.

```
	import axios from 'axios'

	const payment_request_url = 'https://anypayx.com/i/52iJj91-X'
	
	const payment = await wallet.payURL(payment_request_url, 'XMR')
	
	expect(payment.tx_hash).to.be.a('string')

   expect(payment.tx_key).to.be.a('string')
  
   expect(payment.tx_blob).to.be.a('string')
   
   const { data: { invoice: { status } } = await axios.get('https://api.anypayx.com/invoices/52iJj91-X')
   
   expect(status).to.be.equal('paid')
	
	
```

With Monero Wallet RPC your wallet bot can send Monero payments easily, and by using the Wallet Bot API you can queue up payments to be re-tried when new funds are available. Monero transactions cannot be sent as rapidly as other public transparent blockchains; due to security reasons every transaction must be confirmed before the funds from it can be re-spent bu a subsequent payment. While that does slow down wallet bot a bit the block confirmation time is only two or three minutes so that is currently the rate limit at which we may send payments using wallet bot.