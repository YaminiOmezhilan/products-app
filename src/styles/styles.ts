import styled from "@emotion/styled";
import { AppBar as MuiAppBar, Button, Box, Drawer } from "@mui/material";

export const AppBar = styled(MuiAppBar)`
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 10%;
  right: 0;
  z-index: 1200;
  width: 90%;
  box-shadow: none;
`;

export const CustomButton = styled(Button)`
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

export const SidebarStyled = styled(Drawer)`
  width: 10%;
  flex-shrink: 0;

  & .MuiDrawer-paper {
    width: 10%;
    box-sizing: border-box;
  }
`;

export const CustomLoginButton = styled(Button)`
  text-transform: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 10px;
  margin-top: 10px;
  line-height: 1.5;
  border: none;
  border-radius: 6px;
  background-color: #cfd4d8;
  border-color: #d9d9d9;
  color: #2d3540;

  &:hover {
    background-color: #b8bdc0;
    border-color: #dde3e7;
    color: #000;
  }

  &:active {
    border-color: #1c4b8e;
    color: #000;
  }
`;

export const StatusContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  margin-top: 64px;
`;
