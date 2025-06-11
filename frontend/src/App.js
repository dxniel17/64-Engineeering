import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  AppBar,
  Toolbar,
  Tab,
  Tabs,
  Fade,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material';
import { DirectionsBike, ContactMail } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Contact from './components/Contact';

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const accentColor = 'rgba(0, 180, 200, 0.85)'; // Passe ggf. an dein Bild an

function App() {
  const [model, setModel] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [zoom, setZoom] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setTimeout(() => setZoom(false), 600);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/check-model', { model });
      setResult(response.data);
      setError('');
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      setResult(null);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflow: 'hidden',
      }}
    >
      <Fade in={!zoom} timeout={900}>
        <Box
          sx={{
            minHeight: '100vh',
            transform: zoom ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(2px)',
            pb: isMobile ? 7 : 0,
          }}
        >
          {/* Responsive Navigation */}
          {!isMobile ? (
            <AppBar
              position="static"
              elevation={0}
              sx={{
                background: 'rgba(20, 30, 40, 0.7)',
                borderRadius: '0 0 32px 32px',
                boxShadow: 'none',
                m: 2,
                mx: { xs: 0, sm: 4 },
                px: 2,
              }}
            >
              <Toolbar sx={{ minHeight: 64 }}>
                <DirectionsBike sx={{ fontSize: 32, mr: 1, color: accentColor }} />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 2, color: accentColor }}
                >
                  64 Engineering
                </Typography>
                <Tabs
                  value={currentTab}
                  onChange={handleTabChange}
                  textColor="inherit"
                  TabIndicatorProps={{ style: { background: accentColor, height: 4, borderRadius: 2 } }}
                  sx={{
                    '.MuiTab-root': {
                      borderRadius: 2,
                      minWidth: 120,
                      color: '#fff',
                      fontWeight: 600,
                      mx: 0.5,
                      transition: 'background 0.3s',
                    },
                    '.Mui-selected': {
                      background: accentColor,
                      color: '#fff',
                    },
                  }}
                >
                  <Tab icon={<DirectionsBike />} label="Tuning-Check" {...a11yProps(0)} />
                  <Tab icon={<ContactMail />} label="Kontakt" {...a11yProps(1)} />
                </Tabs>
              </Toolbar>
            </AppBar>
          ) : (
            <BottomNavigation
              showLabels
              value={currentTab}
              onChange={(event, newValue) => setCurrentTab(newValue)}
              sx={{
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 100,
                background: 'rgba(20, 30, 40, 0.85)',
                borderTop: `2px solid ${accentColor}`,
                boxShadow: '0 -2px 16px 0 rgba(31, 38, 135, 0.18)',
                '.Mui-selected': {
                  color: accentColor,
                },
              }}
            >
              <BottomNavigationAction label="Tuning" icon={<DirectionsBike />} />
              <BottomNavigationAction label="Kontakt" icon={<ContactMail />} />
            </BottomNavigation>
          )}

          {currentTab === 0 ? (
            <Container maxWidth="sm" sx={{ mt: isMobile ? 4 : 8, mb: isMobile ? 2 : 4 }}>
              <Box
                sx={{
                  borderRadius: { xs: 3, sm: 6 },
                  boxShadow: 'none',
                  background: 'rgba(30, 40, 60, 0.82)',
                  p: { xs: 2, sm: 5 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  backdropFilter: 'blur(6px)',
                  border: 'none',
                }}
              >
                <Typography
                  variant={isMobile ? 'h5' : 'h4'}
                  component="h1"
                  align="center"
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    color: accentColor,
                    letterSpacing: 1,
                  }}
                >
                  Roller Tuning Check
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    label="Roller Modell"
                    variant="filled"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    margin="normal"
                    required
                    InputProps={{
                      style: {
                        borderRadius: 12,
                        background: 'rgba(255,255,255,0.10)',
                        color: '#fff',
                        fontWeight: 500,
                        fontSize: isMobile ? '1rem' : '1.1rem',
                        boxShadow: 'none',
                        border: 'none',
                        padding: isMobile ? '10px 12px' : undefined,
                      },
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      style: { color: accentColor, fontWeight: 600 },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      py: 1.5,
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      textTransform: 'none',
                      borderRadius: 8,
                      fontWeight: 700,
                      background: accentColor,
                      boxShadow: '0 4px 24px 0 rgba(0,180,200,0.10)',
                      '&:hover': {
                        background: 'rgba(0, 180, 200, 1)',
                        boxShadow: '0 8px 32px 0 rgba(0,180,200,0.18)',
                      },
                    }}
                  >
                    Tuning-Möglichkeit prüfen
                  </Button>
                </form>
                {error && (
                  <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                    {error}
                  </Alert>
                )}
                {result && (
                  <>
                    <Alert
                      severity={result.canBeTuned ? 'success' : 'info'}
                      sx={{
                        mt: 2,
                        width: '100%',
                        fontWeight: 600,
                        fontSize: isMobile ? '1rem' : '1.1rem',
                        borderRadius: 2,
                        background: result.canBeTuned
                          ? 'rgba(0, 180, 200, 0.15)'
                          : 'rgba(255,255,255,0.10)',
                        color: result.canBeTuned ? accentColor : '#fff',
                      }}
                    >
                      {result.message}
                    </Alert>
                    {result.showInstagram && (
                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        href="https://www.instagram.com/64engineering/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          mt: 2,
                          py: 1.3,
                          fontWeight: 700,
                          fontSize: isMobile ? '1rem' : '1.1rem',
                          background: 'linear-gradient(90deg, #405DE6 0%, #5851DB 40%, #833AB4 70%, #E1306C 100%)',
                          color: '#fff',
                          borderRadius: 8,
                          textTransform: 'none',
                          boxShadow: '0 2px 12px 0 rgba(64,93,230,0.18)',
                          '&:hover': {
                            background: 'linear-gradient(90deg, #405DE6 0%, #E1306C 100%)',
                          },
                        }}
                        startIcon={
                          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style={{ width: 24, height: 24 }} />
                        }
                      >
                        Jetzt über Instagram kontaktieren
                      </Button>
                    )}
                  </>
                )}
              </Box>
            </Container>
          ) : (
            <Contact accentColor={accentColor} />
          )}
        </Box>
      </Fade>
    </Box>
  );
}

export default App; 