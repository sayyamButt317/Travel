const locationSchema = new mongoose.Schema({
  locationID: { type: mongoose.Schema.Types.ObjectId, auto: true },
  locationName: { type: String, required: true },
  cityID: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  description: { type: String },
});

export const Location = mongoose.model("Location", locationSchema);
