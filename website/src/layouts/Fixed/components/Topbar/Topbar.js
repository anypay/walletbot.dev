import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import { colors } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import WebbeeLogo from 'svg/logos/Webbee';
import paletteTypes from 'common/paletteTypes';

const Topbar = ({
  themeMode,
  themeToggler,
  setThemePalette,
  onSidebarOpen,
  paletteType,
}) => {
  const theme = useTheme();
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={'100%'}
    >
      <Box display={'flex'} alignItems={'center'}>
        <Box marginRight={{ xs: 1, sm: 2 }} sx={{ display: { md: 'none', sm: 'block' } }}>
          <IconButton onClick={onSidebarOpen} aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Box>
        <Box
          display={'flex'}
          alignItems="baseline"
          component="a"
          underline="none"
          href="/"
          title="webbee"
          height={{ xs: 28, md: 32 }}
          width={45}
        >
          <WebbeeLogo height={'100%'} width={'100%'} />
        </Box>
      </Box>
      <Box display="flex" alignItems={'center'}>
        <Box
          display={'flex'}
          padding={1}
          borderRadius={8}
          bgcolor={theme.palette.alternate.main}
        >
          {paletteTypes.map((item, i) => (
            <Box
              key={item}
              bgcolor={colors[item][700]}
              width={20}
              height={20}
              borderRadius={'100%'}
              marginRight={i === paletteTypes.length - 1 ? 0 : 1}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              sx={{ cursor: 'pointer' }}
              onClick={() => setThemePalette(item)}
            >
              {paletteType === item && (
                <svg
                  width={12}
                  height={12}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </Box>
          ))}
        </Box>
        <Box>
          <IconButton
            onClick={() => themeToggler()}
            aria-label="Dark mode toggler"
            color={themeMode === 'light' ? 'primary' : 'secondary'}
          >
            {themeMode === 'light' ? (
              <svg
                width={24}
                height={24}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                width={24}
                height={24}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
          <Box marginRight={2}>
            <Link underline="none" component="a" href="/" color="textPrimary">
              Home
            </Link>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              component="a"
              target="blank"
              href="https://material-ui.com/store/items/webbee-landing-page/"
              size="large"
            >
              Purchase now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  themeToggler: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
  setThemePalette: PropTypes.func.isRequired,
  paletteType: PropTypes.string.isRequired,
};

export default Topbar;
