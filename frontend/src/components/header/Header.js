
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton,Menu,Drawer, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import './header.css'
import { Link, NavLink, useNavigate } from "react-router-dom";
import Login from "../login/Login";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useDispatch, useSelector } from "react-redux";
import { SearchProductsAction } from "../../redux/action/productAction";

const Header = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [userData,setUSerData] = useState()
    const [openDrawer, setOpenDrawer] = useState(false);
    const [searchText, setSearchText] = useState();

    let productListCart = JSON.parse(localStorage.getItem('cartItems'));
    const cartItems = useSelector(state => state.addToCartReducer.data);
    const userDetails = JSON.parse(localStorage.getItem('user'))
    

    const closeHandle = ()=>{
        setOpen(true);
    }
    const handleClick = (event)=>{
        setOpenMenu(event.currentTarget);
    }
    const closeHandle2 = (e)=>{
        setOpenMenu(false);
    }
    const getData = (data)=>{
        setUSerData(data)    
    }
    const logoutUSer = ()=>{
        localStorage.removeItem('user')
        setUSerData('');
    }
    const handleSearchList = ()=>{
            navigate(`/search/${searchText}`)
            setSearchText('');
    }
    
    return (
        <header className="header">
            <div className="hamburger" onClick={()=>setOpenDrawer(!openDrawer)} >
                  <MenuIcon style={{color:"white", fontSize:"45px"}}  />
            </div>
            <div className="logo">
             <h4> <NavLink className='logo-icon' to='/'>FLASKO</NavLink></h4>
            </div>
            <div className="search-bar">
                <input value={searchText} type="text" placeholder="Search..." onChange={(e)=>setSearchText(e.target.value)} />
                    <div className="search-icon" onClick={handleSearchList} >
                        <ion-icon name="search-outline"></ion-icon>
                    </div>
            </div>
            <div className= {openDrawer? "user": "closeUser"}>
                <div className="user-account">
                    {
                        (userData || userDetails ) ?
                        <>   
                            <h6 onClick={handleClick}>{userDetails ? userDetails.username : userData.username}</h6>  
                            <Menu
                                anchorEl={openMenu}
                                open={Boolean(openMenu)}
                                onClose={closeHandle2}
                            >
                                <MenuItem onClick={()=>{closeHandle2(); logoutUSer();}}>
                                    <PowerSettingsNewIcon/>Logout
                                </MenuItem>
                            </Menu>
                    </>
                        :
                            <div className="login-btn" onClick={()=>closeHandle()} >Login</div>
                    }
                </div>
                <Link to='/' style={{textDecoration:'none'}}>
                    <div className="nav-list">
                    <Link to='/' style={{textDecoration: 'none', color:' white', fontSize:'17px'}} > <p style={{marginTop:'14px '}} >Home</p></Link>
                    </div>
                </Link>
                <div className="nav-list">
                    <Link to='/about' style={{textDecoration: 'none', color:' white', fontSize:'17px'}} > <p style={{marginTop:'14px '}} >Abut Us</p></Link>
                </div>
                <div className="nav-list">
                    <Link to='/products' style={{textDecoration: 'none', color:' white', fontSize:'17px'}} > <p style={{marginTop:'14px '}} >Products</p></Link>
                </div>
                <Login open={open} setOpen={setOpen} getData={getData} />
            </div>
            <Link to='/cart'>
                    <div className="shopping-cart">
                        <ion-icon name="cart-outline"></ion-icon>
                        <span style={{textDecoration:'none'}}>{productListCart&& productListCart?.length > 0 ? productListCart?.length : cartItems?.length}</span>
                    </div>  
                </Link> 
        </header>
    )
}

export default Header;