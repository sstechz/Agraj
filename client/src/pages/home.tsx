import React from "react";

import CircularProgress from "@mui/material/CircularProgress";

import { Suspense } from "react";

const Home = React.lazy(() => import("../pageRender/homeComponents"));

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
    <Suspense
      fallback={
        <>
          <CircularProgress />
          Loading...
        </>
      }
    >
      <Home
        userApplied={userApplied}
        name={name}
        gender={gender}
        phone={phone}
        age={age}
        district={district}
        crop={crop}
        season={season}
        area={area}
        income={income}
      />
    </Suspense>
  );
};

export default home;
