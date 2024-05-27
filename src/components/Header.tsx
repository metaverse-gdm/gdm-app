import {
  AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemText, ListItemIcon,
} from '@mui/material';
import {
  Menu as MenuIcon, Search as SearchIcon, Help as HelpIcon, Language as LanguageIcon, AddBox as AddBoxIcon, Login as LoginIcon, PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/system';

const Header: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLanguageMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = (language?: string) => {
    if (language) {
      i18n.changeLanguage(language);
    }
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button>
          <ListItemIcon><SearchIcon /></ListItemIcon>
          <ListItemText primary={t('find_project')} />
        </ListItem>
        <ListItem button>
          <ListItemIcon><HelpIcon /></ListItemIcon>
          <ListItemText primary={t('faq')} />
        </ListItem>
        <ListItem button onClick={handleLanguageMenuClick}>
          <ListItemIcon><LanguageIcon /></ListItemIcon>
          <ListItemText primary={t('language')} />
        </ListItem>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => handleLanguageMenuClose()}>
          <MenuItem onClick={() => handleLanguageMenuClose('en')}>English</MenuItem>
          <MenuItem onClick={() => handleLanguageMenuClose('zh')}>中文</MenuItem>
          <MenuItem onClick={() => handleLanguageMenuClose('ja')}>日本語</MenuItem>
        </Menu>
        <ListItem button>
          <ListItemIcon><AddBoxIcon /></ListItemIcon>
          <ListItemText primary={t('register_project')} />
        </ListItem>
        <ListItem button>
          <ListItemIcon><LoginIcon /></ListItemIcon>
          <ListItemText primary={t('login')} />
        </ListItem>
        <ListItem button>
          <ListItemIcon><PersonAddIcon /></ListItemIcon>
          <ListItemText primary={t('sign_up')} />
        </ListItem>
      </List>
    </div>
  );

  const StyledButton = styled(Button)({
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  });

  return (
    <AppBar position="static" color="default">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {t('title')}
        </Typography>
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawer}
            </Drawer>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledButton startIcon={<SearchIcon />} color="inherit">
              {t('find_project')}
            </StyledButton>
            <StyledButton startIcon={<HelpIcon />} color="inherit">
              {t('faq')}
            </StyledButton>
            <StyledButton startIcon={<LanguageIcon />} color="inherit" onClick={handleLanguageMenuClick}>
              {t('language')}
            </StyledButton>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => handleLanguageMenuClose()}>
              <MenuItem onClick={() => handleLanguageMenuClose('en')}>English</MenuItem>
              <MenuItem onClick={() => handleLanguageMenuClose('zh')}>中文</MenuItem>
              <MenuItem onClick={() => handleLanguageMenuClose('ja')}>日本語</MenuItem>
            </Menu>
            <StyledButton startIcon={<AddBoxIcon />} variant="outlined" color="inherit">
              {t('register_project')}
            </StyledButton>
            <StyledButton startIcon={<LoginIcon />} color="inherit">{t('login')}</StyledButton>
            <StyledButton startIcon={<PersonAddIcon />} color="inherit">{t('sign_up')}</StyledButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
