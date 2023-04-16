import mongoose from "mongoose";

const FarmerApply = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "why no name ?"],
  },
  phone: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65,
  },
  email: {
    type: String,
    required: true,
  },
  aadhar: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        // Check if the value is a 12 or 16 digit number
        // ^ matches the start of the string.
        // \d matches any digit (0-9).
        // {12} and {16} specify that the previous \d pattern should appear exactly 12 or 16 times, respectively.
        // $ matches the end of the string.
        // | is a logical OR operator that allows us to match either the pattern before or after it.
        return /^\d{12}$|^\d{16}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid 12 or 16 digit number!`,
    },
  },
  season: {
    type: String,
    required: true
  },
  crop: {
    type: String,
    required: true
  },
  insurance: {
    type: String,
    required: true
  },
  area: {
    type: Number,
    required: true,
  },
  bank: {
    type: String,
    required: true
  },
  accountNo: {
    type: Number,
    required: true
  }
});

//  UAModel -> User Apply Model
const UAModel = mongoose.model('UAModel', FarmerApply);

export default UAModel;
