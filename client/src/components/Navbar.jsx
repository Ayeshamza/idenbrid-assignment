import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Box, List, ListItem, Typography } from "@mui/material";

const Navbar = () => {
  const { pathname } = useLocation();
  const { cartItems } = useSelector((s) => s.cart);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Create", path: "/create-product" },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#e38a56",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 32px 0 32px",
        height: "70px",
      }}
    >
      <Typography sx={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>
        Colors Palletes
      </Typography>
      <Box
        sx={{
          width: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {navLinks.map((val, i) => {
            return (
              <ListItem key={i}>
                <Link
                  style={{
                    color: pathname === val.path ? "#e38a56" : "white",
                    backgroundColor: pathname === val.path ? "white" : "",
                    padding: "8px 16px 8px 16px",
                    borderRadius: "4px",
                    textDecoration: "none",
                  }}
                  to={val.path}
                >
                  {val.name}
                </Link>
              </ListItem>
            );
          })}
          <ListItem>
            <Link
              to="/shopping-cart"
              style={{
                color: pathname === "/shopping-cart" ? "#e38a56" : "white",
                backgroundColor: pathname === "/shopping-cart" ? "white" : "",
                padding: "8px 16px 8px 16px",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              <FaShoppingCart />
            </Link>
            <Box
              sx={{
                color: pathname === "/shopping-cart" ? "white" : "#e38a56",
                backgroundColor:
                  pathname === "/shopping-cart" ? "#e38a56" : "white",
                position: "absolute",
                right: "20px",
                top: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "15px",
                height: "15px",
                borderRadius: "100%",
                fontSize: "10px",
              }}
            >
              {cartItems.length}
            </Box>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Navbar;
