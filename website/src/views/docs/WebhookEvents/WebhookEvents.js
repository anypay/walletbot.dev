
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

const WebhookEvents = () => {
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
            Webhook Events
          </Typography>
        </Box>
        <Box marginBottom={4}>

          <Typography>
            Your application can receive real-time updates about events that occur around your wallet bot events.
          </Typography>

          <Typography>
            All Webhooks below are sent as a POST request with the following JSON payload:

            </Typography>
          <Box marginTop={2}>
            {renderCodeBlock(
`interface WebhookPayload {
    type: string;
    payload: any;
    secret?: string;
}`
            )}
          </Box>

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
            payment.confirming
          </Typography>
          <Typography>
            When a payment in the network mempool is received but is not yet confirmed in a block it will trigger this event.

            </Typography>
          <Box marginTop={2}>
            {renderCodeBlock(
`interface PaymentConfirming {
    invoice_uid: string;
    txid: string;
    currency: string;
    txhex: string;
    tx_key?: string;
    tx_json: any;
    account_id: number;
    status: string; // always "confirming"
}`
            )}
          </Box>

          <Box marginTop={2}>
            {renderCodeBlock(
`axios.post(WEBHOOK_URL, {
    type: 'payment.confirming',
    payload: PaymentConfirming
})`
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
          payment.confirmed
        </Typography>
          <Typography>
            When a payment that was previously in "confirming" state is confirmed in a block the payment.confirmed event webhook will be triggered
          </Typography>

          <Box marginTop={2}>
            {renderCodeBlock(
`interface PaymentConfirmed {
    invoice_uid: string;
    txid: string;
    currency: string;
    txhex: string;
    tx_key?: string;
    tx_json: any;
    account_id: number;
    status: string; // always "confirmed"
    confirmation_hash: string;
    confirmation_height: number;
    confirmation_date: Date;
}`
            )}
          </Box>

          <Box marginTop={2}>
            {renderCodeBlock(
`axios.post(WEBHOOK_URL, {
    type: 'payment.confirmed',
    payload: PaymentConfirmed
})`
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
          invoice.paid
        </Typography>
          <Typography>
            That will prompt you to enter the file name of your wallet. If a wallet with that file name does not exist, then a new one will be created. Save your password in a plain text file. The file can be used to easily start and unlock your Monero Wallet RPC server.
          </Typography>

          <Box marginTop={2}>
            {renderCodeBlock(
`interface InvoicePaid {
    invoice_uid: string;
    hash: string;
    currency: string;
    account_id: number;
    status: string; // always "paid";
}`
            )}
          </Box>

          <Box marginTop={2}>
            {renderCodeBlock(
`axios.post(WEBHOOK_URL, {
    type: 'invoice.paid',
    payload: InvoicePaid
})`
            )}
          </Box>

        <br/>

        </Box>
        
      </Container>
    </Box>
  );
};

export default WebhookEvents;
