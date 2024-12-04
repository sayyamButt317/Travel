const citySchema = new mongoose.Schema({
  cityID: { type: mongoose.Schema.Types.ObjectId, auto: true },
  country: { type: String, required: true },
  cityName: { type: String, required: true },
});

export const City = mongoose.model("City", citySchema);
