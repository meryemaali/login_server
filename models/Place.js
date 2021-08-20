const mongoose = require("mongoose");
const yup = require("yup");

//PLACE SCHEMA
const PlaceSchema = new mongoose.Schema({
  qr: {
    type: String,
    required: true,
  },
  etage: {
    type: String,
    required: true,
  },
  etat: {
    type: String,
    required: true,
  },
  datedebut: {
    type: Date,
    required: false,
  },
  datefin: {
    type: Date,
    required: false,
  },
  
});

const validatePlace = (place) => {
  const schema = yup.object().shape({
    qr: yup.string().required(),
    etage: yup.string().required(),
    etat: yup.string().required(),
    datedebut: yup.date(),
    datefin: yup.date(),
    
  });

  return schema
    .validate(place)
    .then((place) => place)
    .catch((error) => {
      return {
        message: error.message,
      };
    });
};

exports.Place = new mongoose.model("Place", PlaceSchema);
exports.validatePlace = validatePlace;

