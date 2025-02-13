import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "You can return items within 30 days for a full refund.",
    },
    {
      question: "How do I track my transaction?",
      answer: "Lorem",
    },
    {
      question: "What payment methods do you accept?",
      answer: "Lorem.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box
      
    >
      <Box
        sx={{
          px: { xs: "16px", sm: "40px", md: "70px", },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: { xs: "10px", md: "80px" },
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            marginBottom: "24px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "45px",
            width: "100%",
            maxWidth: "1280px",
          }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width:{xs:'100%',sm:'100%',md:'100%', lg: "90%", xl:'80%'},
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAr1JREFUSEu9ll1IFFEYht/37PqDN5WilhFKSlnelBkFkVKGFnQRQbJkiZtLGdJl99Nt16GIm0nmD14FgRAWoVEQ6E1iVIuGidGm2UWJxe7OFzux26zuujOTNjAMM2e+9znfOd/PIRxcMojSqBk9mLZrTrsGMoR8wP0GgA53eD/P46sdDfvAwewBUDwGRNhPz8/GTQPKYM5ZgI8QnaZE19S469iwPGIVatlDGdq2BZHwOwEKzTwB5unKLmfDwg8rUOvAga1+gC1JRYlOer61bhhQ+vKrhfqo2bOYeGxlIaqGjQtj6aDreii9RXtB/RQotwDkJexdjPT3uQihBnd4hJ7F96nACUC5X1gApeoA1gqklsCuqF7sinmY7p3AHMCnoDxBRB9hU/CL2QbyYOdRQPkBVKRbEofjU9DRzKa5ccND6S2+KYLbJCACbMYTwA1enr3zB6hBoXT3MwirHXqwvhllDNMzJ6hBj++h+CtyJSM0CUjRBkM/MpR5kL6pJaP+msWld18lIvISZFb8+9poTLRab1zwCyKH6X07mRA0CdB7FReF6IuXrlSCFr4TaKR3qt+snzQPpedAO0Su/9vSSju9r9tWayQHdh7KELceAFHsDMoZhljOaxMhS0Ajcu9WTYCsNNIk1hxSpc2acZnglfGqZJNNWdp0/5EAgDJHHhIB1fJqjy2gdB0LgihwGKRB+l5stwXUu46vAMhOGa2r24V5ZsCKuvo8xzJQNE1J0WhkVaNN0yxMex0lfapxUdN0S0Ej/vpciYSTHI4YFXhIQZ8RWET0PHMOELVG2OXOo++xUV3S52HH6RJR8sHkYQCQboTdPWwb/pxQKDrrdwDwCuAlUBZvyC5XCX3Ds9aAQxcyZWl5QES+K7KbrcNpO7nhcceZkzqkGVBZSgUv2cpDR+lgwcjyIcqClqVf/jvwN9JIKSxcwR3+AAAAAElFTkSuQmCC"
                  alt="FAQ Icon"
                  width={28}
                  height={28}
                />
                <Typography sx={{ fontWeight: 700, fontSize: "24px", lineHeight: "32px" }}>
                  Popular questions
                </Typography>
              </Box>

              <Box sx={{ color: "#0065FF", fontWeight: 500, fontSize: "14px" }}>
                <Link
                  to="#"
                  onClick={handleModalOpen}
                  sx={{
                    color: "#0065FF",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "16.41px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  View all FAQs
                </Link>
              </Box>
            </Box>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  borderRadius: "8px",
                  boxShadow: "none",
                  marginBottom: isMobile ? 0 : "12px",
                  maxWidth:{xs:'95%', sm:'100%',md:'655px'},
                  width: "100%",
                }}
                expanded={openIndex === index}
                onChange={() => toggleFAQ(index)}
              >
                <AccordionSummary
                  expandIcon={
                    <img
                      src={openIndex === index ? "/Icons/collapse.svg" : "/Icons/Expand.svg"}
                      alt="Expand/Collapse Icon"
                    />
                  }
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                  sx={{
                    border: "1px solid #DFE1E6",
                    borderRadius: "10px",
                    padding: "16px",
                    textAlign: "left",
                    color: "#253858",
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    sx={{
                      maxWidth: "328px",
                      paddingLeft: "0px",
                      fontWeight: 700,
                      fontSize: { xs: "14px", md: "16px" },
                      lineHeight: "24px",
                      alignItems: "left",
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: "16px",
                    color: "#253858",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#253858",
                      letterSpacing: "0.0014em",
                      lineHeight: "20px",
                      borderRadius: "8px",
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: { xs: "none",sm:'none', md: "block", },
              // "@media (max-width:900px)": { display: "none" },
              textAlign: "center",
              marginTop: { sm: "40px", md: "0" },
            }}
          >
            <img
              src="/Icons/Faq_svg.svg"
              alt="Faq"
              style={{
                maxWidth: "343px",
                height: "auto",
                marginTop: "60px",
              }}
            />
          </Grid>
        </Grid>
      </Box>

<Dialog 
  open={openModal} 
  onClose={handleModalClose} 
  maxWidth="lg" 
  fullWidth 
  sx={{ 
    zIndex: 999, 
    '& .MuiDialog-container': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin:'200px auto'
    }
  }}
>
  <DialogTitle sx={{ backgroundColor: "#253858", color: "#fff", textAlign: "center", padding: "10px 0"}}>
    All FAQs
  </DialogTitle>
  <DialogContent sx={{ padding: "0" }}>
    <Box sx={{ padding: "16px", backgroundColor: "#F4F5F7" }}>
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          sx={{
            borderRadius: "8px",
            boxShadow: "none",
            marginBottom: "12px",
            width: "100%",
          }}
          expanded={openIndex === index}
          onChange={() => toggleFAQ(index)}
        >
          <AccordionSummary
            expandIcon={
              <img
                src={openIndex === index ? "/Icons/collapse.svg" : "/Icons/Expand.svg"}
                alt="Expand/Collapse Icon"
              />
            }
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              border: "1px solid #DFE1E6",
              borderRadius: "10px",
              padding: "16px",
              textAlign: "left",
              color: "#253858",
              fontWeight: 700,
            }}
          >
            <Typography
              sx={{
                maxWidth: "328px",
                paddingLeft: "0px",
                fontWeight: 700,
                fontSize: { xs: "14px", md: "16px" },
                lineHeight: "24px",
              }}
            >
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "16px",
              color: "#253858",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#253858",
                letterSpacing: "0.0014em",
                lineHeight: "20px",
                borderRadius: "8px",
              }}
            >
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  </DialogContent>
  <DialogActions sx={{ backgroundColor: "#253858" }}>
    <Button
      onClick={handleModalClose}
      sx={{
        color: "#fff",
        fontWeight: 600,
        "&:hover": { backgroundColor: "#2a4b8b" },
      }}
    >
      Close
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default FAQSection;
