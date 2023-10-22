import React from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const baseURL = "http://localhost:8000/images";
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 300 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`${baseURL}/${product.shadesDetails[0].shades[0].shadePic}`}
        title="pic"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => navigate(`/single-product/${product._id}`)}
        >
          View <FaEye />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
