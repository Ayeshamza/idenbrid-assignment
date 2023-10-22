import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import axios from "axios";

const HomeComp = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/product");
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "20px",
      }}
    >
      <Typography
        sx={{ color: "#e38a56", fontSize: "24px", fontWeight: "500" }}
      >
        Product Lists
      </Typography>
      <Box
        sx={{ display: "flex", flexWrap: "wrap", gap: "12px", width: "100%" }}
      >
        {products &&
          products.map((item, i) => <ProductCard key={i} product={item} />)}
      </Box>
    </Box>
  );
};

export default HomeComp;
