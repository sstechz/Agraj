import mongoose from "mongoose";

const FarmerLogin = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "why no name ?"],
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  // //  there is no datatype for storing picture
  // //  buffer: store binary data of image file
  // //  The contentType field is of type String and will store the MIME type of the image, such as "image/jpeg" or "image/png".
  // picture: {
  //   data: Buffer,
  //   contentType: String
  // },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  district: {
    type: String,
    required: true
  },
  crop: {
    type: String,
    required: true
  },
  season: {
    type: String,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  // allData : [{
  //   type: mongoose.Schema.Types.ObjectId, ref: 'Apply'
  // }]
});

//  ULModel -> User Login Model
const ULModel = mongoose.model('ULModel', FarmerLogin);

export default ULModel;
