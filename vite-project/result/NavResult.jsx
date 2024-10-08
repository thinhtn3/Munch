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
import munchLogo from "../assets/Munch-Logo-Orange.png";
import LocationFormResult from "./LocationFormResult";
import "./NavResult.css";
import { color } from "framer-motion";

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
              {navItems.map((item) => (
                <Button
                  onClick={() => (location.href = `/#${item.toLowerCase()}`)}
                  key={item.toLowerCase()}
                  sx={{
                    color: "black",
                    fontWeight: "600",
                    fontSize: "1em",
                    "&:hover": {
                      backgroundColor: "#834635",
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
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
        sx={{
          backgroundColor: "#fff",
          padding: "0em 1em",
          borderBottom: "8px solid #ff9f1c",
        }}
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
            <MenuIcon sx={{ color: "#ff9f1c" }} />
          </IconButton>

          <div className="logo-row" style={{ display: "flex" }}>
            <img
              src={munchLogo}
              className="logo"
              alt="Munch Logo"
              id="logo"
              onClick={() => (location.href = `/#home`)}
            />
          </div>
          <LocationFormResult />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                className="navLinkResult"
                onClick={() => (location.href = `/#${item.toLowerCase()}`)}
                key={item.toLowerCase()}
                sx={{
                  color: "black",
                  fontWeight: "600",
                  fontSize: "1.2em",
                  "&:hover": {},
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
