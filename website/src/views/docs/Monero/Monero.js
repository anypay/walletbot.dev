/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from '@mui/material/styles';
import { colors } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from 'common/Container';

const Monero = () => {
  const theme = useTheme();

  const renderCodeBlock = (code = '', language = 'jsx') => {
    return (
      <Box
        component={SyntaxHighlighter}
        language={language}
        style={vs2015}
        padding={`${theme.spacing(2)} !important`}
        borderRadius={2}
        margin={`${theme.spacing(0)} !important`}
      >
        {code}
      </Box>
    );
  };

  return (
    <Box>
      <Container>
        <Box marginBottom={4}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
            }}
          >
            Monero XMR
          </Typography>
        </Box>
        <Box marginBottom={4}>

          <Typography>
            Your apps can send Monero (XMR) payments to one or more recipients using <i>Wallet Bot</i>. Wallet Bot does this by connecting to the <i>Monero Wallet RPC</i>.<br/>
          </Typography>

        </Box>

        <Box marginBottom={4}>
        <Typography>
        <b>Monero Wallet RPC</b> is a program that you run on your local computer or over a network. It manages your Monero payments and <i>view keys</i>. The program stays in sync with the Monero network and provides up-to-date <i>balance</i> and <i>transaction</i> information to your Wallet Bot.
      </Typography>

        </Box>
      <Box>
        <Typography>
          Traditional public blockchain providers lack the ability to alert users about Monero payments because transactions on the Monero network are universally private. However, with some additional steps, Wallet Bot can make payments and instantly alert users of new payment events.
        </Typography>
      </Box>
      <br/>
      <Box></Box>
        <Box marginBottom={4}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            1. Create Wallet
          </Typography>
          <Typography>
            The Monero Wallet RPC software comes bundled with a program called <a href="https://www.getmonero.org/downloads/#cli">monero-wallet-cli</a>. Use monero-wallet-cli to generate a new monero wallet. If you already have a pre-existing monero wallet that you would like to use, you can use that wallet by importing its seed phrase.

          </Typography>
          <Box marginTop={2}>
            {renderCodeBlock(
              `monero-wallet-cli`,
              'bash',
            )}
          </Box>
          <br/>
          <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          2. Monero Wallet RPC
        </Typography>
          <Typography>
            That will prompt you to enter the file name of your wallet. If a wallet with that file name does not exist, then a new one will be created. Save your password in a plain text file. The file can be used to easily start and unlock your Monero Wallet RPC server.
          </Typography>

          <Box marginTop={2}>
          {renderCodeBlock(
            `monero-wallet-rpc --pidfile=/run/monero/monero-wallet-rpc.pid \\
    --rpc-bind-port 18082 \\
    --wallet-file /etc/monero/wallets/my_wallet_name \\
    --password-file=/etc/monero/wallets/my_wallet_name.password \\
    --log-file /var/log/monero/monero-wallet-rpc.log \\
    --max-log-files 2 \\
    --daemon-address=127.0.0.1:18081 \\
    --trusted-daemon --non-interactive \\
    --rpc-bind-ip=0.0.0.0 \\
    --confirm-external-bind \\
    --disable-rpc-login \\
    --log-level=1`,
            'bash',
          )}
        </Box>
        <br/>

        </Box>
        <Box marginBottom={4}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            3. Install Wallet Bot
          </Typography>

          <Box marginY={2}>{renderCodeBlock('npm install wallet-bot', 'bash')}</Box>
          <Typography>
          Once Monero Wallet RPC is started up and connected to a fully synced node, you can start using it with your Wallet Bot. Connect the credentials and configure a new Card on your Wallet Bot.
        </Typography>
            <br/>
          <Box marginY={2}>
            {renderCodeBlock(
              `import { loadWallet } from 'wallet-bot'

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

run()`,
              'typescript',
            )}
          </Box>
        </Box>
        
        <Typography>
        Your Wallet Bot may maintain a number of different wallets. Each wallet has its own separate coin networks and balances. Wallet Bot calls this concept a <i>Card</i>. A <b>Card</b> represents a single account on a currency or chain. You may have a <i>wallet backup seed phrase</i> or <i>extended private key</i> that works for multiple currencies or multiple accounts. A separate Card instance respresnts each of those accounts. It is instantiated using the corresponding private key.
        </Typography>
        <br/>

        <Typography>
        Wallet Bot fetches its XMR balance directly from your Monero Wallet RPC node. There are no other parties in the world that could tell you your balance without your <i>account view key</i>. If you give your account view key to a third party, they need to index your wallet's transaction history in order to know your balance. Third party services offering such capability will likely run a Monero Wallet RPC process on your behalf. That could be substituted here if you can find a Monero Wallet RPC SaaS back end.
        </Typography>
        <br/>
        <Box marginBottom={4}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            3. Making Payments
          </Typography>
          <Typography>
          You may send payments to one or more recipients within a single Monero transaction from your Wallet Bot. You can do this by either calling the Wallet Bot <i>card library</i> directly or by sending your Wallet Bot the request via the <b>Wallet Bot API</b> currently hosted at <a href="anypayx.com">AnypayX.com</a>. To send the payment using the Wallet Bot library directly, the bot specifies the JSON Payment Protocol standard format for requesting a payment from your Wallet Bot.
          </Typography>
          <br/>
  
          <Typography>
          Payment requests contain network information, data about the transaction fee, and one or more other instructions that follows a template. Wallet Bot uses this information to construct and sign a valid transaction matching all the requirements for a successful payment. The template contains a list of Monero addresses and the amount to send to each address.
          </Typography>
          <br/>
          <Box marginY={2}>{renderCodeBlock(`
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
        `, 'typescript')}</Box>

        <Typography>
        When using the <b>Anypay API</b> for Wallet Bot, remote clients may request that your Wallet Bot send a transaction. Anypay first authenticates the original request. Then it provides the payment request in the form of <i>JSON Payment Protocol URL</i>. A transaction template identical to the one above is downloaded from the API and then sent.
        </Typography>
        <br/>

        <Typography>
        When an application gives you one such <i>Payment Request URL</i>, it can be provided directly to the Wallet Bot. Wallet Bot can send the payment using that protocol. One benefit of sending payments via the <i>JSON Payment Protocol</i> is that merchant processors can process transactions much more rapidly, with greater precision, and at much greater scale.
        </Typography>

        <Box marginBottom={4}>

        <Box marginY={2}>{renderCodeBlock(`
import axios from 'axios'

const payment_request_url = 'https://anypayx.com/i/52iJj91-X'

const payment = await wallet.payURL(payment_request_url, 'XMR')

expect(payment.tx_hash).to.be.a('string')

expect(payment.tx_key).to.be.a('string')

expect(payment.tx_blob).to.be.a('string')

const { data: { invoice: { status } } = await axios.get('https://api.anypayx.com/invoices/52iJj91-X')

expect(status).to.be.equal('paid')
    `, 'typescript')}</Box>
</Box>

          <Typography
            sx={{
              '& code': {
                background: colors.yellow[400],
                color: theme.palette.common.black,
              },
            }}
          >
          With Monero Wallet RPC, your Wallet Bot can send Monero payments easily. By using the Wallet Bot API, you can queue up payments to be retried as new funds become available. Due to Monero's design, Monero transactions cannot be sent as rapidly as other public transparent blockchains. Every Monero transaction in a wallet must be confirmed ten blocks before the funds can be spent in a subsequent payment. While that does slow down Wallet Bot a bit, the Monero <i>block confirmation time</i> is only two or three minutes. That is currently the rate limit at which we may send payments using Wallet Bot. The rate at which Wallet Bot can make new Monero payments increases as your wallet collects more spendable outputs.
          </Typography>

        </Box>
      </Container>
    </Box>
  );
};

export default Monero;
