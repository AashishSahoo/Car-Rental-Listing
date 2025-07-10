"use client";

import * as React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { logout } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;
const primaryColor = "#8c52ff";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  backgroundColor: "#f5f5f5",
  minHeight: "100vh",
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  backgroundColor: primaryColor,
  color: "#fff",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
          <IconButton color="inherit">
            <Icon icon="mdi:account-circle" width="30" height="30" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: primaryColor,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img
            src="/images/logo2.png"
            alt="Logo"
            style={{
              height: 50,
              maxWidth: "90%",
              objectFit: "contain",
              marginRight: "4rem"
            }}
          />
          <IconButton sx={{ color: "#fff" }} onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box>
            <Divider sx={{ backgroundColor: "#ffffff33" }} />
            <List>
              {["Home"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton sx={{ color: "#fff" }}>
                    <ListItemIcon sx={{ color: "#fff" }}>
                      {index % 2 === 0 ? (
                        <Icon icon="material-symbols:home-rounded" width="24" height="24" />
                      ) : (
                        <MailIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Divider sx={{ backgroundColor: "#ffffff33" }} />
            <List>
              <ListItem disablePadding>
                <ListItemButton sx={{ color: "#fff" }}
                  onClick={handleLogout}
                >
                  <ListItemIcon sx={{ color: "#fff" }}>
                    <Icon icon="material-symbols:logout-rounded" width="24" height="24" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Drawer>


      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ px: 0, mx: 0, width: '100%' }}>
          {children}
        </Box>
      </Main>
    </Box>
  );
}
