import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Typography,
  Box,
  Stack,
  FormControl,
  FormHelperText,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
  LinearProgress,
} from "@mui/material";

import { styled } from "@material-ui/core/styles";

import SendIcon from "@mui/icons-material/Send";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ChangeEvent } from "react";

// const useStyles = makeStyles((theme) => ({
//   button: {
//     display: "block",
//     marginTop: theme.spacing(2),
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
// }));

const Claim = () => {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState("");
  const [reason, setReason] = useState("");
  const [provider, setProvider] = useState("");
  const [cropDamage, setCropDamage] = useState("");
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [imageurl, setImageUrl] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [confidence, setConfidence] = useState(0);

  const [isClaim, setIsClaim] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------------------------------------------

//   const StarContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   pointer-events: none;
// `;

// const Star = styled.div`
//   position: absolute;
//   width: 15px;
//   height: 15px;
//   border-radius: 50%;
//   border: 1px solid white;
//   background-color: transparent;
//   animation: fall 3s linear infinite;
  
//   @keyframes fall {
//     from {
//       transform: translateY(-50px);
//     }
//     to {
//       transform: translateY(100vh);
//     }
//   }
// `;

//   const [stars, setStars] = useState([]);

//   useEffect(() => {
//     // Generate an array of stars with random positions
//     const newStars = Array.from({ length: 50 }, () => ({
//       x: Math.random() * window.innerWidth,
//       y: Math.random() * window.innerHeight,
//     }));

//     // Update the state with the new array of stars
//     setStars(newStars);

//     // Update the position of each star every 50 milliseconds
//     const intervalId = setInterval(() => {
//       setStars(stars => {
//         return stars.map(star => ({
//           x: star.x,
//           y: star.y + 5,
//         }));
//       });
//     }, 50);

//     // Clean up the interval when the component unmounts
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//         <div className="star-container">
//           {stars.map((star, index) => (
//             <div key={index} className="star" style={{ top: star.y, left: star.x }} />
//           ))}
//         </div>
//       );

  // -------------------------------------------------------------

  // const handleUpload = () => {};
  // const handleFileChange = () => {
  // };

  const handleUpload = async () => {
    setIsLoading(true);

    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", format);
    try {
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });

      setIsClaim(true);

      console.log(res.data);
      setCategory(res.data.class);
      setConfidence(res.data.confidence);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile =
      event.target.files && event.target.files.length > 0
        ? event.target.files[0]
        : null;
    setFile(selectedFile);
    setImageUrl(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleClaim = () => {};

  return (
    <Box>
      <Stack direction={"row"} height={"600px"}>
        <Stack
          direction={"column"}
          width={"30%"}
          height={"300px"}
          marginX={"auto"}
          mt={"150px"}
          padding={"15px"}
          bgcolor={"#0D1117"}
          borderRadius={"10px"}
          boxShadow={"0px 0px 10px cornflowerblue"}
        >
          <Box
            bgcolor={"#00356B"}
            marginX={"auto"}
            padding={"10px"}
            sx={{
              borderStyle: "solid",
              borderRadius: "10px",
              width: "100%",
              height: "50px",
            }}
          >
            <Typography
              // bgcolor={"red"}
              fontWeight={"600"}
              fontSize={"20px"}
              fontFamily={"monospace"}
            >
              Fill Form details
            </Typography>
          </Box>
          <form onSubmit={handleClaim}>
            <FormControl
              fullWidth
              sx={{
                // width: '300px',
                mt: "25px",
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Select Provider
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Provider"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              >
                <MenuItem value="State Bank Of India">
                  State Bank Of India
                </MenuItem>
                <MenuItem value="IFFCO-Tokio General Insurance Co. Ltd.">
                  IFFCO-Tokio General Insurance Co. Ltd.
                </MenuItem>
                <MenuItem value="Agriculture Insurance Co.">
                  Agriculture Insurance Co.
                </MenuItem>
                <MenuItem value="Bharti Axa General Insurance Co. Ltd.">
                  Bharti Axa General Insurance Co. Ltd.
                </MenuItem>
                <MenuItem value="ICICI Lombard General Insurance Co. Ltd">
                  ICICI Lombard General Insurance Co. Ltd
                </MenuItem>
                <MenuItem value="Bajaj Allianz General Insurance Co. Ltd">
                  Bajaj Allianz General Insurance Co. Ltd
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                // width: '300px',
                mt: "25px",
              }}
            >
              <InputLabel id="demo-simple-select-label">Select Crop</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Crop"
                value={cropDamage}
                onChange={(e) => setCropDamage(e.target.value)}
              >
                <MenuItem value="Millets">Millets</MenuItem>
                <MenuItem value="Pulses">Pulses</MenuItem>
                <MenuItem value="Cereals">Cereals</MenuItem>
                <MenuItem value="Oilseeds">Oilseeds</MenuItem>
              </Select>
            </FormControl>
            <Stack
              direction={"row"}
              // bgcolor={"#00356B"}
              // marginX={"auto"}
              sx={{
                marginTop: "10px",
                width: "100%",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={"Select Event Date"}
                  value={eventDate}
                  onChange={(date) => setEventDate(date)}
                  sx={{ scale: "0.8", marginLeft: "-24px" }}
                />
              </LocalizationProvider>
              {/* <Button
              disabled={!cropDamage || !provider}
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                height: "45px",
                width: "150px",
                marginTop: "5px",
              }}
              type="submit"
            >
              Submit
            </Button> */}
            </Stack>
          </form>
        </Stack>

        <Stack
          direction={"column"}
          width={"30%"}
          height={"300px"}
          marginX={"auto"}
          mt={"150px"}
          padding={"15px"}
          bgcolor={"#0D1117"}
          borderRadius={"10px"}
          boxShadow={"0px 0px 10px cornflowerblue"}
        >
          <Box
            bgcolor={"#00356B"}
            marginX={"auto"}
            padding={"10px"}
            sx={{
              borderStyle: "solid",
              borderRadius: "10px",
              width: "100%",
              height: "50px",
            }}
          >
            <input type="file" onChange={handleFileChange} />
          </Box>
          <FormControl
            fullWidth
            sx={{
              // width: '300px',
              mt: "25px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Reason</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Format"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <MenuItem value="rain">Flood</MenuItem>
              <MenuItem value="drought">Drought</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{
              // width: '300px',
              mt: "25px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Format</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <MenuItem value="jpg">JPG</MenuItem>
              <MenuItem value="png">PNG</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!file || !format}
            endIcon={<SendIcon />}
            sx={{
              marginTop: "20px",
            }}
          >
            CLAIM
          </Button>
        </Stack>

        {imageurl && (
          <Stack
            direction={"column"}
            width={"30%"}
            height={"300px"}
            marginX={"auto"}
            mt={"150px"}
            bgcolor={"#0D1117"}
            borderRadius={"10px"}
          >
            <img
              style={{
                marginTop: "-45px",
                borderRadius: "10px",
                borderStyle: "solid",
                borderColor: "#FF007F",
                // boxShadow: "0px 0px 30px cornflowerblue",
                // scale: "0.6",
              }}
              src={imageurl}
              alt="Selected file"
            />
            {category && (
              <Box>
                <Typography>
                  Confidence is : {Number(confidence * 100)}
                </Typography>
                {/* <Typography>Category is : {category}</Typography> */}
                <Typography>Category is : {reason}</Typography>
              </Box>
            )}
          </Stack>
        )}
      </Stack>
      {isLoading && (
        <Box>
          <LinearProgress />
        </Box>
      )}
      {isClaim && (
        <Box
          height={"100px"}
          width={"300px"}
          // bgcolor={"purple"}
          marginX={"auto"}
          mt={"-100px"}
        >
          <Typography color={"#82CE34"}>
            You Have Successfully Applied The Claim
          </Typography>
          <Typography color={"#FFFE7A"} fontSize={"22px"}>
            Waiting For The Conformation
          </Typography>
          <Typography>(Generally takes 2 - 3 hrs for processing...)</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Claim;



// import React, { useState, useEffect } from 'react';
// import './StarAnimation.css';

// const StarAnimation = () => {
//   const [stars, setStars] = useState([]);

//   useEffect(() => {
//     // Generate an array of stars with random positions
//     const newStars = Array.from({ length: 50 }, () => ({
//       x: Math.random() * window.innerWidth,
//       y: Math.random() * window.innerHeight,
//     }));

//     // Update the state with the new array of stars
//     setStars(newStars);

//     // Update the position of each star every 50 milliseconds
//     const intervalId = setInterval(() => {
//       setStars(stars => {
//         return stars.map(star => ({
//           x: star.x,
//           y: star.y + 5,
//         }));
//       });
//     }, 50);

//     // Clean up the interval when the component unmounts
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="star-container">
//       {stars.map((star, index) => (
//         <div key={index} className="star" style={{ top: star.y, left: star.x }} />
//       ))}
//     </div>
//   );
// };

// export default StarAnimation;
