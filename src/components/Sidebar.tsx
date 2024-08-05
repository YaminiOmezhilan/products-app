import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SidebarStyled } from "../styles/styles";

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
      </List>
    </SidebarStyled>
  );
};

export default Sidebar;
