import React from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { logout } from "../redux/authSlice";
import styled from "@emotion/styled";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const AppBar = styled(MuiAppBar)`
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 10%;
    right: 0;
    z-index: 1200;
    width: 90%;
    box-shadow: none;
  `;

  const CustomButton = styled(Button)`
    text-transform: none;
    font-size: 1rem;
    font-weight: 500;
    padding: 8px 16px;
    line-height: 1.5;
    border: none;
    border-radius: 6px;
    background-color: #5c5e60;
    border-color: #5c5e60;
    color: #fff;

    &:hover {
      background-color: #454748;
      border-color: #454748;
    }

    &:active {
      border-color: #454748;
      color: #fdfdfe;
    }
  `;
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
