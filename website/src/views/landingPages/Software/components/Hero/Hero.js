import React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import { colors } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function openGithub() {

  window.open('https://github.com/anypay/wallet-bot', '_blank')
}

function openDocumentation() {

  window.location = '/docs-introduction'
}

const Hero = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box
      sx={{
        position: 'relative',
        '&::after': {
          position: 'absolute',
          content: '""',
          width: '30%',
          zIndex: 1,
          top: 0,
          right: 0,
          height: '100%',
          backgroundSize: '18px 18px',
          backgroundImage: `radial-gradient(${theme.palette.primary.dark} 20%, transparent 20%)`,
          opacity: 0.2,
        },
      }}
    >
      <Box position="relative" zIndex={2}>
        <Box marginBottom={2}>
          <Typography
            variant="h2"
            align={'center'}
            sx={{
              fontWeight: 700,
            }}
          >
            Self-Custody Wallet API
            <br />
            for Developers
          </Typography>
        </Box>
        <Box marginBottom={4}>
          <Typography variant="h6" align={'center'} color={'textSecondary'}>
            Easily automate and send coins and tokens from your apps
            <br />
            without sacrificing security to third parties.
          </Typography>
        </Box>
        <Box
          marginBottom={{ xs: 4, sm: 6, md: 8 }}
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent={'center'}
          alignItems={{ xs: 'stretched', sm: 'center' }}
        >
          <Box
            component={Button}
            variant="contained"
            color="primary"
            size="large"
            fullWidth={!isMd}
            onClick={openGithub}
            startIcon={<GitHubIcon />}
          >
            View on Github
          </Box>
          <Box
            component={Button}
            variant="outlined"
            color="primary"
            size="large"
            fullWidth={!isMd}
            onClick={openDocumentation}
            marginTop={{ xs: 1, sm: 0 }}
            marginLeft={{ sm: 2 }}
          >
            Documentation
          </Box>
        </Box>
        <Box
          component={Card}
          bgcolor={colors.blueGrey[800]}
          padding={4}
          maxWidth={600}
          margin={'0 auto'}
          boxShadow={3}
        >
          <Typography color={theme.palette.common.white}>
            {'~$ > docker run anypay/wallet-bot'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
