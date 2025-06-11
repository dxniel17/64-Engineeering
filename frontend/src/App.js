import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Fade,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const accentColor = 'rgba(0, 180, 200, 0.85)';

function App() {
  const [model, setModel] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [zoom, setZoom] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setTimeout(() => setZoom(false), 600);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/api/check-model`, { model });
      setResult(response.data);
      setError('');
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      setResult(null);
    }
  };

  const handleInputChange = (e) => {
    setModel(e.target.value);
    setResult(null);
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
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            pt: { xs: '18vh', sm: '20vh' },
            transform: zoom ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(2px)',
            pb: isMobile ? 7 : 0,
          }}
        >
          <Container maxWidth="sm" sx={{ my: 0 }}>
            <Box
              sx={{
                borderRadius: { xs: 3, sm: 6 },
                boxShadow: 'none',
                background: 'rgba(30, 40, 60, 0.82)',
                p: { xs: 2, sm: 5 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2.5,
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
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  InputProps={{
                    style: {
                      borderRadius: 14,
                      background: 'rgba(30,40,60,0.18)',
                      color: '#fff',
                      fontWeight: 500,
                      fontSize: isMobile ? '1.08rem' : '1.15rem',
                      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                      border: `2px solid ${accentColor}`,
                      padding: isMobile ? '16px 18px' : '18px 22px',
                      minHeight: isMobile ? 54 : 60,
                      height: isMobile ? 54 : 60,
                      marginBottom: 8,
                    },
                    disableUnderline: true,
                  }}
                  InputLabelProps={{
                    style: { color: accentColor, fontWeight: 600, fontSize: isMobile ? '1.08rem' : '1.15rem' },
                  }}
                />
                {!result && (
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      py: isMobile ? 1.2 : 1.5,
                      minHeight: isMobile ? 44 : 48,
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      textTransform: 'none',
                      borderRadius: 7,
                      fontWeight: 700,
                      background: accentColor,
                      boxShadow: '0 2px 10px 0 rgba(0,180,200,0.10)',
                      '&:hover': {
                        background: 'rgba(0, 180, 200, 1)',
                        boxShadow: '0 4px 16px 0 rgba(0,180,200,0.18)',
                      },
                    }}
                  >
                    Tuning-Möglichkeit prüfen
                  </Button>
                )}
              </form>
              {error && (
                <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                  {error}
                </Alert>
              )}
              {result && (
                <>
                  <Alert
                    iconMapping={{ success: <CheckCircleIcon fontSize="inherit" /> }}
                    severity="success"
                    sx={{
                      mt: 3,
                      mb: 1.5,
                      borderRadius: 3,
                      background: 'rgba(30,40,60,0.38)',
                      color: '#aef6d6',
                      fontWeight: 500,
                      fontSize: isMobile ? '1.08rem' : '1.13rem',
                      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                      border: `1.5px solid #1de9b6`,
                    }}
                  >
                    {`Das Modell "${model}" kann getunt werden! Kontaktiere mich direkt über Instagram für dein individuelles Angebot.`}
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
        </Box>
      </Fade>
    </Box>
  );
}

export default App; 