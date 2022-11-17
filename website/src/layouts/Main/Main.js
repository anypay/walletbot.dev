import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { Topbar, Sidebar, Footer } from './components';
import Container from 'common/Container';
import { pages } from '../navigation';

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
};

const Main = ({
  children,
  themeToggler,
  themeMode,
  setThemePalette,
  paletteType,
}) => {
  const theme = useTheme();
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  return (
    <div>
      <HideOnScroll>
        <AppBar
          position={'fixed'}
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
          elevation={1}
        >
          <Container paddingY={{ xs: 1 / 2, sm: 1 }}>
            <Topbar
              onSidebarOpen={handleSidebarOpen}
              themeMode={themeMode}
              themeToggler={themeToggler}
              setThemePalette={setThemePalette}
              paletteType={paletteType}
            />
          </Container>
        </AppBar>
      </HideOnScroll>
      <Sidebar
        onClose={handleSidebarClose}
        open={openSidebar}
        variant="temporary"
        pages={pages}
      />
      <main>
        <Box height={{ xs: 56, sm: 64 }} />
        {children}
        <Divider />
      </main>
      <Container paddingY={4}>
        <Footer />
      </Container>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  themeToggler: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
  setThemePalette: PropTypes.func.isRequired,
  paletteType: PropTypes.string.isRequired,
};

export default Main;
