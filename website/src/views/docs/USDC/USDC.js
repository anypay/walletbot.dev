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
            
            Experience the power of Multichain USDC
          </Typography>
        </Box>
        <Box marginBottom={4}>

          <Typography>
            The world's leading dollar digital currency is live on the world's most powerful and innovative blockchains.
          </Typography>

        </Box>

        <Box marginBottom={4}>
        <Typography>
        <h2>Multiple chains.<br/>Multiple rails.</h2>
        </Typography>


        </Box>
      <Box>
        <Typography>
          USDC is available on many of the world's leading blockchains, with more chain integrations expected. Wallet Bot can send USDC payments on all supportedchains. We’re building a network of possibilities for USDC.
        </Typography>
      </Box>
      <br/>
      <Box></Box>

      <Box marginBottom={4}>
        <ul>
          <li>ETHEREUM USDC</li>
          <li>ALGORAND USDC</li>
          <li>SOLANA USDC</li>
          <li>STELLAR USDC</li>
          <li>TRON USDC</li>
          <li>HEDERA USDC</li>
          <li>AVALANCHE USDC</li>
          <li>FLOW USDC</li>
          <li>POLYGON USDC</li>
        </ul>
        </Box>

        <Box marginTop={2}>
          {renderCodeBlock(
  `import {
    algorand,
    avalanche,
    ethereum,
    flow,
    hedera,
    polygon,
    solana,
    stellar,
    tron              
}
from 'usdc'`,
  'typescript',
          )}
        </Box>

<Box marginTop={2}>
          {renderCodeBlock(
  `import { createWallet, loadWallet } from 'usdc'
  
async function main() {

  const wallet = process.env.mnemonic ? loadWallet(process.env.mnemonic) : createWallet()

  console.log('wallet.created.mnemonic', wallet.mnemonic)

  const polygon = await wallet.polygon.getBalance()

  const solana = await wallet.solana.getBalance()

  const stellar = await wallet.stellar.getBalance()

  const ethereum = await wallet.ethereum.getBalance()

  const hedera = await wallet.hedera.getBalance()

  const avalanche = await wallet.avalanche.getBalance()

  const algorand = await wallet.algorand.getBalance()

  const tron = await wallet.tron.getBalance()

  const flow = await wallet.flow.getBalance()

  console.log('usdc.balances', {
    polygon,
    solana,
    stellar,
    ethereum,
    hedera,
    avalanche,
    algorand,
    tron,
    flow
  })

}

main()
  `,
  
  'typescript',
          )}
        </Box>

      </Container>
    </Box>
  );
};

export default Monero;
