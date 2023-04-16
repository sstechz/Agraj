import {
  Typography,
  Box,
  Stack,
  FormControl,
  FormHelperText,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import axios from "axios";

import Alert from "@mui/material/Alert";
import { set } from "react-hook-form";

// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs, { Dayjs } from "dayjs";

const Form = (props: {
  userApplied: (arg0: boolean) => void;
  company: (arg0: any) => void;
}) => {
  const [isSubmit, setIsSubmit] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [season, setSeason] = useState("");
  const [crop, setCrop] = useState("");
  const [insurance, setInsurance] = useState("");
  const [area, setArea] = useState("");
  const [bank, setBank] = useState("");
  const [accountNo, setAccountNo] = useState("");

  const handleApply = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const url = "http://localhost:8081/submit-apply";

    await axios
      .post(url, {
        name: name,
        phone: phone,
        gender: gender,
        age: age,
        email: email,
        aadhar: aadhar,
        season: season,
        crop: crop,
        insurance: insurance,
        area: area,
        bank: bank,
        accountNo: accountNo,
      })
      .then(async function (response) {
        console.log(response);

        const response2 = await axios.post(
          "http://localhost:8081/check-user-applied",
          {
            email: email,
          }
        );

        if (response2.status === 200) {
          props.userApplied(true);
          // console.log(response2.data);

          props.company(response2.data.insurance);
        }

        setName("");
        setPhone("");
        setAge("");
        setGender("");
        setEmail("");
        setAadhar("");
        setCrop("");
        setSeason("");
        setInsurance("");
        setArea("");
        setBank("");
        setAccountNo("");

        setIsSubmit(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Box>
      <Box width={300}>
        {isSubmit && (
          <Alert severity="success">Form Submitted Successfully !</Alert>
        )}
      </Box>
      <form
        onSubmit={handleApply}
        style={{
          marginTop: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <FormControl>
          <Stack direction={"row"} height={"550px"}>
            <Stack
              direction={"column"}
              bgcolor={"#0D1117"}
              marginX={"auto"}
              gap={0.5}
              borderRadius={"10px"}
              boxShadow={"0px 0px 10px cornflowerblue"}
              height={"550px"}
              width={"30%"}
            >
              <Box width={"300px"} marginX={"auto"}>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    // margin: "10px 0",
                    fontSize: 16,
                  }}
                >
                  Full Name
                </FormHelperText>
                <TextField
                  value={name}
                  fullWidth
                  required
                  color="info"
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box width={"300px"} marginX={"auto"}>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    // margin: "10px 0",
                    fontSize: 16,
                  }}
                >
                  Phone No.
                </FormHelperText>
                <TextField
                  fullWidth
                  required
                  color="info"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Box>

              <Box width={"300px"} marginX={"auto"}>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    // margin: "10px 0",
                    fontSize: 16,
                  }}
                >
                  Age
                </FormHelperText>
                <TextField
                  fullWidth
                  required
                  color="info"
                  variant="outlined"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Box>
              <Box width={"300px"} marginX={"auto"}>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    // margin: "10px 0",
                    fontSize: 16,
                  }}
                >
                  Email Address
                </FormHelperText>
                <TextField
                  fullWidth
                  required
                  color="info"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              <Box width={"300px"} marginX={"auto"}>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    // margin: "10px 0",
                    fontSize: 16,
                  }}
                >
                  Aadhar No.
                </FormHelperText>
                <TextField
                  fullWidth
                  required
                  color="info"
                  variant="outlined"
                  value={aadhar}
                  onChange={(e) => setAadhar(e.target.value)}
                />
              </Box>
              <Box marginX={"auto"}>
                <FormControl
                  sx={{
                    width: "300px",
                    marginTop: "20px",
                    // marginX: 'auto',
                    // backgroundColor: "red",
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
              </Box>
            </Stack>
            <Stack
              direction={"column"}
              bgcolor={"#0D1117"}
              marginX={"auto"}
              gap={0.5}
              borderRadius={"10px"}
              boxShadow={"0px 0px 10px cornflowerblue"}
              height={"550px"}
              width={"30%"}
            >
              <Box marginX={"auto"} marginTop={"28px"}>
                <FormControl
                  sx={{
                    width: "300px",
                    // backgroundColor: "red",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Select Crop
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Crop"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                  >
                    <MenuItem value="Millets">Millets</MenuItem>
                    <MenuItem value="Pulses">Pulses</MenuItem>
                    <MenuItem value="Cereals">Cereals</MenuItem>
                    <MenuItem value="Oilseeds">Oilseeds</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box marginX={"auto"} marginTop={"28px"}>
                <FormControl
                  sx={{
                    width: "300px",
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
              </Box>
              <Box marginX={"auto"} marginTop={"28px"}>
                <FormControl
                  sx={{
                    width: "300px",
                    // backgroundColor: "red",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Select Insurance Provider
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Insurance Provider"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
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
              </Box>
              <Box marginX={"auto"} marginTop={"28px"}>
                <FormControl
                  sx={{
                    width: "300px",
                    // backgroundColor: "red",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Select Your Bank
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Your Bank"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                  >
                    <MenuItem value="ICICI Bank">ICICI Bank</MenuItem>
                    <MenuItem value="HDFC Bank">HDFC Bank</MenuItem>
                    <MenuItem value="Axis Bank">Axis Bank</MenuItem>
                    <MenuItem value="State Bank Of India">
                      State Bank Of India
                    </MenuItem>
                    <MenuItem value="Bank Of India">Bank Of India</MenuItem>
                    <MenuItem value="Punjab National Bank">
                      Punjab National Bank
                    </MenuItem>
                    <MenuItem value="Central Bank Of India">
                      Central Bank Of India
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box width={"300px"} marginX={"auto"}>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    // margin: "10px 0",
                    fontSize: 16,
                  }}
                >
                  Field Area (in hectares)
                </FormHelperText>
                <TextField
                  fullWidth
                  required
                  color="info"
                  variant="outlined"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </Box>
              <Box width={"300px"} marginX={"auto"}>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    // margin: "10px 0",
                    fontSize: 16,
                  }}
                >
                  Bank Account No.
                </FormHelperText>
                <TextField
                  fullWidth
                  required
                  color="info"
                  variant="outlined"
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                />
              </Box>
            </Stack>
          </Stack>
          <Box marginX={"auto"} marginTop={'10px'}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                height: "50px",
                width: "150px",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default Form;
