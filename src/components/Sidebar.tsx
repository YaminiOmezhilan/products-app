import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const SidebarStyled = styled(Drawer)`
  width: 10%;
  flex-shrink: 0;

  & .MuiDrawer-paper {
    width: 10%;
    box-sizing: border-box;
  }
`;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <SidebarStyled variant="permanent" anchor="left">
      <List>
        <ListItem button onClick={() => handleNavigation("/products")}>
          <ListItemText primary="Products" />
        </ListItem>
        {/* Add more navigation items if needed */}
      </List>
    </SidebarStyled>
  );
};

export default Sidebar;
