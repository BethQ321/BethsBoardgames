import { Box, Button, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom';


const FeaturedProducts = () => {
  const navigate = useNavigate();
  const handleClick = (event) => {
    navigate(`/products?category=${event.target.name}`);
  };

  return (
    <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        flexDirection: 'row', 
        width: "100%" 
      }}>
    
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: "40rem",
          width: "50%",
          backgroundImage: 'url(/public/assets/generic-boardgame-background-cropped.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Stack direction="column" spacing={3}
          sx={{
            width: '30%',
            display: 'flex',
          }}
        >
          <Button variant="contained" name="All Games" onClick={handleClick} sx={{ backgroundColor: 'white' }}>All Games</Button>
          <Button variant="contained" name="Board Games" onClick={handleClick} sx={{ backgroundColor: 'white' }}>Board Games</Button>
          <Button variant="contained" name="Card Games" onClick={handleClick} sx={{ backgroundColor: 'white' }}>Card Games</Button>
        </Stack>
      </Box>      
      <Box 
        sx={{             
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white', 
          width: '50%',
          backgroundColor: 'accentBlue.main',
          fontWeight: 'bold', 
          zIndex: 4,
          height: "40rem"
        }}>
        <Box
          component="img"
          sx={{
              justifyContent: 'right',
              pr: 0,
              width: "80%",
              zIndex: 2,
              position: 'relative',
              right: 0,
          }}
          alt="gamme store logo"
          src="/public/assets/logo-11a.png"        
        >          
        </Box>
        <Divider
          variant='middle'
          flexItem
          sx={{
            height: '4px',
            color: 'white', 
            backgroundColor: 'white',
            mt: '2em',
            mb: '2em',
            ml: '5em',
            mr: '5em'
          }}
        >
        </Divider>
        <Typography variant='h3' sx={{ fontWeight: 900 }}>
          where gamers come to play
        </Typography>
      </Box>
    </Box>
  )
}

export default FeaturedProducts;
