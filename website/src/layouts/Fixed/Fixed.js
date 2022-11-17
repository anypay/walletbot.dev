import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Container from 'common/Container';
import { Topbar, Sidebar, Footer } from './components';
import { pages } from '../navigation--docs';

const Fixed = ({
  children,
  themeToggler,
  themeMode,
  setThemePalette,
  paletteType,
}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  return (
    <Box height="100%" overflow="hidden" width="100%">
      <AppBar
        position={'fixed'}
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
        elevation={0}
      >
        <Container paddingY={{ xs: 1 / 2, sm: 1 }} maxWidth={{ md: '100%' }}>
          <Topbar
            onSidebarOpen={handleSidebarOpen}
            themeMode={themeMode}
            themeToggler={themeToggler}
            setThemePalette={setThemePalette}
            paletteType={paletteType}
          />
        </Container>
        <Divider />
      </AppBar>
      <Sidebar
        onClose={handleSidebarClose}
        open={openSidebar}
        variant={isMd ? 'permanent' : 'temporary'}
        pages={pages}
      />
      <main>
        <Box height={{ xs: 56, sm: 64 }} />
        <Box
          display="flex"
          flex="1 1 auto"
          overflow="hidden"
          paddingLeft={{ md: '256px' }}
        >
          <Box display="flex" flex="1 1 auto" overflow="hidden">
            <Box flex="1 1 auto" height="100%" overflow="auto">
              {children}
              <Divider />
              <Container paddingY={4}>
                <Footer />
              </Container>
            </Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
};

Fixed.propTypes = {
  children: PropTypes.node,
  themeToggler: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
  setThemePalette: PropTypes.func.isRequired,
  paletteType: PropTypes.string.isRequired,
};

export default Fixed;
