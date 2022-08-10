const Seat = require('../models/seats.model');

exports.getAllSeats = async (req, res) => {
  res.json(await Seat.find());
  try {
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandomSeat = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const seat = await Seat.findOne().skip(rand);
    if (!seat) res.status(404).json({ message: 'Not found...' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getSeatById = async (req, res) => {
  try {
    const seatId = await Seat.findById(req.params.id);
    if (!seatId) res.status(404).json({ message: 'Not found...' });
    else res.json(seatId);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addSeat = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const newSeat = new Seat({
      day: day,
      seat: seat,
      client: client,
      email: email,
    });
    await newSeat.save();
    res.json({ message: 'Ok' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateSeatById = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const seatId = Seat.findById(req.params.id);
    if (seatId) {
      await Seat.updateOne(
        { _id: req.params.id },
        {
          $set: {
            day: day,
            seat: seat,
            client: client,
            email: email,
          },
        }
      );
    }
    res.json({ message: 'Ok' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.removeSeatById = async (req, res) => {
  try {
    const seatId = Seat.findById(req.params.id);
    if (seatId) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'Ok' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
