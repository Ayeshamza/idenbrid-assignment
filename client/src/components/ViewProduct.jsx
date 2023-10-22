import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [colorsSelected, setColorsSelected] = useState([]);
  const [tonerSelected, setTonerSelected] = useState([]);
  const [qty, setQty] = useState(1);
  const price = 1000;
  const dispatch = useDispatch();
  const { cartItems } = useSelector((s) => s.cart);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/product/${id}`);
        setProduct(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const handleColor = (val) => {
    setColorsSelected((previous) => [...previous, val]);
    if (colorsSelected?.map((x) => x.color).includes(val.color)) {
      const filteredColors = colorsSelected.filter((x) => {
        return x.color !== val.color;
      });
      setColorsSelected(filteredColors);
    }
  };

  const handleToner = (val, color) => {
    let finalShade = {
      color: color,
      toner: val.toner,
      shadePic: val.shadePic,
    };
    setTonerSelected((previous) => [...previous, finalShade]);
    if (tonerSelected?.map((x) => x.shadePic).includes(val.shadePic)) {
      const filteredToner = tonerSelected.filter((x) => {
        return x.shadePic !== val.shadePic;
      });
      setTonerSelected(filteredToner);
    }
  };

  const addToCart = () => {
    let finalProduct = {
      _id: product._id,
      title: product.title,
      qty: qty,
      price: price,
    };
    let shadesArray = [];
    for (let i = 0; i < colorsSelected.length; i++) {
      let newShadesArray = tonerSelected
        .filter((x) => {
          return colorsSelected[i].color === x.color;
        })
        .map((y) => {
          return { toner: y.toner, shadePic: y.shadePic };
        });
      let shadeObj = {
        color: colorsSelected[i].color,
        shades: newShadesArray,
      };
      shadesArray.push(shadeObj);
    }
    finalProduct = { ...finalProduct, palletes: shadesArray };
    if (colorsSelected.length <= 0) {
      alert("Please select color");
    } else {
      dispatch({ type: "ADD", payload: finalProduct });
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", display: "flex", padding: "20px" }}>
        <Box
          sx={{
            width: "66.66%",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Typography variant="p" sx={{ color: "black", fontSize: "20px" }}>
              Select Color
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {product &&
                product.shadesDetails.map((val, i) => {
                  return (
                    <Box
                      key={i}
                      onClick={() => handleColor(val)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        justifyContent: "start",
                        gap: "8px",
                        backgroundColor: colorsSelected
                          ?.map((x) => x.color)
                          .includes(val.color)
                          ? "#e38a56"
                          : "#e0dfdf",
                        color: colorsSelected
                          ?.map((x) => x.color)
                          .includes(val.color)
                          ? "white"
                          : "black",
                        width: "70px",
                        padding: "8px 4px 8px 4px",
                      }}
                    >
                      <Typography variant="span">{val.color}</Typography>
                      {colorsSelected?.map((x) => x.color) && (
                        <Typography variant="span">
                          <FaTimes />
                        </Typography>
                      )}
                    </Box>
                  );
                })}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {colorsSelected &&
                colorsSelected.map((item, index) => {
                  return (
                    <Box key={index}>
                      <Typography variant="p">{item.color}</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          gap: "16px",
                        }}
                      >
                        {item?.shades?.map((val, i) => {
                          return (
                            <Box
                              key={i}
                              onClick={() => handleToner(val, item.color)}
                              sx={{
                                cursor: "pointer",
                                backgroundColor: tonerSelected
                                  ?.map((x) => x.shadePic)
                                  .includes(val.shadePic)
                                  ? "#e38a56"
                                  : "#e0dfdf",
                                color: tonerSelected
                                  ?.map((x) => x.shadePic)
                                  .includes(val.shadePic)
                                  ? "#e38a56"
                                  : "#e0dfdf",
                                padding: "8px 4px 8px 4px",
                              }}
                            >
                              <img
                                src={`http://localhost:8000/images/${val.shadePic}`}
                                style={{ width: "200px", height: "200px" }}
                                alt="s"
                              />
                              <Typography sx={{ color: "black" }}>
                                Toner: {val.toner}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "33.34%",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Typography>{product && product.title}</Typography>
          <Typography>{product && product.description}</Typography>
          <Typography>{price} Rs</Typography>
          <Typography>Quantity</Typography>
          <Box>
            <Button
              sx={{ width: "fit-content" }}
              onClick={() => setQty((previous) => previous + 1)}
            >
              <FaPlus />
            </Button>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              style={{ paddingLeft: "8px", width: "35px" }}
            />
            <Button
              sx={{ width: "fit-content" }}
              onClick={() => {
                if (qty > 1) {
                  setQty((previous) => previous - 1);
                }
              }}
            >
              <FaMinus />
            </Button>
          </Box>
          <Button
            onClick={addToCart}
            disabled={cartItems.find((x) => x._id === id)}
            sx={{
              backgroundColor: cartItems.find((x) => x._id === id)
                ? "#39ac13"
                : "#206d06",
              cursor: cartItems.find((x) => x._id === id)
                ? "not-allowed"
                : "pointer",
            }}
          >
            Add To Cart
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ViewProduct;
