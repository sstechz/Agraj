import React from "react";

import { Box, Stack, Typography } from "@mui/material";

import { Farmer, Field, TemperatureCard, AtmosphereCard } from "../components";

const home = (props: {
  userApplied: any;
  name: any;
  gender: any;
  phone: any;
  age: any;
  district: any;
  crop: any;
  season: any;
  area: any;
  income: any;
}) => {
  const {
    userApplied,
    name,
    gender,
    phone,
    age,
    district,
    crop,
    season,
    area,
    income,
  } = props;

  return (
    <Box>
      <Stack
        direction={"row"}
        gap={30}
        width={"90%"}
        marginX={"auto"}
        // bgcolor={"pink"}
      >
        <Stack direction={"column"} width={"100%"} >
          <Farmer
            name={name}
            gender={gender}
            age={age}
            phone={phone}
            district={district}
          />
        </Stack>

        <Stack
          direction={"column"}
          width={"100%"}
          gap={4}
          // bgcolor={"yellowgreen"}
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmGzeKBhKrW9wFogNXA_0ONmkxkHx4vpuuujax7yJla-QKBkI&s"
            alt="profile-image"
            style={{
              borderRadius: "10px",
              height: "100%",
              width: "100%",
            }}
          />
        </Stack>

        <Stack direction={"column"} width={"100%"} >
          <Field crop={crop} season={season} area={area} income={income} />
        </Stack>
      </Stack>

      <Stack
        direction={"row"}
        width={"90%"}
        marginX={"auto"}
        // bgcolor={"cornflowerblue"}
        mt={"30px"}
      >
        <TemperatureCard district={district} />
        <AtmosphereCard district={district} />
      </Stack>
    </Box>
  );
};

export default home;
