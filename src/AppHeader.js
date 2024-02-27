import { AppBar, Badge, Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useNavigate } from 'react-router-dom';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';



const AppHeader = ({ isLoggedIn, logout ,cartCount,}) => {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: "8rem" }}>
      <Toolbar>
        <Button sx={{ display: 'flex', flexDirection: 'column', pt: '1.5rem', pb: '1.5rem' }}>       
          <Box
            // className='imageButton'
            onClick={() => { navigate("/") }} 
            component="img"
            sx={{
                height: "5rem"
            }}
            alt="gamme store logo"
            src="/public/assets/logo-11a.png"
            >
          </Box>
        </Button>
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row', ml: '10vw', mr: '10vw' }}>
          <Typography
            variant="h6"
            color="text.secondary"
            align='center'
            sx={{ flexGrow: 1 }}
          >
            Board Games
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            align='center'
            sx={{ flexGrow: 1 }}
          >
            Card Games
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            align='center'
            sx={{ flexGrow: 1 }}
          >
            Sale
          </Typography>
          <Typography
            component="h1"
            variant="h6"
            color="text.secondary"
            align='center'
            sx={{ flexGrow: 1 }}
          >
            Explore Gamme
          </Typography>
        </Box>
        {isLoggedIn && (
          <>
           {/* display user profile */}
            <Tooltip title={"User profile"}>
              <IconButton
                aria-label={"user profile"}
                onClick={() => navigate("/user-profile_mui")}
                sx={{ color: 'text.secondary' }}
              >
                <AccountCircleIcon fontSize='large' />
              </IconButton>
            </Tooltip>
            {/* display cart */}
            <Tooltip title="Cart">
              <IconButton 
                aria-label={'cart'}
                onClick={()=>{navigate("/cart")}}
                sx={{ color: 'text.secondary' }} 
              >
                <Badge badgeContent={cartCount} sx={{ "& .MuiBadge-badge": { backgroundColor: "secondary.main" } }}>
                  <ShoppingCartIcon fontSize='large' />
                </Badge>  
              </IconButton>
            </Tooltip>
          </>
        )}
        <Tooltip title={isLoggedIn ? "Logout" : "Login"}>
          <IconButton
            aria-label={isLoggedIn ? "Logout" : "Login"}
            onClick={() => isLoggedIn ? logout() : navigate("/sign-in")}
            sx={{ color: 'text.secondary' }}
          >
            {isLoggedIn ? <LogoutIcon fontSize='large' /> : <LoginIcon fontSize='large' />}
          </IconButton>
        </Tooltip>  

    </Toolbar>
    </AppBar >
  )
}

export default AppHeader;
