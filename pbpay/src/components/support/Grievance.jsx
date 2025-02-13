import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import Nav from "../common/Nav";
import Decor from "../common/Decor";

const Grievance = () => {
  return (
    <Box
    sx={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #E9F7FF, #DDEFFF, #FFFFFF)",
      position: "relative",
      pb: 4,
    }}
  >
    <Nav />
{/* <Decor/> */}
      <Container maxWidth="md" sx={{ mt: '156.96px', position: "relative" }}>
        
        <Box sx={{ mb: '52px', textAlign: "center", position: "relative" }}>
          <Box
            component="img"
            src="/Icons/body1.svg"
            alt="Who am I?"
            sx={{
              width: '57.19px',
              height: '57.19px',
              position: "absolute",
              top: { xs: '30px', sm: '10px' }, 
              left: { xs: '50%', sm: 'auto' },
              transform: { xs: 'translateX(-50%)', sm: 'none' },
              right: { sm: '158px' },
            }}
          />

          <Typography
            sx={{
              fontWeight: 700,
              color: "#253858",
              fontSize: { xs: "32px", sm: "42px", md: "52px" },
            }}
          >
            Hello, <span style={{ fontSize: "35px", color: "#000" }}>👋</span> I am a...
          </Typography>
        </Box>

        <Grid container spacing={{ xs: .8, sm: 2 }} justifyContent="center">
      
      <Grid item xs={12} sm={6} md={4}>
        <Link to="/customer" style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              height: { xs: '146.03px', sm: '266px' },
              width: { xs: '328px', sm: '266px' },
              position: "relative",
              borderRadius: "8px",
              mx: 'auto',
              mt: { xs: '20px', sm: '38px' }
            }}
          >
            <CardContent sx={{ paddingBottom: 0 }}>
              <Typography sx={{ fontWeight: 700, color: "#253858", fontSize: '16px', lineHeight: '24px' }}>
                Customer
              </Typography>
              <Typography sx={{
                opacity: 0.6, mt: '4px', color: "#253858",
                fontWeight: 400, fontSize: "14px", lineHeight: "20px"
              }}>
                I use PB Pay for personal payments
              </Typography>
            </CardContent>

            <CardMedia
              component="img"
              image="/Icons/illustration.svg"
              alt="Customer"
              sx={{
                width: { xs: '120px', sm: '185px' },
                height: { xs: '80px', sm: '161px' },
                position: 'absolute',
                right: 8,
                bottom: 8
              }}
            />

            <Box sx={{ position: "absolute", bottom: 8, left: 8 }}>
              <Box component="img" src="/Icons/Arrow.svg" alt="Go" sx={{ width: 20, height: 20 }} />
            </Box>
          </Card>
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            height: { xs: '146.03px', sm: '266px' },
            width: { xs: '328px', sm: '266px' },
            position: "relative",
            mx: 'auto',
            mt: { xs: '20px', sm: '38px' },
            borderRadius:'8px',
          }}
        >
          <CardContent sx={{ paddingBottom: 0 }}>
            <Typography sx={{ fontWeight: 700, color: "#253858", fontSize: '16px', lineHeight: '24px' }}>
              Merchant
            </Typography>
            <Typography sx={{
              opacity: 0.6, mt: '4px', color: "#253858",
              fontWeight: 400, fontSize: "14px", lineHeight: "20px"
            }}>
              I use PB Pay for my business
            </Typography>
          </CardContent>

          <CardMedia
            component="img"
            image="/Icons/illustration1.svg"
            alt="Merchant"
            sx={{
              width: { xs: '120px', sm: '185px' },
              height: { xs: '80px', sm: '161px' },
              position: 'absolute',
              right: 8,
              bottom: 8
            }}
          />

          <Box sx={{ position: "absolute", bottom: 8, left: 8 }}>
            <MuiLink href="#" target="_blank" rel="noopener noreferrer">
              <Box component="img" src="/Icons/Arrow.svg" alt="Go" sx={{ width: 20, height: 20 }} />
            </MuiLink>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            height: { xs: '146.03px', sm: '266px' },
            width: { xs: '328px', sm: '266px' },
            position: "relative",
            borderRadius: "8px",
            mx: 'auto',
            mt: { xs: '20px', sm: '38px' }
          }}
        >
          <CardContent sx={{ paddingBottom: 0 }}>
            <Typography sx={{ fontWeight: 700, color: "#253858", fontSize: '16px', lineHeight: '24px' }}>
              Existing partner
            </Typography>
            <Typography sx={{
              opacity: 0.6, mt: '4px', color: "#253858",
              fontWeight: 400, fontSize: "14px", lineHeight: "20px"
            }}>
              I want to manage my PB Pay partner account
            </Typography>
          </CardContent>

          <CardMedia
            component="img"
            image="/Icons/illustration2.svg"
            alt="Existing partner"
            sx={{
              width: { xs: '120px', sm: '185px' },
              height: { xs: '80px', sm: '161px' },
              position: 'absolute',
              right: 8,
              bottom: 8
            }}
          />

          <Box sx={{ position: "absolute", bottom: 8, left: 8 }}>
            <MuiLink href="#" target="_blank" rel="noopener noreferrer">
              <Box component="img" src="/Icons/Arrow.svg" alt="Go" sx={{ width: 20, height: 20 }} />
            </MuiLink>
          </Box>
        </Card>
      </Grid>

    </Grid>
      </Container>

      <Divider
        sx={{
          position: "absolute",
          top: 0,
          width: "100vw",
          backgroundColor: "#F4F7FC",
          height: "2px",
        }}
      />
    </Box>
  );
};

export default Grievance;







