import React, { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Box, Dialog, Typography } from "@mui/material";

const CartComp = () => {
  const { cartItems, totalPrice } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const deleteItem = (val) => {
    dispatch({ type: "REMOVE", payload: val });
  };
  const showProductDetails = () => {
    setVisible(true);
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "24px" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: "12px",
            padding: "12px 0 12px 0",
          }}
        >
          <Box sx={{ fontSize: "22px", width: "25%", fontWeight: "semi-bold" }}>
            Title
          </Box>
          <Box sx={{ fontSize: "22px", width: "25%", fontWeight: "semi-bold" }}>
            Quantity
          </Box>
          <Box sx={{ fontSize: "22px", width: "25%", fontWeight: "semi-bold" }}>
            Price
          </Box>
          <Box sx={{ fontSize: "22px", width: "25%", fontWeight: "semi-bold" }}>
            Action
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((val, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: "22px",
                        width: "25%",
                        fontWeight: "semi-bold",
                      }}
                    >
                      {val.title}
                    </Box>
                    <Box
                      sx={{
                        fontSize: "22px",
                        width: "25%",
                        fontWeight: "semi-bold",
                      }}
                    >
                      {val.qty}
                    </Box>
                    <Box
                      sx={{
                        fontSize: "22px",
                        width: "25%",
                        fontWeight: "semi-bold",
                      }}
                    >
                      {val.price * val.qty}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        width: "25%",
                      }}
                    >
                      <FaEye
                        style={{
                          fontSize: "22px",
                          color: "green",
                          cursor: "pointer",
                        }}
                        onClick={() => showProductDetails(val)}
                      />
                      <FaTrash
                        style={{
                          fontSize: "22px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteItem(val)}
                      />
                      <Dialog
                        open={visible}
                        onClose={() => setVisible(false)}
                        sx={{ width: "50vw" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <Typography sx={{ fontSize: "20px" }}>
                            Name: {val.title}
                          </Typography>
                          <Typography sx={{ fontSize: "20px" }}>
                            Price: {val.price * val.qty} Rs
                          </Typography>
                          <Typography sx={{ fontSize: "20px" }}>
                            Quantity: {val.qty}
                          </Typography>
                          <Box>
                            <Typography
                              sx={{ fontSize: "20px", color: "teal" }}
                            >
                              Palletes
                            </Typography>
                            {val.palletes.map((item, index) => {
                              return (
                                <Box key={index}>
                                  <Typography
                                    variant="p"
                                    sx={{ fontSize: "18px" }}
                                  >
                                    Color: {item.color}
                                  </Typography>
                                  <Box
                                    sx={{
                                      width: "100%",
                                      display: "flex",
                                      flexWrap: "flex-wrap",
                                      alignItems: "center",
                                    }}
                                  >
                                    {item.shades.map((x, ind) => {
                                      return (
                                        <Box
                                          key={ind}
                                          sx={{
                                            cursor: "pointer",
                                            width: "200px",
                                          }}
                                        >
                                          <img
                                            src={`http://localhost:8000/images/${x.shadePic}`}
                                            style={{
                                              width: "200px",
                                              height: "300px",
                                            }}
                                            alt="s"
                                          />
                                          <Typography variant="p">
                                            Toner: {x.toner}
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
                      </Dialog>
                    </Box>
                  </Box>
                );
              })}
            </>
          ) : (
            <Typography variant="p">No Items in cart</Typography>
          )}
        </Box>
        <Box sx={{ paddingTop: "40px" }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="p">Total</Typography>
            <Typography variant="p">{totalPrice}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CartComp;
