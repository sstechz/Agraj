import React from 'react';

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { Place, Wc, LocalPhone, SafetyCheckOutlined } from "@mui/icons-material";

const farmer = (props: { name: any; gender: any; phone: any; age: any; district: any; }) => {

  const {name, gender, phone, age, district} = props;

    return (
        <Box>      
            <Card style={{
              borderRadius: "10px",
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
                    {name}
                  </Typography>

                  <Stack direction={"row"} gap={0.5} padding={1}>
                    <Wc />
                    <Typography fontSize={15} color={"#808191"}>
                      {gender}
                    </Typography>
                  </Stack>
      
                  <Stack direction={"row"} gap={0.5} padding={1}>
                    <SafetyCheckOutlined />
                    <Typography fontSize={15} color={"#808191"}>
                      {age} years (Age)
                    </Typography>
                  </Stack>
      
                  <Stack direction={"row"} gap={0.5} padding={1}>
                    <LocalPhone />
                    <Typography fontSize={15} color={"#808191"}>
                      +91 {phone}
                    </Typography>
                  </Stack>
      
                  <Stack direction={"row"} gap={0.5} padding={1}>
                    <Place />
                    <Typography fontSize={15} color={"#808191"}>
                      {district}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
        </Box>
      )
}

export default farmer;
