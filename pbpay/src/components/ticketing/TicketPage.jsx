import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  Chip,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Nav from "../common/Nav";
import FAQSection from "../common/FAQSection";

const TicketPage = () => {
  const navigate = useNavigate();


  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #E9F7FF, #DDEFFF, #FFFFFF)",
        minHeight: "100vh",
      }}
    >
      <Nav />

      <Box
        sx={{
          px: { xs: "16px", sm: "40px", md: "70px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={5.4}
          sx={{
            mt: "55px",
            mb: "24px",
            mx: "auto",
            maxWidth: "1280px",
            width: "100%",
          }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: { xs: "none", sm: "block" },
            "@media (max-width:734px)": { display: "none" }, }}
          >
            <Typography
              sx={{
                mb: 2,
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "24px",
                color: "#253858",
              }}
            >
              Payment Status
            </Typography>
            <Card
              sx={{
                width: "100%",
                height: "auto",
                boxShadow: "none",
                borderRadius: "8px",
                position: "relative",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Avatar
                    src="/path-to-blinkit-logo.png"
                    sx={{ width: 48, height: 48 }}
                  />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#253858",
                    }}
                  >
                    Blinkit
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", ml: "auto" }}
                  >
                    <Chip
                      label="Success"
                      sx={{
                        height: 22,
                        borderRadius: "100px",
                        backgroundColor: "#36B37E33",
                        color: "#00875A",
                        fontWeight: 700,
                        fontSize: "12px",
                        mr: 2,
                      }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#000000",
                      }}
                    >
                      ₹290
                    </Typography>
                    {/* <Box
                      // sx={{
                      //   width: 0,
                      //   height: 0,
                      //   borderLeft: "8px solid transparent",
                      //   borderRight: "8px solid transparent",
                      //   borderTop: "12px solid #000000",
                      //   ml: 1,
                      // }}
                    /> */}
                  </Box>
                </Box>
              </CardContent>
              <Box
                sx={{
                  backgroundColor: "#F4F5F7",
                  border: "2px solid #FFFFFF",
                  borderTop: "1px dashed #DFE1E6",
                  px: 2,
                  py: 1,
                }}
              >
                <Typography
                  sx={{ fontWeight: 500, fontSize: "14px", color: "#253858" }}
                >
                  UPI • Pay_IAJhC1UiJi7P8
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#253858",
                    opacity: 0.6,
                  }}
                >
                  Nov 18, 2024 • 10:10 am
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={11} sm={8}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <IconButton onClick={handleGoBack} sx={{ p: 0, mr: 1 }}>
                <img src="/Icons/Goback.svg" alt="Go back" />
              </IconButton>
            </Box>

            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                p: { xs: "16px", md: "32px" }, 
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  maxWidth: "727px",
                  mx: "auto",
                }}
              >
                <img
                  src="/Icons/Sent.gif"
                  alt="Success Tick"
                  style={{ width: 48, height: 48, marginBottom: 16 }}
                />
                <Typography
                  sx={{ fontSize: "18px", fontWeight: 700, color: "#253858" }}
                >
                  We have received your request!
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#253858",
                    mt: 1,
                    px: { xs: 2, md: 0 },
                  }}
                >
                  Your ticket number is <strong>#16222963</strong>. A confirmation
                  mail has been sent to <strong>rajnik72@gmail.com</strong>.
                </Typography>

                <hr
                  style={{
                    marginTop: "24px",
                    marginBottom: "24px",
                    border: "1px solid #2424241A",
                    width: "100%",
                  }}
                />

                <Paper
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#F4F5F7",
                    p: { xs: 2, md: 2 },
                    maxWidth: "525px",
                    width: "100%",
                    mb: 3,
                    boxShadow: "none",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      letterSpacing: "0.016em",
                      lineHeight: "24px",
                      color: "#253858",
                    }}
                  >
                    Our support team will send you an update within{" "}
                    <strong>8 business hours</strong>
                  </Typography>
                </Paper>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#36B37E",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "16px",
                    px: 4,
                    width: { md: "328px", xs: "100%" },
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#2da16d",
                    },
                  }}
                  onClick={() => navigate("/customer")}
                >
                  Done
                </Button>

                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#25385899",
                    mt: 2,
                  }}
                >
                  Awaiting a response to an earlier query?{" "}
                  <Typography
                    component="a"
                    sx={{
                      color: "#0065FF",
                      fontWeight: 500,
                      textDecoration: "none",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                    href="/check-query"
                  >
                    Track Existing Query
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <FAQSection/>
    </Box>
  );
};

export default TicketPage;


