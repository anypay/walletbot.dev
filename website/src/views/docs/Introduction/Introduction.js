import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from 'common/Container';

const Introduction = ({ themeMode = 'light' }) => {
  return (
    <Box>
      <Container>
        <Box>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'medium',
            }}
            gutterBottom
            align={'center'}
            color={'textSecondary'}
          >
            Introduction
          </Typography>
          <Typography
            variant="h4"
            align={'center'}
            sx={{
              fontWeight: 700,
            }}
          >
            Wallet Bot - Self Custody Wallet API for Developers
          </Typography>
          <br/>
          <Box>

          </Box>
        </Box>
      </Container>
    </Box>
  );
};

Introduction.propTypes = {
  themeMode: PropTypes.string.isRequired,
};

export default Introduction;
