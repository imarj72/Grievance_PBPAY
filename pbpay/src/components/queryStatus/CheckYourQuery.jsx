import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import Nav from "../common/Nav";
import FAQSection from "../common/FAQSection";

const CheckYourQuery = () => {
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  const [openIndex, setOpenIndex] = useState(null);
  const [emailInfo, setEmailInfo] = useState({ email: "", submitted: false });
  const [timer, setTimer] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [paymentType, setPaymentType] = useState("mobile");
  const [inputField, setInputField] = useState("");
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [otpState, setOtpState] = useState(false);
  const [otpVerified, setOtpVerified] = useState(null);
  const [escalate, setEscalate] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [emailError, setEmailError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    let countdown;
    if (otpState && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [otpState, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleGetOTP = (e) => {
    e.preventDefault();
    if (validateEmail(emailInfo.email)) {
      setOtpState(true);
      setTimer(120);
      setIsResendDisabled(true);
    } else {
      setEmailError(true);
    }
  };

  const handleEmailChange = (e) => {
    setEmailInfo({ ...emailInfo, email: e.target.value });
    setEmailError(false);
  };

  const handleVerifyOTP = () => {
    const isValidOtp = otp.join("") === "123456";
    setOtpVerified(isValidOtp);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const isValidOtp = otp.join("") === "123456";
      setOtpVerified(isValidOtp);
    }
  };

  const handleEscalate = () => {
    setEscalate(true);
  };

  const handleRadioChange = (e) => {
    setPaymentType(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputField(e.target.value);
  };

  const handleCaptchaChange = () => {
    setIsCaptchaChecked(!isCaptchaChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with: ", { paymentType, inputField, isCaptchaChecked });
    setShowSuccessModal(true);
  };

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);


    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, e) => {

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        navigate('/customer');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, navigate]);

  
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pastedData)) return;
    setOtp(pastedData.split(""));
    otpRefs.current[5].focus();
  };

  const handleChangeEmail = () => {
    setOtpState(false);
    setEmailInfo({ ...emailInfo, email: "" });
    setOtpVerified(null);
    setOtp(["", "", "", "", "", ""]);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleGoBack = () => {
    setEmailInfo({ email: "", submitted: false });
    setOtp(["", "", "", "", "", ""]);
    setOtpState(false);
    setOtpVerified(null);
    setEscalate(false);
    setTimer(120);
    setIsResendDisabled(true);
    setInputField("");
    setPaymentType("mobile");
    setIsCaptchaChecked(false);
    if (!otpState && otpVerified === null && !escalate) {
      navigate(-1);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #E9F7FF, #DDEFFF, #DDEFFF)",
        minHeight: "100vh",
      }}
    >
      <Nav />

      <Grid container justifyContent="center">
        <Grid item xs={10} sm={10} md={6} lg={6} xl={4}>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            sx={{
              mt: 4,
              mb: 2,
            }}
          >
            <Button
              onClick={handleGoBack}
              sx={{
                backgroundColor: "transparent",
                zIndex: 1000,
                p: 0,
                mr: { xs: 0, md: 2 },   
                mb: { xs: 1, md: 0 },   
                minWidth: "auto",
              }}
            >
              <img src="./Icons/Goback.svg" alt="Go Back" />
            </Button>

            <Box>
              {(!otpState || otpVerified === null) ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: "20px",
                      lineHeight: "23.44px",
                      color: "#253858",
                    }}
                  >
                    Check Your Query Status
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "16px",
                      opacity: "60%",
                      lineHeight: "24px",
                      letterSpacing: "0.0016em",
                    }}
                  >
                    Haven't received a response yet? Track your query here.
                  </Typography>
                </>
              ) : (
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "20px",
                    color: "#253858",
                    lineHeight: "24px",
                    letterSpacing: "0.0016em",
                    mb: "20px",
                    mt: "15px",
                  }}
                >
                  Query Status
                </Typography>
              )}
            </Box>
          </Box>
          {!otpState ? (
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mb: 3,
                maxWidth: { xs: "100%", md: "700px" },
                width: "100%",
                margin: "auto",
                borderRadius: "20px",
                boxShadow: "none",
              }}
            >
              <form onSubmit={handleGetOTP}>
                <Typography
                  sx={{
                    mb: 1,
                    fontWeight: { xs: 500, md: 700 },
                    fontSize: { xs: "14px", md: "20px" },
                    lineHeight: { xs: "20px", md: "30px" },
                    color: "#253858",
                  }}
                >
                  Enter the email ID you used to raise the query.
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter email ID"
                  value={emailInfo.email}
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={
                    emailError ? "Enter a valid email Id to check your status" : ""
                  }
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  sx={{
                    py: 1.5,
                    mb: 2,
                    textTransform: "capitalize",
                    width: "100%",
                    height: "48px",
                    borderRadius: "8px",
                    backgroundColor: "#3965FB",
                    color: "#FFFFFF",
                  }}
                >
                  Get OTP
                </Button>
                <Typography
                  align="left"
                  sx={{
                    color: "#25385899",
                    fontSize: "14px",
                    lineHeight: "20px",
                    marginTop: "20px",
                    textAlign: { xs: "left", sm: "center" },
                  }}
                >
                  Waiting to get back deducted money?
                  <Box sx={{ display: { xs: "block", sm: "inline" } }}>
                    <Link
                      to="/customer"
                      style={{
                        color: "#0065FF",
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "20px",
                        letterSpacing: "0.0014em",
                      }}
                    >
                      Track payment
                    </Link>
                  </Box>
                </Typography>
              </form>
            </Paper>
          ) : otpVerified === null ? (
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mb: 3,
                maxWidth: { xs: "100%", md: "700px" },
                width: "100%",
                margin: "auto",
                borderRadius: "20px",
                boxShadow: "none",
              }}
            >
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "30px",
                  color: "#253858",
                }}
              >
                6 digit OTP sent to your email ID
              </Typography>
              <Typography
                sx={{
                  mb: 2,
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#25385899",
                //   padding:'4px'
                }}
              >
                Enter OTP sent on <strong>{emailInfo.email}</strong>{" "}
                <Button
                  variant="text"
                  onClick={handleChangeEmail}
                  sx={{
                    textTransform: "none",
                    p: 0,
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "16.41px",
                    letterSpacing: "0.0014em",
                    color: "#0065FF",
                  }}
                >
                  Change
                </Button>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: { xs: 1, md: 2.4 },
                  mb: { xs: 4, md: 2.4 },
                }}
              >
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    type="text"
                    inputProps={{
                      style: {
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: 700,
                        borderRadius: "8px",
                        color: "#253858",
                        border: "1px solid #5E6C84",
                        width: "100%",
                      },
                      maxLength: 1,
                    }}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleBackspace(index, e)}
                    onPaste={handlePaste}
                    inputRef={(el) => (otpRefs.current[index] = el)}
                    sx={{
                      width: { xs: "40px", sm: "56px", md: "66px" },
                      height: { xs: "40px", sm: "56px" },
                    }}
                  />
                ))}
              </Box>
              <Typography
                sx={{
                  mb: 2,
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "18px",
                  color: "#25385899",
                }}
              >
                Resend OTP in <strong>{formatTime(timer)}</strong>
              </Typography>
              <Button
                onClick={handleVerifyOTP}
                onKeyDown={handleKeyPress}
                sx={{
                  mb: 1,
                  py: 1.5,
                  px: 4,
                  width: "100%",
                  maxWidth: { md: "516px" },
                  alignItems: "center",
                  backgroundColor: "#3965FB",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "18.75px",
                  color: "#ffffff",
                  textTransform: "capitalize",
                  mx: "auto",
                  display: "block",
                }}
              >
                Verify OTP
              </Button>
              <Typography
                align="left"
                sx={{
                  color: "#25385899",
                  fontSize: "14px",
                  lineHeight: "20px",
                  marginTop: "20px",
                  textAlign: { xs: "left", sm: "center" },
                }}
              >
                Waiting to get back deducted money?
                <Box sx={{ display: { xs: "block", sm: "inline" } }}>
                  <Link
                    to="/customer"
                    style={{
                      color: "#0065FF",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "20px",
                      letterSpacing: "0.0014em",
                    }}
                  >
                    Track payment
                  </Link>
                </Box>
              </Typography>
            </Paper>
          ) : otpVerified ? (
            !escalate ? (
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  mb: 3,
                  maxWidth: { xs: "100%", md: "700px" },
                  width: "100%",
                  margin: "auto",
                  borderRadius: "20px",
                  boxShadow: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2.4,
                    backgroundColor: "#EBF3FF",
                    padding: "8px 20px",
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="body1">
                    Your email ID is <strong>{emailInfo.email}.</strong>
                  </Typography>
                  <Button
                    variant="text"
                    onClick={handleChangeEmail}
                    sx={{
                      textTransform: "none",
                      p: 0,
                      color: "#0065FF",
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "16.41px",
                    }}
                  >
                    Change
                  </Button>
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, fontWeight: "bold" }}
                >
                  Recent queries
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "16px",
                        lineHeight: "18.75px",
                        fontWeight: "400px",
                      }}
                    >
                      Ticket ID <strong>#13666563</strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: "#00A3BF",
                        fontWeight: "700",
                        fontSize: "14px",
                        lineHeight: "16.41px",
                        letterSpacing: "0.016em",
                        backgroundColor: "#E6FCFF",
                        padding: "4px 8px",
                        borderRadius: "100px",
                      }}
                    >
                      Processing
                    </Typography>
                  </Box>
                  <Grid container spacing={{ xs: 6, md: 1 }} sx={{ mt: "20px" }}>
                    <Grid item xs={6}>
                      <Typography variant="caption">Raised on</Typography>
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: {xs:'12px',md:"14px",},
                          lineHeight: "16.41px",
                          letterSpacing: "0.016em",
                        }}
                      >
                        Pay_IAJhC1UiJi7P8
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" >Created on</Typography>
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: {xs:'12px',md:"14px",},
                          lineHeight: "16.41px",
                          letterSpacing: "0.016em",
                        }}
                      >
                        Nov 18, 2024, 10:10 am
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      mt: 2.4,
                      backgroundColor: "#F4F5F7",
                      padding: "12px",
                      borderRadius: "8px",
                      color: "#253858",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: "700", fontSize: "16px" }}
                    >
                      Description:
                    </Typography>{" "}
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                      }}
                    >
                      (Customer) Multiple deductions for a single order
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2.4,
                      cursor: "pointer",
                      color: "#25385899",
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
                    onClick={handleEscalate}
                  >
                    Awaiting for quick resolution?{" "}
                    <span
                      style={{
                        fontWeight: "500",
                        color: "#0065FF",
                        cursor: "pointer",
                      }}
                    >
                      Escalate this query
                    </span>
                  </Typography>
                </Paper>
                <Typography
                  align="left"
                  sx={{
                    color: "#25385899",
                    fontSize: "14px",
                    lineHeight: "20px",
                    marginTop: "20px",
                    textAlign: { xs: "left", sm: "center" },
                  }}
                >
                  Waiting to get back deducted money?
                  <Box sx={{ display: { xs: "block", sm: "inline" } }}>
                    <Link
                      to="/customer"
                      style={{
                        color: "#0065FF",
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "20px",
                        letterSpacing: "0.0014em",
                      }}
                    >
                      Track payment
                    </Link>
                  </Box>
                </Typography>
              </Paper>
            ) : (
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  mb: 3,
                  maxWidth: { xs: "100%", md: "700px" },
                  width: "100%",
                  margin: "auto",
                  borderRadius: "20px",
                  boxShadow: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2.4,
                    backgroundColor: "#EBF3FF",
                    padding: "8px 20px",
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="body1">
                    Your email ID is <strong>{emailInfo.email}.</strong>
                  </Typography>
                  <Button
                    variant="text"
                    onClick={handleChangeEmail}
                    sx={{
                      textTransform: "none",
                      p: 0,
                      color: "#0065FF",
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "16.41px",
                    }}
                  >
                    Change
                  </Button>
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, fontWeight: "700", fontSize: "18px" }}
                >
                  Recent queries
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "16px",
                      lineHeight: "18.75px",
                      fontWeight: "400px",
                    }}
                  >
                    Ticket ID <strong>#13666563</strong>
                  </Typography>
                  <Grid container spacing={{ xs: 6, md: 1 }} sx={{ mt: "20px" }}>
                    <Grid item xs={6}>
                      <Typography variant="caption">Raised on</Typography>
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: {xs:'12px',md:"14px",},
                          lineHeight: "16.41px",
                          letterSpacing: "0.016em",
                        }}
                      >
                        Pay_IAJhC1UiJi7P8
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption">Created on</Typography>
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: {xs:'12px',md:"14px",},
                          lineHeight: "16.41px",
                          letterSpacing: "0.016em",
                        }}
                      >
                        Nov 18, 2024, 10:10 am
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
                <form onSubmit={handleSubmit}>
                  <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                    <FormLabel
                      component="legend"
                      sx={{
                        mb: 1,
                        fontSize: "16px",
                        fontWeight: "500",
                        lineHeight: "24px",
                        color: "#253858",
                      }}
                    >
                      Please tell us why you're escalating this issue.
                    </FormLabel>
                    <RadioGroup name="escalation_reason">
                      <FormControlLabel
                        value="not_satisfied"
                        control={<Radio />}
                        label="I'm not satisfied with the previous response."
                      />
                      <FormControlLabel
                        value="no_reply"
                        control={<Radio />}
                        label="I haven't received a reply yet."
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    multiline
                    minRows={4}
                    fullWidth
                    placeholder="Write a brief description of your complaint..."
                    sx={{ mb: 2, color: "#5E6C84" }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.5,
                      backgroundColor: "#3965FB",
                      borderRadius: "8px",
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "18.75px",
                    }}
                  >
                    Submit
                  </Button>
                  {showSuccessModal && (
  <Dialog
  open={showSuccessModal}
  onClose={() => setShowSuccessModal(false)}
  PaperProps={{
    sx: {
      borderRadius: '20px',
      padding: '20px',
      textAlign: 'center',
      maxWidth:{xs:'300px',md: '400px'},
      maxHeight:'400px',
      display:'flex',
      justifyContent:'center',
    alignItems:'center',
    marginTop:{xs:'-20%',md:'-400px'}
    },
  }}
>
    <DialogContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <img 
          src="./Icons/sent.gif" 
          alt="Success" 
          style={{ width: '150px', height: '150px' }} 
        />
      </Box>
      <DialogContentText sx={{ 
        fontSize: '18px', 
        color: '#253858',
        fontWeight: 500,
        mb: 2
      }}>
        Your response has been submitted.
      </DialogContentText>
      <Typography variant="body2" sx={{ color: '#5E6C84' }}>
        Redirecting to home page...
      </Typography>
    </DialogContent>
  </Dialog>
)}
                </form>
                <Typography
                  align="left"
                  sx={{
                    color: "#25385899",
                    fontSize: "14px",
                    lineHeight: "20px",
                    marginTop: "20px",
                    textAlign: { xs: "left", sm: "center" },
                  }}
                >
                  Waiting to get back deducted money?
                  <Box sx={{ display: { xs: "block", sm: "inline" } }}>
                    <Link
                      to="/customer"
                      style={{
                        color: "#0065FF",
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "20px",
                        letterSpacing: "0.0014em",
                      }}
                    >
                      Track payment
                    </Link>
                  </Box>
                </Typography>
              </Paper>
            )
          ) : (
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mb: 3,
                maxWidth: { xs: "100%", md: "700px" },
                width: "100%",
                margin: "auto",
                borderRadius: "20px",
                boxShadow: "none",
                textAlign: { xs: "center" },
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="./Icons/Error-Notfound.svg"
                  alt="Not found"
                  style={{ width: 80 }}
                />
              </Box>
              <Typography sx={{ mb: 1, fontWeight: 700 }}>
                No existing queries found!
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                It looks like there are no existing queries for{" "}
                <strong>{emailInfo.email}.</strong> Please check the email
                address or try a different one.
              </Typography>
              <Box sx={{ borderTop: "1px solid #ccc", my: 2 }} />
              <Typography
                align="left"
                sx={{
                  color: "#25385899",
                  fontSize: "14px",
                  lineHeight: "20px",
                  marginTop: "20px",
                  textAlign: { xs: "left", sm: "center" },
                }}
              >
                Waiting to get back deducted money?
                <Box sx={{ display: { xs: "block", sm: "inline" } }}>
                  <Link
                    to="/customer"
                    style={{
                      color: "#0065FF",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "20px",
                      letterSpacing: "0.0014em",
                    }}
                  >
                    Track payment
                  </Link>
                </Box>
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
      <FAQSection />
    </Box>
  );
};

export default CheckYourQuery;
