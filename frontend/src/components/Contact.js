import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  Paper
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  WhatsApp as WhatsAppIcon
} from '@mui/icons-material';

function Contact({ accentColor = 'rgba(0, 180, 200, 0.85)' }) {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Box
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 6,
            background: 'rgba(30, 40, 60, 0.75)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 4, color: accentColor, fontWeight: 700, letterSpacing: 1 }}
          >
            Kontakt
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PhoneIcon sx={{ mr: 2, color: accentColor }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>Telefon</Typography>
                  <Link href="tel:+49123456789" color="inherit" underline="hover" sx={{ color: accentColor }}>
                    +49 123 456 789
                  </Link>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <WhatsAppIcon sx={{ mr: 2, color: accentColor }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>WhatsApp</Typography>
                  <Link href="https://wa.me/49123456789" color="inherit" underline="hover" sx={{ color: accentColor }}>
                    +49 123 456 789
                  </Link>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <EmailIcon sx={{ mr: 2, color: accentColor }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>E-Mail</Typography>
                  <Link href="mailto:info@roller-tuning.de" color="inherit" underline="hover" sx={{ color: accentColor }}>
                    info@roller-tuning.de
                  </Link>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationIcon sx={{ mr: 2, color: accentColor }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>Adresse</Typography>
                  <Typography sx={{ color: '#fff' }}>
                    Musterstraße 123<br />
                    12345 Musterstadt
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h6" gutterBottom sx={{ color: accentColor, fontWeight: 600 }}>
                  Öffnungszeiten
                </Typography>
                <Typography paragraph sx={{ color: '#fff' }}>
                  Montag - Freitag: 09:00 - 18:00 Uhr<br />
                  Samstag: 10:00 - 14:00 Uhr<br />
                  Sonntag: Geschlossen
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mt: 3, color: accentColor, fontWeight: 600 }}>
                  Terminvereinbarung
                </Typography>
                <Typography sx={{ color: '#fff' }}>
                  Für eine persönliche Beratung und Terminvereinbarung kontaktieren Sie uns bitte telefonisch oder per WhatsApp.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Contact; 