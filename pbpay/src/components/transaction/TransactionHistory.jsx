import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../common/Nav';
import FAQSection from '../common/FAQSection';

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


const TransactionHistory = ({ phoneNumber }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [paymentType, setPaymentType] = useState('all');
  const [merchantName, setMerchantName] = useState('all');
  const [paymentAmount, setPaymentAmount] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleSearch = () => {
    setSearchQuery(searchInput);
    setPage(1);
  };

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
  };

  const filterByDate = (transactionDate) => {
    const now = new Date();
    if (dateFilter === 'all') return true;

    if (dateFilter === 'today') {
      return transactionDate.toDateString() === now.toDateString();
    } else if (dateFilter === 'this_week') {
      const firstDayOfWeek = new Date(now);
      firstDayOfWeek.setDate(now.getDate() - now.getDay());
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      return transactionDate >= firstDayOfWeek && transactionDate <= lastDayOfWeek;
    } else if (dateFilter === 'this_month') {
      return (
        transactionDate.getMonth() === now.getMonth() &&
        transactionDate.getFullYear() === now.getFullYear()
      );
    }
    return true;
  };

  const filteredTransactions = mockTransactions.filter((transaction) => {
    return (
      transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (paymentType === 'all' || transaction.type === paymentType) &&
      (merchantName === 'all' || transaction.merchant === merchantName) &&
      (paymentAmount === 'all' ||
        (paymentAmount === '0-1000' && transaction.amount <= 1000) ||
        (paymentAmount === '1000-5000' &&
          transaction.amount > 1000 &&
          transaction.amount <= 5000) ||
        (paymentAmount === '5000-10000' &&
          transaction.amount > 5000 &&
          transaction.amount <= 10000) ||
        (paymentAmount === '10000-50000' &&
          transaction.amount > 10000 &&
          transaction.amount <= 50000) ||
        (paymentAmount === '50000+' && transaction.amount > 50000)) &&
      filterByDate(transaction.date)
    );
  });

  const [showAllCards, setShowAllCards] = useState(false);
  const transactionsToShow =
    isMobile && !showAllCards
      ? filteredTransactions.slice(0, 3)
      : filteredTransactions;

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleChangeEmail = () => {
    navigate('/customer');
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #E9F7FF, #DDEFFF, #FFFFFF)',
        minHeight: '100vh'
      }}
    >
      <Nav />

      <Box
        sx={{
          px: { xs: '16px', md: '70px' },
          pt: { xs: '80px', md: '32px' }
        }}
      >
        <Box
          sx={{
            fontWeight: 700,
            fontSize: { xs: '20px', md: '32px' },
            lineHeight: '42px',
            color: '#253858',
          }}
        >
          Payment status
        </Box>

        <Box
          sx={{
            maxWidth: '453px',
            mt: '8px',
            fontWeight: 400,
            lineHeight: '24px',
            fontSize: '16px',
            letterSpacing: '0.0016em',
            color: '#25385899'
          }}
        >
          View transaction history of the last 6 months for{' '}
          <span style={{ fontWeight: '700', color: '#253858' }}>{phoneNumber}</span>{' '}
          <button
            style={{
              fontWeight: 500,
              color: '#0065FF',
              cursor: 'pointer',
              fontSize: '14px',
              lineHeight: '16.41px',
              letterSpacing: '0.0014em',
              background: 'none',
              border: 'none',
              paddingLeft: '5px'
            }}
            onClick={handleChangeEmail}
          >
            Change
          </button>
        </Box>
        <Box sx={{ mt:{xs:5,sm:3,md:-7, lg:-7}}}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: { xs: '100%', sm: '520px' },
                height: '48px',
                marginBottom:'20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                p: '12px 16px',
                position: 'relative'
              }}
            >
              <TextField
                placeholder={
                  isMobile
                    ? 'Search by transaction Id'
                    : 'Search by transaction ID, merchant name & date'
                }
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                sx={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '16.41px',
                  letterSpacing: '0.016em',
                  '& fieldset': { border: 'none' }
                }}
              />
              <Button
                onClick={handleSearch}
                sx={{
                  backgroundColor: '#E8F1FF',
                  color: '#0065FF',
                  px: 2,
                  borderRadius: 2,
                  height: '40px',
                  minWidth: '82px',
                  position: 'absolute',
                  right: '4px',
                  top: '4px',
                  textTransform: 'capitalize'
                }}
                startIcon={<SearchIcon sx={{ color: '#0065FF' }} />}
              >
                {isMobile ? '' : 'Search'}
              </Button>
            </Box>
          </Box>

          <Grid
            container
            spacing={2}
            sx={{
              flexWrap: 'nowrap',
              overflowX: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
              mb: 3
            }}
          >
            <Grid item xs={3} sm={2}>
              <FormControl fullWidth>
                <Select
                  value={dateFilter}
                  onChange={(e) => {
                    setDateFilter(e.target.value);
                    setPage(1);
                  }}
                  sx={{
                    borderRadius: '38px',
                    border: '1px solid #B3BAC5',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    height: '36px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <MenuItem value="all">Date</MenuItem>
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="this_week">This Week</MenuItem>
                  <MenuItem value="this_month">This Month</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3} sm={2}>
              <FormControl fullWidth>
                <Select
                  value={merchantName}
                  onChange={(e) => {
                    setMerchantName(e.target.value);
                    setPage(1);
                  }}
                  sx={{
                    borderRadius: '38px',
                    border: '1px solid #B3BAC5',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    height: '36px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <MenuItem value="all">Merchant name</MenuItem>
                  {Array.from(
                    new Set(mockTransactions.map((txn) => txn.merchant))
                  ).map((merchant, index) => (
                    <MenuItem key={index} value={merchant}>
                      {merchant}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3} sm={2}>
              <FormControl fullWidth>
                <Select
                  value={paymentAmount}
                  onChange={(e) => {
                    setPaymentAmount(e.target.value);
                    setPage(1);
                  }}
                  sx={{
                    borderRadius: '38px',
                    border: '1px solid #B3BAC5',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    height: '36px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <MenuItem value="all">Payment amount</MenuItem>
                  <MenuItem value="0-1000">₹0 - ₹1000</MenuItem>
                  <MenuItem value="1000-5000">₹1000 - ₹5000</MenuItem>
                  <MenuItem value="5000-10000">₹5000 - ₹10000</MenuItem>
                  <MenuItem value="10000-50000">₹10000 - ₹50000</MenuItem>
                  <MenuItem value="50000+">₹50000+</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3} sm={2}>
              <FormControl fullWidth>
                <Select
                  value={paymentType}
                  onChange={(e) => {
                    setPaymentType(e.target.value);
                    setPage(1);
                  }}
                  sx={{
                    borderRadius: '38px',
                    border: '1px solid #B3BAC5',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    height: '36px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <MenuItem value="all">Payment type</MenuItem>
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="Card">Card</MenuItem>
                  <MenuItem value="Net Banking">Net Banking</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        {filteredTransactions.length > 0 ? (
          <>
            {isMobile ? (
              <>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: 2,
                    width: '100%',
                    minHeight: '400px'
                  }}
                >
                  {transactionsToShow.map((transaction) => (
                    <Link
                      to={`/transaction-details/${transaction.id}`}
                      key={transaction.id}
                      style={{ textDecoration: 'none' }}
                    >
                      <Card
                        sx={{
                          width: '100%',
                          borderRadius: '8px',
                          boxShadow: 'none'
                        }}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                              <Avatar
                                src={transaction.logo}
                                sx={{ width: 48, height: 48 }}
                              />
                              <Typography
                                sx={{
                                  fontSize: '16px',
                                  fontWeight: 400,
                                  lineHeight: '24px',
                                  color: '#253858'
                                }}
                              >
                                {transaction.merchant}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                gap: 0.5
                              }}
                            >
                              <Chip
                                label={transaction.status}
                                sx={{
                                  height: '22px',
                                  borderRadius: '100px',
                                  backgroundColor:
                                    transaction.status === 'Success'
                                      ? '#36B37E33'
                                      : transaction.status === 'Pending'
                                      ? '#FFBF0033'
                                      : transaction.status === 'Rejected'
                                      ? '#FF4D4D33'
                                      : '#F0F0F0',
                                  color:
                                    transaction.status === 'Success'
                                      ? '#00875A'
                                      : transaction.status === 'Pending'
                                      ? '#FFBF00'
                                      : transaction.status === 'Rejected'
                                      ? '#FF4D4D'
                                      : '#000000',
                                  fontWeight: 700,
                                  fontSize: '12px',
                                  letterSpacing: '0.0016em'
                                }}
                              />
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontSize: '16px',
                                  color: '#000000',
                                  margin:'auto'
                                }}
                              >
                                ₹{transaction.amount}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                        <Box
                          sx={{
                            backgroundColor: '#F4F5F7',
                            borderTop: '1px dashed #DFE1E6',
                            p: 1.5
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: '14px',
                              lineHeight: '20px',
                              color: '#253858'
                            }}
                          >
                            {transaction.type} • {transaction.transactionId}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 400,
                              fontSize: '14px',
                              lineHeight: '20px',
                              color: '#253858',
                              opacity: 0.6
                            }}
                          >
                            {transaction.date.toLocaleDateString()} •{' '}
                            {transaction.date.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Typography>
                        </Box>
                      </Card>
                    </Link>
                  ))}
                </Box>

                {!showAllCards && filteredTransactions.length > 3 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                      onClick={() => setShowAllCards(true)}
                      sx={{
                        backgroundColor: '#E8F1FF',
                        color: '#0065FF',
                        px: 2,
                        borderRadius: 2,
                        height: 40,
                        width: '100%',
                        textTransform: 'capitalize'
                      }}
                    >
                      Show More
                    </Button>
                  </Box>
                )}
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                    gap: 3
                  }}
                >
                  {filteredTransactions
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((transaction) => (
                      <Link
                        to={`/transaction-details/${transaction.id}`}
                        key={transaction.id}
                        style={{ textDecoration: 'none' }}
                      >
                        <Card
                          sx={{
                            width: '100%',
                            borderRadius: '20px',
                            boxShadow: 'none',
                            height: 'auto'
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                              }}
                            >
                              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                                <Avatar
                                  src={transaction.logo}
                                  sx={{ width: 48, height: 48 }}
                                />
                                <Typography
                                  sx={{
                                    fontSize: '16px',
                                    fontWeight: 400,
                                    lineHeight: '24px',
                                    color: '#253858',
                                    maxWidth:'300px'
                                  }}
                                >
                                  {transaction.merchant}
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-end',
                                  gap: 0.5
                                }}
                              >
                                <Chip
                                  label={transaction.status}
                                  sx={{
                                    height: '22px',
                                    borderRadius: '100px',
                                    backgroundColor:
                                      transaction.status === 'Success'
                                        ? '#36B37E33'
                                        : transaction.status === 'Pending'
                                        ? '#FFBF0033'
                                        : transaction.status === 'Rejected'
                                        ? '#FF4D4D33'
                                        : '#F0F0F0',
                                    color:
                                      transaction.status === 'Success'
                                        ? '#00875A'
                                        : transaction.status === 'Pending'
                                        ? '#FFBF00'
                                        : transaction.status === 'Rejected'
                                        ? '#FF4D4D'
                                        : '#000000',
                                    fontWeight: 700,
                                    fontSize: '12px',
                                    letterSpacing: '0.0016em'
                                  }}
                                />
                                <Typography
                                  sx={{
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    lineHeight: '26px',
                                    color: '#000000',
                                    margin:'auto',
                                  }}
                                >
                                  ₹{transaction.amount}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                          <Box
                            sx={{
                              backgroundColor: '#F4F5F7',
                              borderTop: '1px dashed #DFE1E6',
                              p: 1.5
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 500,
                                fontSize: '14px',
                                lineHeight: '20px',
                                color: '#253858'
                              }}
                            >
                              {transaction.type} • {transaction.transactionId}
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '20px',
                                color: '#253858',
                                opacity: 0.6
                              }}
                            >
                              {transaction.date.toLocaleDateString()} •{' '}
                              {transaction.date.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </Typography>
                          </Box>
                        </Card>
                      </Link>
                    ))}
                </Box>

                {totalPages > 1 && (
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1 }}
                  >
                    <Button
                      disabled={page === 1}
                      onClick={() => handlePageClick(page - 1)}
                      sx={{
                        backgroundColor: '#FFFFFF',
                        color: '#0065FF',
                        minWidth: 60,
                        height: 32,
                        fontSize: '12px',
                        lineHeight: '14.06px',
                        fontWeight: 500,
                        borderRadius: '8px',
                        textTransform: 'capitalize'
                      }}
                    >
                      Back
                    </Button>
                    {visiblePages.map((num) => (
                      <Button
                        key={num}
                        onClick={() => handlePageClick(num)}
                        sx={{
                          backgroundColor: num === page ? '#E8F1FF' : '#FFFFFF',
                          color: num === page ? '#0065FF' : '#253858',
                          minWidth: 32,
                          height: 32,
                          fontSize: '12px',
                          fontWeight: 500,
                          borderRadius: '8px',
                          textAlign: 'center',
                          textTransform: 'capitalize'
                        }}
                      >
                        {num}
                      </Button>
                    ))}
                    <Button
                      disabled={page === totalPages}
                      onClick={() => handlePageClick(page + 1)}
                      sx={{
                        backgroundColor: '#FFFFFF',
                        color: '#0065FF',
                        minWidth: 60,
                        height: 32,
                        fontSize: '12px',
                        lineHeight: '14.06px',
                        fontWeight: 500,
                        borderRadius: '8px',
                        textTransform: 'capitalize'
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                )}
              </>
            )}
          </>
        ) : (
          <Typography
            sx={{
              textAlign: 'center',
              pt: '150px',
              pb: '250px',
              color: '#25385899',
              fontWeight: 500,
              fontSize: '18px'
            }}
          >
            Oops! Not found.
          </Typography>
        )}
      </Box>

      <FAQSection />
    </Box>
  );
};

export default TransactionHistory;
