const mongoose = require ('mongoose');
const yup = require ('yup');

//PLACE SCHEMA
const ReservationSchema = new mongoose.Schema ({
  datedebut: {
    type: Date,
    required: false,
  },
  datefin: {
    type: Date,
    required: false,
  },
  qr: {
    type: String,
    required: true,
  },
});

const validateReservation = reservation => {
  const schema = yup.object ().shape ({
    datedebut: yup.string ().required (),
    datefin: yup.string ().required (),
    qr: yup.string ().required (),
  });

  return schema.validate (reservation).then (reservation => reservation).catch (error => {
    return {
      message: error.message,
    };
  });
};

exports.Reservation = new mongoose.model ('Reservation', ReservationSchema);
exports.validateReservation = validateReservation;
