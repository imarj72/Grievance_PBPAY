import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Card,
  CardContent,
  Chip,
  Avatar,
  FormHelperText
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import Nav from "../common/Nav";
import FAQSection from "../common/FAQSection";

const TicketForm = () => {
  const navigate = useNavigate();

  const [reason, setReason] = useState("");
  const [issue, setIssue] = useState("");
  const [complaintId, setComplaintId] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [reasonError, setReasonError] = useState(false);
  const [issueError, setIssueError] = useState(false);
  const [complaintIdError, setComplaintIdError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const validateEmail = (val) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(val.trim());
  };


  const validatePhone = (val) => {
    if (!val.trim()) return false;
    const phonePattern = /^[0-9]{6,15}$/;
    return phonePattern.test(val.trim());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setReasonError(false);
    setIssueError(false);
    setComplaintIdError(false);
    setNameError(false);
    setEmailError(false);
    setMobileError(false);

    let hasError = false;

    if (!reason) {
      setReasonError(true);
      hasError = true;
    }
    if (!issue) {
      setIssueError(true);
      hasError = true;
    }
    if (!complaintId.trim()) {
      setComplaintIdError(true);
      hasError = true;
    }
    if (!name.trim()) {
      setNameError(true);
      hasError = true;
    }
    if (!validateEmail(email)) {
      setEmailError(true);
      hasError = true;
    }
    if (!validatePhone(mobile)) {
      setMobileError(true);
      hasError = true;
    }

    if (hasError) return; 

    const formData = new FormData();
    formData.append("reason", reason);
    formData.append("issue", issue);
    formData.append("complaintId", complaintId);
    formData.append("description", description);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      // const response = await fetch("/api/ticket", { method: "POST", body: formData });
      // if (response.ok) navigate("/ticket-page");
      // else console.error("Submission failed.");

      navigate("/ticket-page");
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  const logo = "/path-to-blinkit-logo.png";
  const merchant = "Blinkit";
  const status = "Success";
  const amount = 290;
  const type = "UPI";
  const transactionId = "Pay_IAJhC1UiJi7P8";
  const date = new Date("2024-11-18T10:10:00");

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
          px: { xs: "16px", sm: "40px", md: "70px" }, 
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            mt: "55px",
            mb: "24px",
            maxWidth: "1280px",
            width: "100%"
          }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: { xs: "none", sm: "block" } }}
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
                borderRadius: "8px",
                position: "relative"
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={logo} sx={{ width: 48, height: 48, mr: 2 }} />
                  <Typography
                    sx={{ fontSize: "16px", fontWeight: 400, color: "#253858" }}
                  >
                    {merchant}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: "auto"
                    }}
                  >
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
                      sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#000000"
                      }}
                    >
                      ₹{amount}
                    </Typography>
                    <Box
                      // sx={{
                      //   width: 0,
                      //   height: 0,
                      //   borderLeft: "8px solid transparent",
                      //   borderRight: "8px solid transparent",
                      //   borderTop: "12px solid #000000",
                      //   ml: 1,
                      //   rotate:'270deg',
                      // }}
                    />
                  </Box>
                </Box>
              </CardContent>
              <Box
                sx={{
                  backgroundColor: "#F4F5F7",
                  border: "2px solid #FFFFFF",
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
                  {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <IconButton onClick={handleGoBack} sx={{ p: 0, mr: 1 }}>
                <img src="/Icons/Goback.svg" alt="Go Back" />
              </IconButton>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: "#253858"
                }}
              >
                Raise your Concern
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                backgroundColor: "white",
                p: 2,
                borderRadius: "20px",
                boxShadow: "none",
                mx: "auto",
                width: { xs: "100%", md: "717px" }
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#253858",
                  mb: 1
                }}
              >
                Why did you choose to come to PB Pay?
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }} error={reasonError}>
                <InputLabel>Select reason</InputLabel>
                <Select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  label="Select reason"
                >
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                  <MenuItem value="option3">Option 3</MenuItem>
                </Select>
                {reasonError && (
                  <FormHelperText>Please select a reason.</FormHelperText>
                )}
              </FormControl>

              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#253858",
                  mb: 1
                }}
              >
                What issue are you facing with the transaction?
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }} error={issueError}>
                <InputLabel>Issue</InputLabel>
                <Select
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  label="Select issue"
                >
                  <MenuItem value="issue1">Issue 1</MenuItem>
                  <MenuItem value="issue2">Issue 2</MenuItem>
                  <MenuItem value="issue3">Issue 3</MenuItem>
                </Select>
                {issueError && (
                  <FormHelperText>Please select an issue.</FormHelperText>
                )}
              </FormControl>

              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#253858",
                  mb: 1
                }}
              >
                Please provide Merchant complaint ID
              </Typography>
              <TextField
                label="Enter merchant complaint ID"
                variant="outlined"
                fullWidth
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
                error={complaintIdError}
                helperText={complaintIdError && "Please enter a complaint ID."}
                sx={{ mb: 2 }}
              />

              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#253858",
                  mb: 1
                }}
              >
                Already connected with Merchant? Please share a screenshot of the
                email communication
              </Typography>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  color: "#5E6C84",
                  fontWeight: 400,
                  fontSize: "16px",
                  mb: 2,
                  textTransform: "capitalize",
                  border: "1px dashed #4C9AFF"
                }}
              >
                <img src="/Icons/upload.svg" alt=""/>
                Select file to upload
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              {selectedFile && (
                <Typography
                  variant="body2"
                  sx={{ mb: 2, color: "#5E6C84", textAlign: "left" }}
                >
                  Selected file: {selectedFile.name}
                </Typography>
              )}

              <TextField
                multiline
                rows={4}
                placeholder="Write a brief description of your request"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#253858",
                  mb: 1
                }}
              >
                How do we get in touch with you?
              </Typography>
              <TextField
                label="Your full name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameError && "Please enter your name."}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email address"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError && "Please enter a valid email."}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Mobile number"
                variant="outlined"
                fullWidth
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                error={mobileError}
                helperText={
                  mobileError && "Please enter a valid phone number (digits)."
                }
                sx={{ mb: 2 }}
              />

              <Button
                type="submit"
                sx={{
                  backgroundColor: "#3965FB",
                  color: "white",
                  width: { md: "328px", xs: "100%" },
                  borderRadius: "8px",
                  p: "12px 20px",
                  textTransform: "capitalize"
                }}
              >
                Submit
              </Button>

              <Typography sx={{ fontSize: "14px", color: "#25385899", mt: 2 }}>
                Awaiting a response to an earlier query?{" "}
                <Link
                  to="/check-query"
                  style={{ color: "#0065FF", fontWeight: 500 }}
                >
                  Track Existing Query
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <FAQSection/>
    </Box>
  );
};

export default TicketForm;
