import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [colorNumbers, setColorNumbers] = useState(0);
  const [colorsFields, setColorFields] = useState([]);
  const [shades, setShades] = useState([]);
  const navigate = useNavigate();

  const handleColorData = (e) => {
    let value = e.target.value;
    console.log(value);
    if (value === null) {
      setColorNumbers(0);
      setShades([]);
    } else if (value > 4) {
      setColorNumbers(4);
      setColorFields(Array(4).fill(""));
      if (shades.length < 1) {
        let obj = {
          toner: "",
          shadesFile: [],
        };
        setShades((previous) => [...previous, obj]);
      }
    } else {
      setColorNumbers(value);
      setColorFields(Array(value).fill(""));
      if (shades.length < 1) {
        let obj = {
          toner: "",
          shadesFile: [],
        };
        setShades((previous) => [...previous, obj]);
      }
    }
  };

  const handleInput = (index, value) => {
    const inputValues = [...colorsFields];
    inputValues[index] = value;
    setColorFields(inputValues);
  };

  const handleShades = (index, e) => {
    const file = e.target.files[0];
    const inputFiles = [...shades];
    inputFiles[index].shadesFile.push(file);
    setShades(inputFiles);
  };

  const handleToner = (index, value) => {
    const inputToner = [...shades];
    inputToner[index].toner = value;
    setShades(inputToner);
  };

  const addRow = () => {
    let newShade = {
      toner: "",
      shadesFile: [],
    };
    setShades((previous) => [...previous, newShade]);
  };

  const deleteRow = (i) => {
    let filterShades = shades.filter((_, index) => i !== index);
    setShades(filterShades);
  };

  const createProduct = async (e) => {
    e.preventDefault();
    let finalData = {
      title,
      description: description,
      colorNumbers: Number(colorNumbers),
    };
    let newArray = [];
    for (var i = 0; i < colorsFields.length; i++) {
      let shadesArr = [];
      for (var j = 0; j < shades.length; j++) {
        let shadeObj = {
          toner: shades[j].toner,
          shadePic: shades[j].shadesFile[i]?.name,
        };
        shadesArr.push(shadeObj);
      }
      let newObj = {
        color: colorsFields[i],
        shades: shadesArr,
      };
      newArray.push(newObj);
    }
    finalData = { ...finalData, shadesDetails: newArray };
    let fileArr = shades.map((x) => {
      return x.shadesFile;
    });
    let finalFileArr = [];
    fileArr.forEach((x) => {
      x.forEach((y) => {
        finalFileArr.push(y);
      });
    });
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(finalData));
      for (var k = 0; k < finalFileArr.length; k++) {
        if (k < finalFileArr.length) {
          formData.append("image", finalFileArr[k]);
        }
      }
      const res = await axios.post("http://localhost:8000/product", formData);
      alert(res.data.msg);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "20px",
        }}
      >
        <Typography variant="h4">Create Product</Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "black" }} variant="p">
              Title
            </Typography>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="small"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "black" }} variant="p">
              Description
            </Typography>
            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="small"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Typography sx={{ fontSize: "14px", color: "black" }} variant="p">
            Colors Numbers
          </Typography>
          <input
            value={colorNumbers}
            onChange={handleColorData}
            placeholder="Enter Colors Number..."
            size="small"
            type="number"
          />
        </Box>
        {colorsFields.length > 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {Array.from({ length: colorNumbers }).map((_, index) => (
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Typography variant="p">Color {index + 1}</Typography>
                  <input
                    key={index}
                    type="text"
                    value={colorsFields[index]}
                    onChange={(e) => handleInput(index, e.target.value)}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {shades.length > 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography sx={{ fontSize: "14px", color: "black" }} variant="p">
              Shades Details
            </Typography>
            {shades.map((item, i) => {
              return (
                <Box
                  key={i}
                  sx={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <Button
                    onClick={addRow}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px",
                      borderRadius: "8px",
                      backgroundColor: "blue",
                      color: "white",
                    }}
                  >
                    <FaPlus />
                  </Button>

                  <input
                    type="number"
                    value={item?.toner}
                    placeholder="Toner..."
                    onChange={(e) => handleToner(i, e.target.value)}
                  />
                  <Box
                    sx={{ display: "flex", gap: "8px", alignItems: "center" }}
                  >
                    {Array.from({ length: colorNumbers }).map((_, index) => (
                      <input
                        key={index}
                        type="file"
                        onChange={(e) => handleShades(i, e)}
                        className="w-[207px] border-[1px] border-gray-200"
                      />
                    ))}
                  </Box>
                  <Button
                    onClick={() => deleteRow(i)}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px",
                      borderRadius: "8px",
                      backgroundColor: "red",
                      color: "white",
                    }}
                  >
                    <FaTrash />
                  </Button>
                </Box>
              );
            })}
          </Box>
        )}
        <Button
          type="submit"
          sx={{
            width: "fit-content",
            backgroundColor: "#2855ea",
            padding: "8px 16px 8px 16px",
            borderRadius: "8px",
            color: "white",
          }}
          onClick={createProduct}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default Create;
