import React from 'react';

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import {
    Grass,
    Cloud,
    Straighten,
    CurrencyRupee,
  } from "@mui/icons-material";

const field = (props: { crop: any; season: any; area: any; income: any; }) => {

  const {crop, season, area, income} = props;

    return (
        <Box>
            <Card style={{
              borderRadius: '10px',
              boxShadow: "0px 0px 20px cornflowerblue",
            }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "10px",
                paddingX: "5px",
              }}
            >
              <Stack direction={"column"} gap={1} width={"100%"}>
                <Typography
                  fontSize={21}
                  fontWeight={600}
                  color={"cornflowerblue"}
                  textAlign={"center"}
                >
                  Field
                </Typography>

                <Stack direction={"row"} gap={0.5} padding={1}>
                  <Grass />
                  <Typography fontSize={15} color={"#808191"}>
                    Crop : {crop}
                  </Typography>
                </Stack>

                <Stack direction={"row"} gap={0.5} padding={1}>
                  <Cloud />
                  <Typography fontSize={15} color={"#808191"}>
                    Season : {season}
                  </Typography>
                </Stack>

                <Stack direction={"row"} gap={0.5} padding={1}>
                  <Straighten />
                  <Typography fontSize={15} color={"#808191"}>
                    Area of field : {area}
                  </Typography>
                </Stack>

                <Stack direction={"row"} gap={0.5} padding={1}>
                  <CurrencyRupee />
                  <Typography fontSize={15} color={"#808191"}>
                    Average Income : {income}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
    )
}

export default field;