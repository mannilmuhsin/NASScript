import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid,Button , Card, CardContent, Avatar, Paper } from "@mui/material";
// import Button from "../components/Button";
import NfcCard from "../components/NfcCard";
import { getCompanies } from "../services/apiMethods";
import nfcGif from '../assets/nfg-gif.gif';
import Footer from "../components/Footer";

const AdminHome = () => {
  const [companies, setCompanies] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        console.log(data);

        setCompanies(data);

        // Calculate total revenue
        const revenue = data.reduce((total, company) => total + company.totalCost, 0);
        setTotalRevenue(revenue);
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleCardClick = (nfccode) => {
    navigate(`/editnfc/${nfccode}`);
  };

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token2');
    // Redirect to login page
    navigate('/login');
  };


  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
     <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: '10px 16px' }}>
      <Grid item>
        <Box display="flex" alignItems="center">
          <img
            onClick={() => navigate('/')}
            src="https://nasscript.com/static/media/Nlogo_black_s.7e657e079d58d8b9380094c8b21ca57d.svg"
            className='cursor-pointer'
            alt="Nasscript Logo"
            style={{ height: '40px', width: '40px', marginRight: '10px' }}
          />
          <Typography variant="h4" sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/')}>
            NasscriptNFC
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleLogout}
          sx={{ borderRadius: '4px' }} // Optional: Customize button styles
        >
          Logout
        </Button>
      </Grid>
    </Grid>

      <Paper elevation={3} sx={{ padding: '20px', margin: '20px', textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary">
          Total Revenue
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
        ₹{totalRevenue.toFixed(2)}
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ padding: '0 16px', marginTop:'20px' }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            Company List
          </Typography>
          <Paper>
            <Box sx={{ overflowX: 'auto' }}>
              <Grid container sx={{ padding: '10px', backgroundColor: '#e0e0e0' }}>
                <Grid item xs={1}><Typography>#</Typography></Grid>
                <Grid item xs={2}><Typography>Name</Typography></Grid>
                <Grid item xs={2}><Typography>Email</Typography></Grid>
                <Grid item xs={2}><Typography>Total</Typography></Grid>
                <Grid item xs={3}><Typography>Payment Method</Typography></Grid>
                <Grid item xs={2}><Typography>Status</Typography></Grid>
              </Grid>
              {companies.map((company, index) => (
                <Grid
                  container
                  alignItems="center"
                  sx={{ padding: '10px', borderBottom: '1px solid #ccc' }}
                  key={company._id}
                >
                  <Grid item xs={1}>
                    <Typography>{index + 1}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>{company.name}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>{company.email}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>{company.totalCost} </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>{company.paymentMethod}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography color={company.paymentStatus === 'Completed' ? 'green' : 'red'}>
                      {company.paymentStatus}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" sx={{ margin: '20px 0', padding:"8px" }}>
            Company Cards
          </Typography>
          <Grid container spacing={3}>
            {companies.map((company) => (
              <Grid item xs={12} sm={6} md={3} key={company._id}>
               <div onClick={() => handleCardClick(company.nfcCode)} > <NfcCard company={company} /></div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Footer />
    </Box>
  );
};

export default AdminHome;
