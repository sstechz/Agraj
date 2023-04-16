import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";

const Temperature = (grandProp: { district: any; }) => {
  const {district} = grandProp;

  const client = axios.create({
    baseURL: "http://api.weatherapi.com/v1/forecast.json",
  });

  const [max, setMax] = useState([]);
  const [min, setMin] = useState([]);
  const [avg, setAvg] = useState([]);
  const [icon, setIcon] = useState([]);

  useEffect(() => {
    client
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=cb2d3ae66a764b4d905134207232703&q=${district}&days=1&aqi=yes&alerts=yes`
      )
      .then((response) => {
        const allMax = response.data.forecast.forecastday[0].day.maxtemp_c;
        const allMin = response.data.forecast.forecastday[0].day.mintemp_c;
        const allAvg = response.data.forecast.forecastday[0].day.avgtemp_c;
        const allIcon = response.data.current.condition.icon;

        setMax(allMax);
        setMin(allMin);
        setAvg(allAvg);
        setIcon(allIcon);

        // setPosts(response.data);
        // console.log(posts);
      });
  }, []);

  const props = {
    Min: min,
    Max: max,
    Avg: avg,
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
          backgroundColor: "#2B68A0",
          boxShadow: "0px 0px 30px #306BA2",
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
                Temp.
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
                Current (°C)
              </Typography>
              <Stack direction={"row"} gap={6} mt={1}>
                <Stack direction={"column"}>
                  <Typography fontSize={30} fontWeight={500}>
                    {props.Max}
                  </Typography>
                  <Typography fontSize={12} fontWeight={300}>
                    Max
                  </Typography>
                </Stack>

                <Stack direction={"column"}>
                  <Typography fontSize={30} fontWeight={500}>
                    {props.Min}
                  </Typography>
                  <Typography fontSize={12} fontWeight={300}>
                    Min
                  </Typography>
                </Stack>
              </Stack>

              <Typography fontSize={15} fontWeight={300} mt={1}>
                Avg Temp. {props.Avg}
              </Typography>

              <img src={props.Icon} />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Temperature;
