import React from "react";
import { Box, Typography, Stack, ListItemAvatar, Avatar } from "@mui/material";
import { Alert } from "@mui/lab";

const AfterApply = (props: {
  name: any;
  area: any;
  company: any;
  season: any;
}) => {
  return (
    <Box
    // bgcolor={"red"}
    >
      <Stack direction={"column"}>
        <Alert
          variant="filled"
          severity="success"
          sx={{
            width: "250px",
            marginX: "auto",
            border: "solid",
            borderWidth: "3px",
            gap: "20px",
            borderColor: "black",
          }}
        >
          Applied Successfully !
        </Alert>

        {/* Certification Container */}
        <Box
          sx={{
            width: "900px",
            height: "550px",
            marginX: "auto",
            marginTop: "30px",
            // boxshadow: '3px 5px 10px cornflowerblue',
            borderRadius: "10px",
            backgroundColor: "cornflowerblue",
          }}
        >
          {/* Certificate Block */}
          <Box
            sx={{
              width: "850px",
              height: "500px",
              marginX: "auto",
              marginTop: "25px",
              borderRadius: "10px",
              // backgroundColor: 'cornflowerblue',
              padding: "15px",
              backgroundColor: "#0F1628",
            }}
          >
            {/* Topmost Stack (column) , contains(header, body, footer) */}
            <Stack
              direction={"column"}
              gap={5}
              sx={{
                padding: "10px",
                height: "100%",
                // backgroundColor: "orange",
              }}
            >
              {/* header */}
              <Stack
                direction={"row"}
                sx={{
                  marginTop: "10px",
                  // backgroundColor: "purple",
                }}
              >
                {/* Head Title */}
                <Stack direction={"column"} width={'50%'}>
                  <Typography
                    sx={{
                      color: "cornflowerblue",
                      fontWeight: "500",
                      fontSize: "18px",
                    }}
                  >
                    INSURED
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "18px",
                    }}
                  >
                    {props.company}
                  </Typography>
                </Stack>

                {/* Head Logo */}
                <Box width={'50%'} display={'flex'} justifyContent={'flex-end'}>
                  <Box
                    sx={{
                      // backgroundColor: "violet",
                      width: "50px",
                    }}
                  >
                    <Avatar
                      alt="img1"
                      sx={{
                        height: "100%",
                        width: "100%",
                        // backgroundColor: "khaki",
                      }}
                      src={
                        "https://i.pinimg.com/originals/8f/27/f6/8f27f69c0798078c5142507ee4ca8852.png"
                      }
                    />
                  </Box>
                </Box>
              </Stack>

              {/* Body */}
              <Stack direction={"row"}>
                {/* Details */}
                <Stack
                  direction={"column"}
                  // bgcolor={"yellow"}
                >
                  <Typography
                    sx={{
                      color: "cornflowerblue",
                      fontWeight: "500",
                      fontSize: "18px",
                    }}
                  >
                    INSURANCE DETAILS
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "24px",
                    }}
                  >
                    {props.name} has Successfully applied
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "24px",
                    }}
                  >
                    For The Insurance In 
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "24px",
                    }}
                  >
                    {props.company}
                  </Typography>
                  <Typography
                    sx={{
                      marginTop: "15px",
                      fontWeight: "500",
                      fontSize: "18px",
                    }}
                  >
                    Area Insured : {props.area} Acres
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "18px",
                    }}
                  >
                    Applied for {props.season} Season (Oct - Jun)
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "18px",
                    }}
                  >
                    Estimated Amount of the Asset is Rs. {props.area * 157200}
                  </Typography>
                </Stack>

                {/* DP */}
                <Box
                  // bgcolor={'red'}
                  sx={{
                    width: "200px",
                    height: "100%",
                    marginLeft: "150px",
                    // marginTop: '5px',
                  }}
                >
                  <Avatar
                    alt="img1"
                    sx={{
                      //   marginTop: "-10px",
                      height: "100%",
                      width: "100%",
                      // width: '40%',
                      // imageResolution: 'from-image',
                      //   backgroundColor: 'khaki',
                    }}
                    src={
                      "https://img.freepik.com/free-photo/portrait-cheerful-caucasian-man_53876-13440.jpg"
                    }
                  />
                </Box>
              </Stack>

              {/* Footer */}
              <Stack direction={"row"} height={"80px"}>
                <Box
                  //   bgcolor={"yellow"}
                  marginX={"auto"}
                  // height={'50%'}
                  // width={"50%"}
                  // sx={{
                  //     marginX: 'auto',
                  // }}
                >
                  <img
                    style={{
                      marginLeft: "25%",
                      marginTop: "21px",
                    }}
                    height={"50%"}
                    width={"50%"}
                    src={
                      "https://t3.ftcdn.net/jpg/04/55/98/02/360_F_455980284_HWTVFiS98QV3SKnA4DTFcEcXSLbF82uw.jpg"
                    }
                  />
                </Box>
                <Box marginX={"auto"}>
                  <Typography
                    sx={{
                      color: "cornflowerblue",
                      fontWeight: "500",
                      fontSize: "18px",
                      marginTop: "28px",
                    }}
                  >
                    Apr 12 - Apr 16, 2023
                  </Typography>
                </Box>
                <Box marginX={"auto"}>
                  <Typography
                    sx={{
                      color: "cornflowerblue",
                      fontWeight: "500",
                      fontSize: "18px",
                      marginTop: "28px",
                    }}
                  >
                    ShreySahay.com
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default AfterApply;
