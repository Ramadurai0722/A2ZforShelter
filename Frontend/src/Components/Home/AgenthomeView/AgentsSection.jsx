import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Avatar, Grid, CircularProgress, Snackbar, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import './Agentsection.css';

function AgentsSection() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setSnackbarMessage("Please log in");
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${config.apiURL}/agentRoute/GetAgent`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgents(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleAgentClick = (agentId) => {
    navigate(`/agents/${agentId}`);
  };

  if (loading) return <CircularProgress />;

  if (error) {
    return (
      <Snackbar open={true} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          Error: {error}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <Box style={{ padding: '20px 10px' }}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center">
          <Typography variant="h5" gutterBottom>
            1000K+ Exclusive Agents
          </Typography>
        </Box>
        <br />
        <Grid container spacing={4} justifyContent="center"> 
          {agents.slice(0, 5).map((agent) => (
            <Grid item xs={12} sm={4} key={agent._id}>
              <Box
                onClick={() => handleAgentClick(agent._id)}
                className="agent-card"
                style={{ cursor: 'pointer', textAlign: 'center' }} // Inline style for centering
              >
                <Avatar alt={`${agent.firstName} ${agent.lastName}`} src={`${config.apiURL}/${agent.images[0]}`} sx={{ width: 100, height: 100 }} />
                <Typography variant="body1" mt={2}>{agent.firstName} {agent.lastName}</Typography>
              </Box>
            </Grid>
          ))}
          {agents.length > 5 && (
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" flexDirection="column" className="agent-card">
                <Typography variant="body1" mt={2} style={{ textAlign: 'center' }}>
                  View more agents
                </Typography>
                <Button variant="outlined" onClick={() => navigate('/all-agents')} style={{ marginTop: '10px' }}>
                  View More
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AgentsSection;
