import React from "react";
import { useList } from "@refinedev/core";
import { Box, Stack, Typography } from "@mui/material";

import { ApplyForm } from "components";

const apply = (props: { userApplied: any; company: any }) => {
  return <ApplyForm userApplied={props.userApplied} company={props.company} />;
};

export default apply;
