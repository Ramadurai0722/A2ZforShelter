import React from 'react';
import { Box, Container, Typography, Avatar, Grid } from '@mui/material';

function AgentsSection() {
  const agents = [
    { id: 1, name: "Agent 1", image: "https://tse2.mm.bing.net/th?id=OIP.NqY3rNMnx2NXYo3KJfg43gHaHa&pid=Api&P=0&h=220" },
    { id: 2, name: "Agent 2", image: "https://tse1.mm.bing.net/th?id=OIP.y-nGyqT5AwES8oqp344z4gHaHa&pid=Api&P=0&h=220" },
    { id: 3, name: "Agent 3", image: "https://tse2.mm.bing.net/th?id=OIP.t6qAM-WTJf_-AsFK1Ko9iwHaE-&pid=Api&P=0&h=220" },
  ];

  return (
    <Box style={{ padding: '40px 0' }}>
      <Container maxWidth="lg">
        <Typography variant="h5" gutterBottom>
          1000K+ Exclusive Agents
        </Typography>
        <Grid container spacing={6}> 
          {agents.map((agent) => (
            <Grid item xs={12} sm={4} key={agent.id}>
              <Box display="flex" alignItems="center" flexDirection="column">
                <Avatar alt={agent.name} src={agent.image} sx={{ width: 100, height: 100 }} />
                <Typography variant="body1" mt={2}>{agent.name}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default AgentsSection;
