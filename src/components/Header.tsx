import React from "react";
import { Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { logout } from "../redux/authSlice";
import { AppBar, CustomButton } from "../styles/styles";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: "#2D3540",
            fontWeight: 500,
            fontSize: "28px",
            lineHeight: "40px",
            letterSpacing: "-0.2px",
          }}
        >
          Products
        </Typography>
        <CustomButton onClick={handleLogout}>Logout</CustomButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
