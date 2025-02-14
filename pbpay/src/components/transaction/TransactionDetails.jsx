import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Paper,
  Chip,
  Avatar,
  Card,
  CardContent
} from "@mui/material";
import Nav from "../common/Nav";
import FAQSection from "../common/FAQSection";

const mockTransactions = [
  { id: '101', date: new Date('2024-11-18T10:10:00'), merchant: 'Blinkit', logo: '/path-to-blinkit-logo.png', amount: 290.0, type: 'UPI', status: 'Success', transactionId: 'Pay_IAJhC1UiJi7P8' },
  { id: '102', date: new Date('2024-11-18T10:10:00'), merchant: 'Commodum groceries pvt. ltd.', logo: '/path-to-commodum-logo.png', amount: 243.99, type: 'Card', status: 'Success', transactionId: 'Pay_IAJhC1UiJi7P8' },
  { id: '103', date: new Date('2024-11-18T10:10:00'), merchant: 'Shockwave education LLP', logo: '/path-to-shockwave-logo.png', amount: 90.0, type: 'UPI', status: 'Success', transactionId: 'Pay_IAJhC1UiJi7P8' },
  { id: '104', date: new Date('2024-11-18T10:10:00'), merchant: 'Kavalry technol orgies pvt.ltd.', logo: '/path-to-kavalry-logo.png', amount: 1.0, type: 'UPI', status: 'Success', transactionId: 'Pay_IAJhC1UiJi7P8' },
  { id: '105', date: new Date('2024-11-18T10:10:00'), merchant: 'Kavalry technol orgies pvt.ltd.', logo: '/path-to-kavalry-logo.png', amount: 290.0, type: 'UPI', status: 'Success', transactionId: 'Pay_IAJhC1UiJi7P8' },
  { id: '106', date: new Date('2024-11-23T14:25:00'), merchant: 'Zomato', logo: '/path-to-logo.png', amount: 1150.0, type: 'UPI', status: 'Success', transactionId: 'Pay_ZMT456' },
  { id: '107', date: new Date('2024-11-24T12:40:00'), merchant: 'Dominos', logo: '/path-to-logo.png', amount: 450.99, type: 'Card', status: 'Success', transactionId: 'Pay_DM9876' },
  { id: '108', date: new Date('2024-11-25T17:00:00'), merchant: 'Lenskart', logo: '/path-to-logo.png', amount: 899.0, type: 'UPI', status: 'Success', transactionId: 'Pay_LK6543' },
  { id: '109', date: new Date('2024-11-26T08:30:00'), merchant: 'Nykaa', logo: '/path-to-logo.png', amount: 2499.99, type: 'Card', status: 'Success', transactionId: 'Pay_NY123456' },
  { id: '110', date: new Date('2024-11-27T19:15:00'), merchant: 'Swiggy', logo: '/path-to-logo.png', amount: 650.0, type: 'UPI', status: 'Success', transactionId: 'Pay_SW1234' },
  { id: '111', date: new Date('2024-11-28T10:55:00'), merchant: 'Uber Eats', logo: '/path-to-logo.png', amount: 799.99, type: 'Card', status: 'Success', transactionId: 'Pay_UB7890' },
  { id: '112', date: new Date('2024-11-29T11:00:00'), merchant: 'Croma', logo: '/path-to-logo.png', amount: 1200.5, type: 'UPI', status: 'Success', transactionId: 'Pay_CR1234' },
  { id: '113', date: new Date('2024-11-30T09:30:00'), merchant: 'Reliance Digital', logo: '/path-to-logo.png', amount: 2999.99, type: 'Card', status: 'Success', transactionId: 'Pay_RD6543' },
  { id: '114', date: new Date('2024-12-01T18:40:00'), merchant: 'Tata Cliq', logo: '/path-to-logo.png', amount: 1599.0, type: 'UPI', status: 'Pending', transactionId: 'Pay_TC123XYZ' },
  { id: '115', date: new Date('2024-12-02T20:20:00'), merchant: 'Makemytrip', logo: '/path-to-logo.png', amount: 12000.0, type: 'Card', status: 'Success', transactionId: 'Pay_MMT12345' },
  { id: '116', date: new Date('2024-12-03T14:10:00'), merchant: 'FreshToHome', logo: '/path-to-logo.png', amount: 680.5, type: 'UPI', status: 'Success', transactionId: 'Pay_FTH54321' },
  { id: '117', date: new Date('2024-12-04T11:05:00'), merchant: 'Lulu Hypermarket', logo: '/path-to-logo.png', amount: 1299.99, type: 'Card', status: 'Success', transactionId: 'Pay_LH9876' },
  { id: '118', date: new Date('2024-12-05T12:30:00'), merchant: 'Carrefour', logo: '/path-to-logo.png', amount: 1850.75, type: 'UPI', status: 'Success', transactionId: 'Pay_CAR987' },
  { id: '119', date: new Date('2024-12-06T13:15:00'), merchant: 'Pepperfry', logo: '/path-to-logo.png', amount: 3499.0, type: 'Card', status: 'Success', transactionId: 'Pay_PF654321' },
  { id: '120', date: new Date('2024-12-07T15:00:00'), merchant: 'Bata', logo: '/path-to-logo.png', amount: 899.99, type: 'UPI', status: 'Success', transactionId: 'Pay_BATA123' }
];

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const selectedTransaction = mockTransactions.find((txn) => txn.id === id);
    setTransaction(selectedTransaction);
  }, [id]);

  if (!transaction) {
    return <div>Loading...</div>;
  }

  const { merchant, amount, type, status, transactionId, date, logo } =
    transaction;

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleContactSupport = () => {
    navigate("/ticket");
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #E9F7FF, #DDEFFF, #FFFFFF)",
        minHeight: "100vh"
      }}
    >
      <Nav />

      <Box
        sx={{
          px: { xs: "16px", sm: "70px" },
          py: { xs: 3, sm: 4 },
          mx: "auto",
          maxWidth: "1440px"
        }}
      >
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: { xs: "none",sm:'none', md: "block" } }}
          >
            <Typography
              sx={{
                mb: 2,
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "24px",
                color: "#253858"
              }}
            >
              Payment Status
            </Typography>

            <Card
              sx={{
                width: "100%",
                boxShadow: "none",
                borderRadius: "8px"
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={logo} sx={{ width: 48, height: 48, mr: 2 }} />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#253858"
                    }}
                  >
                    {merchant}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
                    <Chip
                      label={status}
                      sx={{
                        height: 22,
                        borderRadius: "100px",
                        backgroundColor:
                          status === "Success" ? "#36B37E33" : "#F0F0F0",
                        color: status === "Success" ? "#00875A" : "#000000",
                        fontWeight: 700,
                        fontSize: "12px",
                        mr: 2
                      }}
                    />
                    <Typography
                      sx={{ fontWeight: 700, fontSize: "16px", color: "#000000" }}
                    >
                      ₹{amount}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              <Box
                sx={{
                  backgroundColor: "#F4F5F7",
                  borderTop: "1px dashed #DFE1E6",
                  px: 2,
                  py: 1
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#253858"
                  }}
                >
                  {type} • {transactionId}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#253858",
                    opacity: 0.6
                  }}
                >
                  {date.toLocaleDateString()} •{" "}
                  {date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <IconButton onClick={handleGoBack} sx={{ p: 0, mr: 1 }}>
                <img src="/Icons/Goback.svg" alt="svg" />
              </IconButton>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: "#253858"
                }}
              >
                Transaction Details
              </Typography>
            </Box>

            <Paper
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: "20px",
                boxShadow: "none",
                mb: 3
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#253858",
                  mb: 1
                }}
              >
                Your payment was successful
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#25385899",
                  lineHeight: "24px"
                }}
              >
                The <strong>₹{amount}</strong> payment you made to {merchant} was
                processed successfully. We request you to click on "Contact
                support" for any further queries/issues.{" "}
                <span style={{ color: "#0065FF", fontWeight: 500 }}>
                  Read more
                </span>
              </Typography>

              <Box
                sx={{
                  border: "1px solid #DFE1E6",
                  p: { xs: 2, md: 3 },
                  borderRadius: "8px",
                  mt: 2,
                  mb: 3
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#253858", display: "flex", gap: "20px" }}
                >
                  {merchant}
                  <Chip
                    label={status}
                    sx={{
                      borderRadius: "100px",
                      backgroundColor:
                        status === "Success"
                          ? "#36B37E33"
                          : status === "Pending"
                          ? "#FFBF0033"
                          : "#F0F0F0",
                      color:
                        status === "Success"
                          ? "#00875A"
                          : status === "Pending"
                          ? "#FFBF00"
                          : "#000000",
                      fontWeight: 700,
                      height: 22,
                      fontSize: "12px"
                    }}
                  />
                </Typography>

                <hr
                  style={{
                    border: "1px solid #DFE1E6",
                    margin: "10px 0"
                  }}
                />
                <Grid container spacing={4}>
                  <Grid item xs={6} sm={4}>
                    <Typography
                      sx={{
                        color: "#253858",
                        opacity: 0.6,
                        fontSize: "14px"
                      }}
                    >
                      Payment ID
                    </Typography>
                    <Typography
                      sx={{
                        color: "#253858",
                        fontWeight: 500,
                        display: "flex",
                        fontSize:{xs:'12px',md:'14px'},
                        alignItems: "center"
                      }}
                    >
                      {transactionId}
                      <IconButton
                        onClick={() => navigator.clipboard.writeText(transactionId)}
                        sx={{ ml: 1, p: 0 }}
                      >
                        <img
                          src="/Icons/copy.svg"
                          alt="copy Id"
                          style={{ width: 16, height: 16 }}
                        />
                      </IconButton>
                    </Typography>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <Typography sx={{ color: "#253858", opacity: 0.6, fontSize: "14px" }}>
                      Date & Time
                    </Typography>
                    <Typography sx={{ color: "#253858", fontWeight: 500,fontSize:{xs:'12px',md:'14px'}, }}>
                      {date.toLocaleDateString()}{" "}
                      {date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <Typography sx={{ color: "#253858", opacity: 0.6, fontSize: "14px" }}>
                      Payment Amount
                    </Typography>
                    <Typography sx={{ color: "#253858", fontWeight: 500,fontSize:{xs:'12px',md:'14px'}, }}>
                      ₹{amount}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <Typography sx={{ color: "#253858", opacity: 0.6, fontSize: "14px" }}>
                      Payment Method
                    </Typography>
                    <Typography sx={{ color: "#253858", fontWeight: 500,fontSize:{xs:'12px',md:'14px'}, }}>
                      {type}
                    </Typography>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#E3FCEF",
                    p: 2,
                    borderRadius: "8px",
                    mt: 3
                  }}
                >
                  <img
                    src="/Icons/PaymentTick.svg"
                    alt="Payment Tick"
                    style={{ width: 24, height: 24 }}
                  />
                  <Typography
                    sx={{
                      ml: 1,
                      fontWeight: 500,
                      fontSize: "12px",
                      color: "#253858"
                    }}
                  >
                    Payment was successful from PB Pay end.
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  border: "1px solid #DFE1E6",
                  p: 2,
                  borderRadius: "8px",
                  mb: 3
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700, color: "#253858" }}
                >
                  Reach out to {merchant} support
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#25385899", mt: 1 }}
                >
                  Contact {merchant} support for any update on the service/goods.{" "}
                  <Button
                    onClick={handleContactSupport}
                    sx={{
                      textTransform: "none",
                      color: "#0065FF",
                      p: 0,
                      minWidth: "auto"
                    }}
                  >
                    Contact support
                  </Button>
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#25385899",
                  mt: "20px"
                }}
              >
                Awaiting a response to an earlier query?{" "}
                <Link
                  to="/check-query"
                  style={{ color: "#0065FF", fontWeight: 500 }}
                >
                  Track Existing Query
                </Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <FAQSection/>
    </Box>
  );
};

export default TransactionDetails;
