import { AuthBindings, Authenticated, Refine } from "@refinedev/core";

import {
  HomeSharp,
  Pages,
  SwipeDownAltSharp,
  SwipeUpAltSharp,
  VerifiedSharp,
} from "@mui/icons-material";

import { Home, Companies, Apply, Claim, AfterApply } from "pages";

import {
  ErrorComponent,
  Layout,
  RefineSnackbarProvider,
  notificationProvider,
} from "@refinedev/mui";

import { CssBaseline, GlobalStyles } from "@mui/material";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "interfaces/google";

import { Login } from "pages/login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

// import SignUp from "pages/signup";
import LoginForm from "pages/linein";

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
  LinearProgress,
} from "@mui/material";
import react from "react";
import { useState, useEffect } from "react";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  //  using to trigger logout user once the page is refreshed
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  function handleBeforeUnload() {
    // Perform the logout action here
    // For example, call a logout API or clear local storage

    const token = localStorage.getItem("token");

    if (token && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      axios.defaults.headers.common = {};
    }

    return {
      success: true,
      redirectTo: "/linein",
    };

    // console.log("Logging out...");
  }

  //  declaring all the states inside the App rather than MyForm
  //  to pass them as props to the other components/ pages
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

  const [userApplied, setUserApplied] = useState(false);

  const [company, setCompany] = useState("");

  //  these functions helps in updating the states at the child level, we can pass
  //  the respective fuction as props to the child component for updation at that level

  const handleNameChange = (newName: string) => {
    setName(newName);
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handlePhoneChange = (newPhone: string) => {
    setPhone(newPhone);
  };

  const handleAgeChange = (newAge: string) => {
    setAge(newAge);
  };

  const handleGenderChange = (newGender: string) => {
    setGender(newGender);
  };

  const handleDistrictChange = (newDistrict: string) => {
    setDistrict(newDistrict);
  };

  const handleCropChange = (newCrop: string) => {
    setCrop(newCrop);
  };

  const handleSeasonChange = (newSeason: string) => {
    setSeason(newSeason);
  };

  const handleAreaChange = (newArea: string) => {
    setArea(newArea);
  };

  const handleIncomeChange = (newIncome: string) => {
    setIncome(newIncome);
  };

  const handleUserAppliedChange = (newUserApplied: boolean) => {
    setUserApplied(newUserApplied);
  };

  const handleCompanyChange = (newCompany: string) => {
    setCompany(newCompany);
  };

  // // Below block of code for checking whether the user has applied or not
  // const [userApplied, setUserApplied] = useState(false);

  // const checkUserApplied = async (name) => {
  //   const response = await axios.get('http://localhost:8081/checkUserApplied');
  //   return response;
  // }

  // useEffect(() => {
  //   const fetchUserApplied = async() => {
  //     const applied = await checkUserApplied(`${name}`);
  //     setUserApplied(applied);
  //   };
  //   fetchUserApplied();

  //   // axios.get("http://localhost:8081/checkUserApplied")
  //   // .then(response => {
  //   //   setUserApplied(response.data)
  //   // })
  //   // .catch(error => {
  //   //   console.error(error);
  //   // });
  // },[]);

  // useEffect(() => {
  //   const url = "http://localhost:8081/check-user-applied";

  //   async function fetchData() {
  //     try {
  //       const response = await axios.post(url, {
  //         // name: name,
  //         email: email,
  //       });

  //       if (response.status === 200) {
  //         setUserApplied(true);

  //         // const userResponse = await axios.get(
  //         //   `http://localhost:8081/applied-user/${email}`
  //         // );

  //         // console.log(userResponse.data);

  //         console.log(response.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // },[]);

  function MyForm() {
    //  declaring an 'isLoading' state for holding the state of circular/ linear loading progression while submitting the form
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = (e: { preventDefault: () => void }) => {
      e.preventDefault();

      setIsLoading(true);

      const url = "http://localhost:8081/submit-signup";

      console.log("From the sign-UP page, value of gender is : ", gender);

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
        // setName("");
        // setPhone("");
        // setGender("");
        // setAge("");
        // setSeason("");
        // setDistrict("");
        // setCrop("");
        // setEmail("");
        // setArea("");
        // setIncome("");
        // setPassword("");
        // setIsLoading(false);
      }
    };

    return (
      <Box
        paddingTop={"80px"}
        sx={{
          // height={'100vh'} width={'100wh'}
          backgroundImage: 'url("https://i.gifer.com/CzMt.gif")',
          backgroundSize: "cover",
          WebkitBackgroundSize: "125%",
          backgroundPositionX: "center",
          backgroundPositionY: "-50px",
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
          bgcolor={""}
          style={{
            margin: "auto",
            // marginTop: "50px",
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
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
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
                    <InputLabel id="demo-simple-select-label">
                      Season
                    </InputLabel>
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
        </Box>
        {isLoading && (
          <Box pt={"50px"} width={"1000px"} margin={"auto"}>
            <LinearProgress color="info" />
          </Box>
        )}
      </Box>
    );
  }

  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
          })
        );

        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      //  redirects to the linein (signin) page
      //  and refreshes the page to update it with new data
      window.location.href = "/linein";
      window.location.reload();

      return {
        success: true,
        // redirectTo: "/linein",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: new Error("Not authenticated"),
        logout: true,
        redirectTo: "/linein",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            resources={[
              {
                name: "Home",
                options: { label: "Home" },
                list: "/home",
                icon: <HomeSharp />,
              },

              {
                name: "Insurance Co.",
                options: { label: "Insurance Co." },
                list: "/insurance-companies",
                icon: <VerifiedSharp />,
              },

              {
                name: "Apply",
                options: { label: "Apply" },
                list: "/apply-insurance",
                icon: <SwipeUpAltSharp />,
              },

              {
                name: "Claim",
                options: { label: "Claim" },
                list: "/claim-insurance",
                icon: <SwipeDownAltSharp />,
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  //  Prior loading of http://localhost:3000/linein page for authentication
                  <Authenticated fallback={<CatchAllNavigate to="/linein" />}>
                    <Layout Header={Header}>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route path="">
                  <Route
                    index
                    element={
                      <Home
                        userApplied={userApplied}
                        name={name}
                        gender={gender}
                        age={age}
                        phone={phone}
                        district={district}
                        crop={crop}
                        season={season}
                        area={area}
                        income={income}
                      />
                    }
                  />
                </Route>

                <Route path="/home">
                  <Route
                    index
                    element={
                      <Home
                        userApplied={userApplied}
                        name={name}
                        gender={gender}
                        age={age}
                        phone={phone}
                        district={district}
                        crop={crop}
                        season={season}
                        area={area}
                        income={income}
                      />
                    }
                  />
                </Route>

                <Route path="/insurance-companies">
                  <Route index element={<Companies />} />
                </Route>

                <Route path="/claim-insurance">
                  <Route index element={<Claim />} />
                </Route>

                {!userApplied && (
                  <Route path="/apply-insurance">
                    <Route
                      index
                      element={
                        <Apply
                          userApplied={handleUserAppliedChange}
                          company={handleCompanyChange}
                        />
                      }
                    />
                  </Route>
                )}

                {userApplied && (
                  <Route path="/apply-insurance">
                    <Route
                      index
                      element={
                        <AfterApply
                          name={name}
                          area={area}
                          season={season}
                          company={company}
                        />
                      }
                    />
                  </Route>
                )}
              </Route>

              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                {/* <Route path="/login" element={<Login />} /> */}
                {/* creating  a registration route */}
                <Route
                  path="/linein"
                  element={
                    <LoginForm
                      userApplied={handleUserAppliedChange}
                      user={handleNameChange} //  passing name as user to the login page
                      email={handleEmailChange}
                      gender={handleGenderChange}
                      age={handleAgeChange}
                      phone={handlePhoneChange}
                      district={handleDistrictChange}
                      crop={handleCropChange}
                      season={handleSeasonChange}
                      area={handleAreaChange}
                      income={handleIncomeChange}
                      company={handleCompanyChange}
                    />
                  }
                />
                <Route path="/signup" element={MyForm()} />
              </Route>
              <Route
                element={
                  <Authenticated>
                    <Layout Header={Header}>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>

            <UnsavedChangesNotifier />
          </Refine>
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
