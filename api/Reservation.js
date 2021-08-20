const express = require ('express');
const router = express.Router ();
const {Reservation, validateReservation} = require ('../models/Reservation');

//POST: CREATE A NEW Reservation
router.post ('/', async (req, res) => {
  const error = await validateReservation (req.body);
  if (error.message) res.status (400).send (error.message);

  reservation = new Reservation ({
    datedebut: req.body.datedebut,
    datefin: req.body.datefin,
    qr: req.body.qr,
    
  });

  reservation
    .save ()
    .then (reservation => {
      res.send (reservation);
    })
    .catch (error => {
      res.status (500).send ('reservation was not stored in db');
    });
});

//GET ALL reservations
router.get ('/', (req, res) => {
  Reservation.find ().then (reservations => res.send (reservations)).catch (error => {
    res.status (500).send ('Something went wrong');
  });
});

//GET THE reservation BY ID

router.get ('/:reservationId', async (req, res) => {
  const reservation = await Reservation.findById (req.params.reservationId);
  if (!reservation) res.status (404).send ('reservation not found');
  res.send (reservation);
});



//UPDATE place BASED ON ID
router.put("/:reservationId", async (req, res) => {
  const updatedReservation = await Reservation.findByIdAndUpdate(
    req.params.reservationId,
    {
    datedebut: req.body.datedebut,
    datefin: req.body.datefin,
    qr: req.body.qr, 
    },
    { new: true }
  );

  if (!updatedReservation) res.status(404).send("reservation not found");
  res.send(updatedReservation);
});

//DELETE place BASED ON ID
router.delete ('/:reservationId', async (req, res) => {
  const reservation = await Reservation.findByIdAndRemove (req.params.reservationId);
  if (!reservation) res.status (404).send ('reservation with id not found');
  res.send (reservation);
});

module.exports = router;
