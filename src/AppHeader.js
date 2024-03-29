import { AppBar, Badge, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from './SearchBar';



// const AppHeader = ({ isLoggedIn, logout ,cartCount, products, searchResults, setSearchResults }) => {
const AppHeader = ({ isLoggedIn, logout ,cartCount, products }) => {
  // const [searchResults, setSearchResults] = useState();
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const productCategory = queryParams.get("category");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOptionClick = (event) => {
    navigate(`/products?category=${event.target.innerText}`);
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleSearch = (event) => {
  //   //setSearchResults(results);
  //   navigate('/products');
  // }
  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     navigate('/products');
  //   }
  // }

  
  const handleSearch = (event) => {  
    const searchString = event.target.value;
    setSearchText(searchString);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/products?search=${searchText}`);
      setSearchText('');
    }
  }

  return (
    <AppBar position="absolute" sx={{ zIndex: (theme) => theme.zIndex.drawer, height: "4rem" }}>
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
          <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', ml: '10vw', mr: '10vw' }}>
            <Tooltip title="Game Menu">
              <Button
                id="game-menu"
                onClick={handleClick}
                aria-controls={open ? 'game-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                align='center'
                sx={{ flexGrow: 1, ml: 2, mr: 2 }}
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
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
              <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Box>
                  <Typography sx={{fontWeight: 'bold', ml: 2}}>Game Type</Typography>
                  <MenuItem onClick={handleOptionClick}>All Games</MenuItem>
                  <MenuItem onClick={handleOptionClick}>Board Games</MenuItem>
                  <MenuItem onClick={handleOptionClick}>Card Games</MenuItem>
                  <br />
                  <Typography sx={{fontWeight: 'bold', ml: 2}}>Category</Typography>
                  <MenuItem onClick={handleClose}>Strategy</MenuItem>
                  <MenuItem onClick={handleClose}>Roll & Write</MenuItem>
                  <MenuItem onClick={handleClose}>Party</MenuItem>
                  <MenuItem onClick={handleClose}>Puzzle</MenuItem>
                  <MenuItem onClick={handleClose}>Abstract</MenuItem>
                  <MenuItem onClick={handleClose}>Cooperative</MenuItem>
                </Box>
                <Box sx={{ml: 5, mr: 5}}></Box>
                <Box>
                <Typography sx={{fontWeight: 'bold', ml: 2}}>Age</Typography>
                  <MenuItem onClick={handleClose}>Kids</MenuItem>
                  <MenuItem onClick={handleClose}>Teens</MenuItem>
                  <MenuItem onClick={handleClose}>Family</MenuItem>
                  <MenuItem onClick={handleClose}>Adults</MenuItem>
                  <br />
                  <Typography sx={{fontWeight: 'bold', ml: 2}}>Prices</Typography>
                  <MenuItem onClick={handleClose}>Under $25</MenuItem>
                  <MenuItem onClick={handleClose}>$25-$50</MenuItem>
                  <MenuItem onClick={handleClose}>$50-$75</MenuItem>
                  <MenuItem onClick={handleClose}>$75+</MenuItem>
                </Box>
              </Box>
            </Menu>
            <Typography
              variant="h6"
              color="text.secondary"
              align='center'
              sx={{ flexGrow: 1, ml: 2, mr: 2 }}
            >
              Sale
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              color="text.secondary"
              align='center'
              sx={{ flexGrow: 1, ml: 2, mr: 2 }}
            >
              Explore Gamme
            </Typography>
          </Box>
        </React.Fragment>
        
        {/* Search bar */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
          <SearchIcon sx={{ color: 'white', mr: 1, my: 0.5 }} />
          <TextField 
            focused
            label="Search" 
            variant="filled" 
            size="small"
            sx={{
              width:'15rem',
              backgroundColor: 'white'
            }}  
            value={searchText} 
            onChange={handleSearch}
            onKeyDown={handleKeyPress}
          >
          </TextField>
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
