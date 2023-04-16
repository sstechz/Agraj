import React, { useState } from "react";

import Insurance from "../pageRender/insuranceComponent";

import { Stack, Typography, Box } from "@mui/material";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";

import data from "../constants/companies.json";

const Companies = () => {
  // const [cards, setCards] = useState([]);

  // console.log(data.members);

  // setCards(data);

  const companiesRender = data.map(
    (el) => (
      <Insurance
        name={el.name}
        icon={el.icon}
        phone={el.phone}
        email={el.email}
        schemes={el.schemes}
        url={el.url}
      />
    )
  );

  return (
    <Box>
      { companiesRender }
    </Box>
  );

};

export default Companies;
