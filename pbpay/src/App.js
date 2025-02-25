import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grievance from "./components/support/Grievance";
import CustomerForm from "./components/customer/CustomerForm";
import TransactionHistory from "./components/transaction/TransactionHistory";
import TransactionDetails from "./components/transaction/TransactionDetails";
import CheckYourQuery from "./components/queryStatus/CheckYourQuery";
import TicketForm from "./components/ticketing/TicketForm";
import TicketPage from "./components/ticketing/TicketPage"
import Loader from "./components/loader/Loader";
import "./App.css";

const theme = createTheme();

const App = () => {
  const [appLoading, setAppLoading] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setAppLoading(false);
  //   }, 3500);
  //   return () => clearTimeout(timer);
  // }, []);

  // if (appLoading) {
  //   return <Loader />;
  // }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Grievance />} />
            <Route path="/customer" element={<CustomerForm />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route path="/transaction-details/:id" element={<TransactionDetails />} />
            <Route path="/check-query" element={<CheckYourQuery />} />
            <Route path="/ticket" element={<TicketForm />} />
            <Route path="/ticket-page" element={<TicketPage/>}/>
          </Routes>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;