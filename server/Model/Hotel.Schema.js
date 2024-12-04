const hotelSchema = new mongoose.Schema({
  hotelID: { type: mongoose.Schema.Types.ObjectId, auto: true },
  hotelName: { type: String, required: true },
  cityID: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
});

export const Hotel = mongoose.model("Hotel", hotelSchema);
