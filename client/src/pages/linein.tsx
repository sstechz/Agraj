import {
  Typography,
  Box,
  Stack,
  FormControl,
  FormHelperText,
  TextField,
  Button,
  LinearProgress,
} from "@mui/material";
import react from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Alert from "@mui/material/Alert";

function LoginForm(props: {
  userApplied: (arg0: any) => void; 
  user: (arg0: any) => void;
  email: (arg0: any) => void;
  gender: (arg0: any) => void;
  age: (arg0: any) => void;
  phone: (arg0: any) => void;
  district: (arg0: any) => void;
  crop: (arg0: any) => void;
  season: (arg0: any) => void;
  area: (arg0: any) => void;
  income: (arg0: any) => void;
  company: (arg0: any) => void;
}) {
  // const { user, phone, gender, age, district, crop, season, area, income } =
  //   props;

  //  these states are defined inside the linein component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: null,
    gender: "",
    age: null,
    district: "",
    crop: "",
    season: "",
    area: null,
    income: null,
  });

  // const [userApplied, setUserApplied] = useState(false);

  props.userApplied(false);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    //  endpoint url for accessing the submit-login page from our backend API
    const url = "https://agraj.onrender.com/submit-login";

    try {
      const response = await axios.post(url, {
        email: email,
        password: password,
      });

      setEmail("");
      setPassword("");

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        setIsSuccess(true);

        const userResponse = await axios.get(
          `https://agraj.onrender.com/user/${email}`
        );
        setUserData(userResponse.data);

        props.user(userResponse.data.name);
        props.email(userResponse.data.email);
        props.gender(userResponse.data.gender);
        props.age(userResponse.data.age);
        props.phone(userResponse.data.phone);
        props.district(userResponse.data.district);
        props.crop(userResponse.data.crop);
        props.season(userResponse.data.season);
        props.area(userResponse.data.area);
        props.income(userResponse.data.income);

        const response2 = await axios.post("https://agraj.onrender.com/check-user-applied", {
          email: userResponse.data.email,
        });

        if (response2.status === 200) {
          props.userApplied(true);
          console.log(response2.data);

          props.company(response2.data.insurance)
        }
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  function handleCloseError() {
    setIsError(false);
    setEmail("");
    setPassword("");
  }

  return (
    <Box
      paddingTop={"170px"}
      sx={{
        // height={'100vh'} width={'100wh'}
        backgroundImage: 'url("https://i.gifer.com/CzMt.gif")',
        backgroundSize: "cover",
        WebkitBackgroundSize: "100%",
        height: "100vh",
        width: "100vw",
        // backgroundImage: "https://miro.medium.com/v2/resize:fit:1000/1*H1Tds2N88Oj07-e2u8EbSg.gif",
        // backgroundColor: "yellow",
        // backgroundSize: "100%",
        // backgroundRepeat: "no-repeat"
      }}
    >
      {isError && (
        <Box width={"20%"} marginTop={"-80px"} ml={"40%"} mb={"30px"}>
          <Alert variant="filled" severity="info" onClose={handleCloseError}>
            Invalid Username or Password !
          </Alert>
        </Box>
      )}
      {isSuccess && (
        <Box width={"20%"} marginTop={"-80px"} ml={"40%"} mb={"30px"}>
          <Alert variant="filled" severity="success">
            Logged In Successfully !
          </Alert>
        </Box>
      )}
      <Box
        height={"420px"}
        width={"300px"}
        bgcolor={""}
        style={{
          margin: "auto",
          // marginTop: "175px",
          // paddingTop: '175px',
          borderWidth: "5px",
          borderStyle: "dotted",
          borderRadius: "10px",
          borderColor: "cornflowerblue",
          boxShadow: "3px 5px 30px cornflowerblue",
        }}
      >
        <Typography fontSize={21} fontWeight={600} pl={"21px"} mt={"30px"}>
          Login
        </Typography>

        <Stack direction={"row"}>
          <Typography fontSize={10} pl={"21px"}>
            Doesn't have an account yet?
          </Typography>

          <Typography fontSize={10} ml={"5px"}>
            <Link
              to="/signup"
              style={{
                color: "cornflowerblue",
              }}
            >
              SignUP
            </Link>
          </Typography>
        </Stack>

        <Stack direction={"column"} mt={"30px"}>
          <form onSubmit={handleLogin}>
            <FormControl>
              <Box padding={"18px"} width={"120%"}>
                <FormHelperText>Username/ Email</FormHelperText>
                <TextField
                  value={email}
                  // type="email"
                  fullWidth
                  required
                  color="info"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              <Box padding={"18px"} width={"120%"}>
                <FormHelperText>Password</FormHelperText>
                <TextField
                  value={password}
                  type="password"
                  fullWidth
                  required
                  color="info"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>

              <Box padding={"18px"}>
                <Button
                  sx={{
                    marginTop: "10px",
                    color: "Highlight",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </FormControl>
          </form>
          {isLoading && (
            <Box mt={"30px"}>
              <LinearProgress color="info" />
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

export default LoginForm;
