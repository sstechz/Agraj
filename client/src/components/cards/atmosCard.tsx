import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";

const Atmosphere = (grandProp: { district: any; }) => {
  const {district} = grandProp;

  const client = axios.create({
    baseURL: "http://api.weatherapi.com/v1/forecast.json",
  });

  const [cond, setCond] = useState([]);
  const [uv, setUv] = useState([]);
  const [rain, setRain] = useState([]);
  const [icon, setIcon] = useState([]);

  useEffect(() => {
    client
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=cb2d3ae66a764b4d905134207232703&q=${district}&days=1&aqi=yes&alerts=yes`
      )
      .then((response) => {
        const allCond = response.data.forecast.forecastday[0].day.condition.text;
        const allUv = response.data.current.uv;
        const allRain = response.data.forecast.forecastday[0].day.daily_chance_of_rain;
        const allIcon = response.data.forecast.forecastday[0].day.condition.icon;

        setCond(allCond);
        setUv(allUv);
        setRain(allRain);
        setIcon(allIcon);

        // setPosts(response.data);
        // console.log(posts);
      });
  }, []);

  const props = {
    Cond : cond,
    Uv : uv,
    Rain : rain,
    Icon: "https:" + icon,
  };

  return (
    <Stack
      direction={"row"}
      gap={9}
      width={"250px"}
      height={"250px"}
      marginX={"auto"}
      // bgcolor={"yellow"}
      // mt={6}
    >
      <Card
        style={{
          width: "250px",
          borderRadius: "100%",
          backgroundColor: "#6D4D24",
          boxShadow: "0px 0px 30px #705129",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "115%",
            marginLeft: "-16px",
            // justifyContent: 'space-between',
            // gap: '10px',
            // paddingX: '5px'
            // backgroundColor: "red",
          }}
        >
          <Stack direction={"column"} gap={1} width={"100%"}>
            <Box
            // bgcolor={"red"}
            >
              <Typography
                fontSize={24}
                fontWeight={400}
                // color={"#00cc44"}
                textAlign={"center"}
              >
                Weather
              </Typography>
            </Box>

            <Stack
              direction={"column"}
              textAlign={"center"}
              bgcolor={"#212830"}
              width={"100%"}
              alignItems={"center"}
              mt={"5px"}
            >
              <Typography fontSize={18} fontWeight={300}>
                Forecast
              </Typography>
              <Stack direction={"row"} gap={6} mt={1}>
                <Stack direction={"column"}>
                  <Typography fontSize={30} fontWeight={500}>
                    {props.Rain}
                  </Typography>
                  <Typography fontSize={12} fontWeight={300}>
                    Rain %
                  </Typography>
                </Stack>

                <Stack direction={"column"}>
                  <Typography fontSize={30} fontWeight={500}>
                    {props.Uv}
                  </Typography>
                  <Typography fontSize={12} fontWeight={300}>
                    U.V.
                  </Typography>
                </Stack>
              </Stack>

              <Typography fontSize={15} fontWeight={300} mt={1}>
                {props.Cond}
              </Typography>

              <img src={props.Icon} />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Atmosphere;
