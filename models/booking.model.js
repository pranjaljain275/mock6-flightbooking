const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    user: String,
    flight: String,
  },
  {
    versionKey: false,
  }
);

const Bookingmodel = mongoose.model("booking", bookingSchema);

module.exports = {
  Bookingmodel,
};
