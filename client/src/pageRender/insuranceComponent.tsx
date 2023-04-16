import React from "react";
import { Stack, Typography } from "@mui/material";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";

let data = require("../constants/companies.json");

//  this props is necessary to pass the properties during binding
type insuranceProps = {
  name: any;
  icon: any;
  phone: any;
  email: any;
  schemes: any;
  url: any;
}

const insurance = ({name, icon, phone, email, schemes, url}: insuranceProps) => {
  return (
    <List
      sx={{
        width: "550px",
        // maxWidth: 400,
        margin: 'auto',
        marginTop: '30px',
        // bgcolor: "background.paper",
        bgcolor: '#0D1117',
        borderRadius: "10px",
        boxShadow: "0px 0px 10px #FF007F",
      }}
    >
      <ListItem alignItems="flex-start" >
        <ListItemAvatar>
          <Avatar alt="img1" src={icon} />
        </ListItemAvatar>

        <Stack direction={"row"} width={'500px'}>
          <ListItemText
            // sx={{ bgcolor: "pink" }}
            primary={
              <React.Fragment>
                <Stack
                  direction={"row"}
                  sx={{
                    width: "110%",
                  }}
                >
                  <Stack direction={"column"} width={'400px'}>
                    <Typography
                      sx={{
                        fontSize: "larger",
                        fontWeight: "bold",
                        color: "#FF007F",
                      }}
                    >
                      {name}
                    </Typography>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      // variant="body2"
                      color="#fcfcfc"
                    >
                      Schemes : {schemes}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "3",
                        color: "#fcfcfc",
                      }}
                    >
                      Phone : {phone}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "3",
                        color: "#fcfcfc",
                      }}
                    >
                      Email :{" "}
                      <a
                        href={`mailto:${email}`}
                        style={{
                          color: "#708238",
                        }}
                      >
                        {email}
                      </a>
                    </Typography>
                  </Stack>

                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      margin: "auto 0px",
                      color: "#fcfcfc",
                    }}
                  >
                    <IconButton>
                      <LaunchIcon />
                    </IconButton>
                  </a>
                </Stack>
              </React.Fragment>
            }
          />
        </Stack>
      </ListItem>
    </List>
  );
};

export default insurance;
