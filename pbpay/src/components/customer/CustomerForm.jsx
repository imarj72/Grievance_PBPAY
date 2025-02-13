import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  MenuItem,
  InputAdornment,
  useMediaQuery,
  Popper, 
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import Nav from "../common/Nav";
import TransactionHistory from "../transaction/TransactionHistory";
import FAQSection from "../common/FAQSection";
import Decor from "../common/Decor";

const countries = [
  { name: "United Kingdom", code: "GB", phone: 44, flag: "🇬🇧" },
  { name: "United States", code: "US", phone: 1, flag: "🇺🇸" },
  { name: "India", code: "IN", phone: 91, flag: "🇮🇳" },
  { name: "Nigeria", code: "NG", phone: 234, flag: "🇳🇬" },
  { name: "Canada", code: "CA", phone: 1, flag: "🇨🇦" },
  { name: "Australia", code: "AU", phone: 61, flag: "🇦🇺" },
  { name: "Germany", code: "DE", phone: 49, flag: "🇩🇪" },
];

const CustomerForm = () => {
  const navigate = useNavigate();
  const otpLength = 6;
  const otpRefs = useRef([]);

  const [timer, setTimer] = useState(120);
  const [otpState, setOtpState] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [otp, setOtp] = useState(Array(otpLength).fill(""));

  const [verifyOtpPage, setVerifyOtpPage] = useState(false);
  const [otpCheck, setOtpCheck] = useState(false);
  const [custForm, setCustForm] = useState(true);


  const [selectedCountry, setSelectedCountry] = useState(countries[2]);
  const [numberInfo, setNumberInfo] = useState({ number: "", submitted: false });
  const [paymentType, setPaymentType] = useState("mobile");
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const [openCountryList, setOpenCountryList] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const flagRef = useRef(null);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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


  const handleSubmit = (event) => {
    event.preventDefault();

    if (paymentType === "mobile") {
      if (numberInfo.number.trim() === "") {
        alert("Please enter your mobile number.");
        return;
      }
      if (!/^\d+$/.test(numberInfo.number.trim())) {
        alert("Please enter a valid mobile number containing digits only.");
        return;
      }
    } else if (paymentType === "transaction") {
      if (numberInfo.number.trim() === "") {
        alert("Please enter your transaction ID.");
        return;
      }
    }

    if (!recaptchaToken) {
      alert("Please complete the captcha.");
      return;
    }

    setVerifyOtpPage(true);
    setCustForm(false);
    setOtpState(true);
    setTimer(120);
    setIsResendDisabled(true);
  };

  const handleRadioChange = (event) => {
    setPaymentType(event.target.value);
    setNumberInfo({ ...numberInfo, number: "" });
  };

  const handlePhoneNumberChange = (e) => {
    setNumberInfo({ ...numberInfo, number: e.target.value });
  };

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setCountrySearch("");
    setOpenCountryList(false);
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleChange = (index, e) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < otpLength - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        otpRefs.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pastedData)) return;
    setOtp(pastedData.split(""));
    otpRefs.current[otpLength - 1].focus();
  };

  const handleVerify = () => {
    if (otp.join("").length === otpLength) {
      setOtpCheck(true);
      navigate("/transaction-history");
    } else {
      alert("Invalid OTP. Please enter a 6-digit OTP.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleVerify();
    }
  };

  const handleChangeNumber = () => {
    setVerifyOtpPage(false);
    setCustForm(true);
    setOtp(Array(otpLength).fill(""));
    setOtpState(false);
    setTimer(120);
    setIsResendDisabled(true);
  };

  return (
    <Box sx={{ background: "linear-gradient(to bottom, #E9F7FF, #DDEFFF, #FFFFFF)" }}>
      <Nav />

      <Box sx={{ px: { xs: "20px", sm: "40px", md: "70px" }, py: { xs: 1, sm: 1, md: 0.5 } }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "auto", position: "relative" }}>
          <Grid item xs={12} sm={10} md={6} lg={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "flex-start",
                gap: { xs: "8px", sm: "20px" },
                mb: { xs: 1, sm: 1 },
                width: "100%",
              }}
            >
              <Link to="/">
                <Box
                  sx={{
                    display: { xs: "none", sm: "block" },
                    cursor: "pointer",
                    p: "10px 0",
                  }}
                >
                  <img src="./Icons/Goback.svg" alt="Go Back" />
                </Box>
              </Link>

              <Typography
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2.5rem", md: "40px" },
                  lineHeight: 1.2,
                  fontWeight: 700,
                  textAlign: { xs: "center", sm: "left" },
                  flexGrow: 1,
                }}
              >
                I am a{" "}
                <span style={{ fontSize: "inherit", fontStyle: "italic" }}>customer</span>
              </Typography>
            </Box>

            {custForm ? (
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2, sm: 3 },
                  mb: { xs: 1, sm: 1 },
                  width: "100%",
                  maxWidth: { xs: "360px", sm: "580px", lg: "900px" },
                  mx: "auto",
                  borderRadius: "20px",
                  boxShadow: "none",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <Typography
                    sx={{
                      mb: 1,
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      fontWeight: 700,
                      lineHeight: "30px",
                    }}
                  >
                    Enter your phone number or transaction ID
                  </Typography>
                  <Typography
                    sx={{
                      mb: 3,
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      fontWeight: 400,
                      color: "#25385899",
                    }}
                  >
                    Check the status of payments made in the last{" "}
                    <span style={{ fontWeight: 700, color: "#253858" }}>6 months.</span>
                  </Typography>

                  <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <RadioGroup row value={paymentType} onChange={handleRadioChange}>
                      <FormControlLabel value="mobile" control={<Radio />} label="Mobile Number" />
                      <FormControlLabel value="transaction" control={<Radio />} label="Transaction ID" />
                    </RadioGroup>
                  </FormControl>

                  {paymentType === "mobile" ? (
                    <Box sx={{ mb: 2, position: "relative" }}>
                      <TextField
                        fullWidth
                        label="Mobile Number"
                        placeholder="Mobile Number"
                        value={numberInfo.number}
                        onChange={handlePhoneNumberChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Box
                                ref={flagRef}
                                onClick={() => setOpenCountryList(!openCountryList)}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  mr: 1,
                                }}
                              >
                                <img
                                  src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                                  alt={selectedCountry.name}
                                  style={{ width: 32 }}
                                />
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Popper
                        open={openCountryList}
                        anchorEl={flagRef.current}
                        placement="bottom-start"
                        style={{ zIndex: 99999 }}
                      >
                        <Paper
                          sx={{
                            mt: 1,
                            maxHeight: 200,
                            overflowY: "auto",
                            p: 1,
                            width: "100%",
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="Search country"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            variant="standard"
                            sx={{ mb: 1 }}
                          />
                          {countries
                            .filter((country) =>
                              country.name.toLowerCase().includes(countrySearch.toLowerCase())
                            )
                            .map((country) => (
                              <MenuItem key={country.code} onClick={() => handleSelect(country)}>
                                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                                  <img
                                    src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                    alt={country.name}
                                    style={{ width: 32, marginRight: 8 }}
                                  />
                                  <Typography sx={{ flexGrow: 1, fontSize: "0.9rem" }}>
                                    {country.name}
                                  </Typography>
                                  <Typography variant="body2">+{country.phone}</Typography>
                                </Box>
                              </MenuItem>
                            ))}
                        </Paper>
                      </Popper>
                    </Box>
                  ) : (
                    <Box sx={{ mb: 2 }}>
                      <TextField
                        fullWidth
                        label="Transaction ID"
                        placeholder="Enter Transaction ID"
                        value={numberInfo.number}
                        onChange={handlePhoneNumberChange}
                      />
                    </Box>
                  )}

                  <Box sx={{ my: 2, textAlign: "center" }}>
                    <ReCAPTCHA
                      sitekey="6Lc4aM0qAAAAAN24sUQkLg1Tcw4QhuyU4KI4I1kC"
                      onChange={handleRecaptchaChange}
                    />
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      mt: 2,
                      height: "48px",
                      borderRadius: "8px",
                      backgroundColor: "#3965FB",
                      fontWeight: 500,
                      fontSize: "1rem",
                      color: "#FFFFFF",
                      textTransform: "capitalize",
                      "&:hover": { backgroundColor: "#335ecc" },
                    }}
                  >
                    Get OTP
                  </Button>

                  <Typography
                    sx={{
                      mt: 2,
                      textAlign: "center",
                      fontSize: "0.875rem",
                      color: "#25385899",
                    }}
                  >
                    Awaiting a response to an earlier query?{" "}
                    <Link to="/check-query" style={{ color: "#0065FF", fontWeight: 500 }}>
                      Track Existing Query
                    </Link>
                  </Typography>
                </form>
              </Paper>
            ) : verifyOtpPage && !otpCheck ? (
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2, sm: 3 },
                  mb: { xs: 1, sm: 1 },
                  width: "100%",
                  maxWidth: { xs: "328px", sm: "580px" , lg: "900px" },
                  mx: "auto",
                  borderRadius: "20px",
                  boxShadow: "none",
                }}
              >
                <Typography
                  sx={{
                    mb: 1,
                    fontWeight: 700,
                    fontSize:{xs:'14px',md: "16px"},
                    color: "#253858",
                  }}
                >
                  6–digit OTP sent to your{" "}
                  {paymentType === "mobile" ? "mobile number" : "transaction ID"}:{" "}
                  <strong>{numberInfo.number}</strong>
                </Typography>
                <Typography
                  sx={{
                    mb: 2,
                    fontSize: "0.9rem",
                    color: "#25385899",
                  }}
                >
                  Enter OTP sent on <strong>{numberInfo.number}</strong>{" "}
                  <Button
                    variant="text"
                    onClick={handleChangeNumber}
                    sx={{
                      textTransform: "none",
                      p: 0,
                      fontWeight: 500,
                      fontSize: "0.75rem",
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
                    gap: { xs: 1, sm: 2 },
                    mb: { xs: 2, sm: 1 },
                  }}
                >
                  {otp.map((digit, index) => (
                    <TextField
                      key={index}
                      type="text"
                      value={digit}
                      onChange={(e) => handleChange(index, e)}
                      onKeyDown={(e) => handleBackspace(index, e)}
                      onPaste={handlePaste}
                      inputProps={{
                        style: {
                          textAlign: "center",
                          fontSize: "1rem",
                          fontWeight: 700,
                        },
                        maxLength: 1,
                      }}
                      inputRef={(el) => (otpRefs.current[index] = el)}
                      sx={{
                        width: { xs: "48px", sm: "56px", md: "66px" },
                        height: { xs: "48px", sm: "56px" },
                      }}
                      onKeyPress={handleKeyPress}
                    />
                  ))}
                </Box>
                <Typography
                  sx={{
                    mb: 2,
                    textAlign: "center",
                    fontSize: "0.75rem",
                    color: "#25385899",
                  }}
                >
                  Resend OTP in <strong>{formatTime(timer)}</strong>
                </Typography>
                <Button
                  onClick={handleVerify}
                  onKeyDown={handleKeyPress}
                  fullWidth
                  sx={{
                    mb: 1,
                    py: 1.5,
                    borderRadius: "8px",
                    backgroundColor: "#3965FB",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "#ffffff",
                    textTransform: "capitalize",
                    "&:hover": { backgroundColor: "#335ecc" },
                  }}
                >
                  Verify OTP
                </Button>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "0.875rem",
                    color: "#25385899",
                  }}
                >
                  Awaiting a response to an earlier query?{" "}
                  <Link to="/check-query" style={{ color: "#0065FF", fontWeight: 500 }}>
                    Track Existing Query
                  </Link>
                </Typography>
              </Paper>
            ) : otpCheck ? (
              <TransactionHistory />
            ) : null}
          </Grid>
        </Grid>
      </Box>

      <FAQSection />
    </Box>
  );
};

export default CustomerForm;
