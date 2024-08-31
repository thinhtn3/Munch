import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import munchLogo from "../assets/munchLogo.png";
import { NavHashLink } from "react-router-hash-link";
import LocationFormResult from "./LocationFormResult";
import "./NavResult.css";

const drawerWidth = 240;
const navItems = ["Home"];

function NavResult(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <NavHashLink
                smooth
                to={`/#${item.toLowerCase()}`}
                style={({ isActive }) => ({
                  color: isActive ? "black" : "yellow",
                })}
                isActive={() => false}
              >
                {item}
              </NavHashLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{ backgroundColor: "#ad5d47df", padding: "0em 1em" }}
      >
        <Toolbar
          id="toolBar"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <div className="logo-row" style={{ display: "flex" }}>
            <img src={munchLogo} className="logo" alt="Munch Logo" id="logo" />
            <h1
              id="navTitle"
              style={{
                fontWeight: "800",
                fontSize: "2.9em",
                paddingLeft: "0.5em",
              }}
            >
              Munch
            </h1>
          </div>
          <LocationFormResult />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                onClick={() => (location.href = `/#${item.toLowerCase()}`)}
                key={item.toLowerCase()}
                sx={{
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "1.2em",
                  "&:hover": {
                    backgroundColor: "#834635",
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default NavResult;
