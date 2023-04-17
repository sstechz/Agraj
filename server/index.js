import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import bodyParser from "body-parser";
import ULModel from "./mongodb/models/fLogin.js";
import UAModel from "./mongodb/models/fApply.js";

import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "Hello world Server started @ PORT : 8081 for AgRaj" });
});

app.use(bodyParser.urlencoded({ extended: true }));

// -------------------------------POST Request to check User Applied----------------------------

// app.post("/submit-login", async function (req, res) {
//   const { name, password } = req.body;

//   const client = new MongoClient(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   try {
//     await client.connect();

//     const users = client.db("test").collection("ulmodels");
//     const user = await users.findOne({ name: name });

//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }

//     const token = jwt.sign({ sub: user._id }, "secret", { expiresIn: "1h" });

//     return res.json({ token });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   } finally {
//     await client.close();
//   }

app.post('/check-user-applied', async function (req, res) {
  const {email} = req.body;

  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const users = client.db("test").collection("uamodels");
    const user = await users.findOne({email: email});

    if (!user) {
      return res.status(401).json({message: "User not applied for insurance"});
    }

    //  if user have applied for insurance, return their details
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
})


// -------------------------------POST Request for SignUp------------------------------------

app.post("/submit-signup", async function (req, res) {
  const form = new ULModel({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
    gender: req.body.gender,
    district: req.body.district,
    crop: req.body.crop,
    season: req.body.season,
    area: req.body.area,
    income: req.body.income,
    password: req.body.password,
  });

  // The error message MongooseError: Model.prototype.save() no longer accepts a callback means that the save() method of
  // the Mongoose model object no longer accepts a callback function as a parameter.
  // This change was introduced in Mongoose 5.0.0, and the new syntax requires that you use a Promise instead of a callback to handle the result of the save() operation.
  // To fix this error, you can replace the callback function in your code with a Promise. Here's an example of how you could modify your code to use Promises instead of callbacks:

  try {
    await form.save();
    res.status(200).send("Form data saved to database");
    console.log("Saved to db");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving form data to database !");
  }

  // form.save(function (err) {
  //   if (err) {
  //     console.error(err);
  //     res.statusMessage(500).send("Error saving form data to database !");
  //   } else {
  //     res.status(200).send("Form data saved to database !");
  //   }
  // });
});

// -----------------------------POST Request for Applying Insurance-----------------------

app.post("/submit-apply", async function (req, res) {
  const form = new UAModel({
    name: req.body.name,
    phone: req.body.phone,
    age: req.body.age,
    gender: req.body.gender,
    email: req.body.email,
    aadhar: req.body.aadhar,
    season: req.body.season,
    crop: req.body.crop,
    insurance: req.body.insurance,
    area: req.body.area,
    bank: req.body.bank,
    accountNo: req.body.accountNo,
  });

  try {
    await form.save();
    // res.status(200).json({message: 'Applied Successfully'});
    res.status(200).send("Form data saved to database");
    console.log("Saved to db");
  } catch (error) {
    console.log(error);
    // res.status(500).json({message: error.message});
    res.status(500).send("Error saving form data to database !");
  }
});

// ------------------------------POST Request for login------------------------------

app.post("/submit-login", async function (req, res) {
  const { email, password } = req.body;

  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const users = client.db("test").collection("ulmodels");
    const user = await users.findOne({ email: email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ sub: user._id }, "secret", { expiresIn: "0.5h" });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }

  // try {
  //     const user = await ULModel.findone({name : name});

  //     console.log('login-executed');

  //     console.log(user.name, user.password);

  //     if(!user) {
  //         return res.status(401).json({message: "Authentication failed"});
  //     }

  //     const isMatch = await compare(password, user.password);

  //     if(!isMatch) {
  //         return res.status(401).json({message: "Authentication failed"});
  //     }

  //     const token = jwt.sign({userId: user._id}, 'secret', {expiresIn: '1h'});

  //     return res.json({token});
  // } catch (error) {
  //     return res.status(500).json({message: 'Internal server error'});
  // }
});

// ----------------------------------GET Request for User data-------------------------------

app.get("/user/:email", async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const users = client.db("test").collection("ulmodels");
    const user = await users.findOne({ email: req.params.email }); //  used req.params.name to extract the "name" info  from the GET req. url

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const startServer = async () => {
  const PORT = process.env.PORT || 8081;
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(PORT, () =>
      console.log("Server started on port http://localhost:8081")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
