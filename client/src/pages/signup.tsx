// This file is not actually used in the project
// There is a signup form itself inside the App.js file


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
import react from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import App from "App"

function MyForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [picture, setPicture] = useState("");
  const [district, setDistrict] = useState("");
  const [crop, setCrop] = useState("");
  const [season, setSeason] = useState("");
  const [area, setArea] = useState("");
  const [income, setIncome] = useState("");

  const handleSignUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const url = "http://localhost:8081/submit-signup";

    setIsLoading(true);

    // console.log("From the sign-UP page, value of gender is : ", gender);

    try {
      axios
        .post(url, {
          name: name,
          email: email,
          phone: phone,
          age: age,
          gender: gender,
          district: district,
          crop: crop,
          season: season,
          area: area,
          income: income,
          password: password,
        })
        .then(function (response) {
          console.log(response);
          window.location.href = "/linein";
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      // paddingTop={"170px"}
      sx={{
        // height={'100vh'} width={'100wh'}
        // backgroundImage: 'url("https://i.gifer.com/CzMt.gif")',
        // backgroundSize: "cover",
        // WebkitBackgroundSize: "100%",
        backgroundColor: "red",
        height: "100vh",
        width: "100vw",
        // backgroundImage: "https://miro.medium.com/v2/resize:fit:1000/1*H1Tds2N88Oj07-e2u8EbSg.gif",
        // backgroundColor: "yellow",
        // backgroundSize: "100%",
        // backgroundRepeat: "no-repeat"
      }}
    >
      <Box
        height={"600px"}
        width={"1000px"}
        // bgcolor={"yellow"}
        style={{
          margin: "auto",
          marginTop: "50px",
          borderWidth: "5px",
          borderStyle: "dotted",
          borderRadius: "10px",
          borderColor: "cornflowerblue",
          boxShadow: "3px 5px 30px cornflowerblue",
        }}
      >
        <Typography fontSize={21} fontWeight={600} pl={"21px"} mt={"30px"}>
          Register User Details
        </Typography>

        <form onSubmit={handleSignUp}>
          <Stack direction={"row"} height={450}>
            <Stack
              direction={"column"}
              width={450}
              margin={"auto"}
              // bgcolor={"pink"}
            >
              <FormControl>
                <FormHelperText
                  sx={{
                    mt: "10px",
                  }}
                >
                  Name
                </FormHelperText>
                <TextField
                  value={name}
                  fullWidth
                  required
                  color="info"
                  onChange={(e) => setName(e.target.value)}
                />

                <FormHelperText
                  sx={{
                    mt: "10px",
                  }}
                >
                  Email
                </FormHelperText>
                <TextField
                  value={email}
                  fullWidth
                  required
                  color="info"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <FormHelperText
                  sx={{
                    mt: "10px",
                  }}
                >
                  Phone
                </FormHelperText>
                <TextField
                  value={phone}
                  fullWidth
                  required
                  color="info"
                  onChange={(e) => setPhone(e.target.value)}
                />

                <FormHelperText
                  sx={{
                    mt: "10px",
                  }}
                >
                  Age
                </FormHelperText>
                <TextField
                  value={age}
                  fullWidth
                  required
                  color="info"
                  onChange={(e) => setAge(e.target.value)}
                />

                <FormControl
                  fullWidth
                  sx={{
                    mt: "25px",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>

                <FormHelperText
                  sx={{
                    mt: "10px",
                  }}
                >
                  Password
                </FormHelperText>
                <TextField
                  value={password}
                  required
                  color="info"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </Stack>

            {/* ----------------------Right side of the form------------------------ */}
            <Stack
              direction={"column"}
              width={450}
              margin={"auto"}
              // bgcolor={"red"}
            >
              <FormControl>
                <FormHelperText
                  sx={{
                    mt: "10px",
                  }}
                >
                  District
                </FormHelperText>
                <TextField
                  value={district}
                  fullWidth
                  required
                  color="info"
                  onChange={(e) => setDistrict(e.target.value)}
                />

                <FormControl
                  sx={{
                    mt: "25px",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">Crop</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Crop"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                  >
                    <MenuItem value="Millets">Millets</MenuItem>
                    <MenuItem value="Pulses">Pulses</MenuItem>
                    <MenuItem value="Cereals">Cereals</MenuItem>
                    <MenuItem value="Oilseeds">Oilseeds</MenuItem>
                  </Select>
                </FormControl>

                <FormControl
                  sx={{
                    mt: "25px",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">Season</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Season"
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                  >
                    <MenuItem value="Rabi">Rabi</MenuItem>
                    <MenuItem value="Kharif">Kharif</MenuItem>
                  </Select>
                </FormControl>

                <FormHelperText
                  sx={{
                    mt: "10px",
                  }}
                >
                  Area (in hectares)
                </FormHelperText>
                <TextField
                  value={area}
                  fullWidth
                  required
                  color="info"
                  onChange={(e) => setArea(e.target.value)}
                />

                <FormHelperText
                  sx={{
                    mt: "10px",
                  }}
                >
                  🪙Income
                </FormHelperText>
                <TextField
                  value={income}
                  fullWidth
                  required
                  color="info"
                  onChange={(e) => setIncome(e.target.value)}
                />
              </FormControl>

              <Box textAlign={"center"} margin={"auto"}>
                <Button
                  sx={{
                    marginTop: "30px",
                    color: "Highlight",
                    fontSize: "24px",
                  }}
                  style={{
                    boxShadow: "3px 5px 30px highlight",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </Stack>
          </Stack>
        </form>
        {isLoading && (
          <Box mt={"21px"}>
            <LinearProgress color="info" />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default MyForm;
