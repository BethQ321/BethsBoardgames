import { AppBar, Badge, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: "4rem" }}>
      <Toolbar>
        <Button sx={{ display: 'flex', flexDirection: 'column', pt: '1.5rem', pb: '1.5rem' }}>       
          <Box
            // className='imageButton'
            onClick={() => { navigate("/") }} 
            component="img"
            sx={{
                height: "3rem"
            }}
            alt="gamme store logo"
            src="/public/assets/logo-11a.png"
            >
          </Box>
        </Button>
        <React.Fragment>
          <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row', ml: '10vw', mr: '10vw' }}>
            <Tooltip title="Game Menu">
              <Button
                id="game-menu"
                onClick={handleClick}
                aria-controls={open ? 'game-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                align='center'
                sx={{ flexGrow: 1 }}
              >
                <Typography
                  variant="h6"
                  color="text.secondary"
                >
                  Games
                </Typography>
              </Button>
            </Tooltip>
            <Menu
              id="game-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'game-menu-button',
              }}
              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => navigate("/products")}>All Games</MenuItem>
              <MenuItem onClick={() => navigate("/products?category=board%20games")}>Board Games</MenuItem>
              <MenuItem onClick={() => navigate("/products?category=card%20games")}>Card Games</MenuItem>
              <Divider />
            </Menu>
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
        </React.Fragment>
        {isLoggedIn && (
          <>
           {/* display user profile */}
            <Tooltip title={"User profile"}>
              <IconButton
                aria-label={"user profile"}
                onClick={() => navigate("/user-profile_mui")}
                sx={{ color: 'text.secondary' }}
              >
                <AccountCircleIcon />
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
                  <ShoppingCartIcon />
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
            {isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
          </IconButton>
        </Tooltip>  

    </Toolbar>
    </AppBar >
  )
}

export default AppHeader;
