import { useState, useEffect } from "react";
import axios from "axios";

import { Box, Typography } from "@mui/material";

const App = () => {
  const client = axios.create({
    baseURL: "http://api.weatherapi.com/v1/forecast.json",
  });

  const [max, setMax] = useState([]);
  const [min, setMin] = useState([]);
  const [avg, setAvg] = useState([]);

  useEffect(() => {
    client
      .get(
        "http://api.weatherapi.com/v1/forecast.json?key=cb2d3ae66a764b4d905134207232703&q=gumla&days=1&aqi=yes&alerts=yes"
      )
      .then((response) => {
        const allMax = response.data.forecast.forecastday[0].day.maxtemp_c;
        const allMin = response.data.forecast.forecastday[0].day.mintemp_c;
        const allAvg = response.data.forecast.forecastday[0].day.avgtemp_c;

        setMax(allMax);
        setMin(allMin);
        setAvg(allAvg);

        // setPosts(response.data);
        // console.log(posts);
      });
  }, []);

  console.log(min, max, avg);

  const props = {
    Min : min,
    Max : max,
    Avg : avg
  };

  return (
    {props}
  );
};

export default App;
