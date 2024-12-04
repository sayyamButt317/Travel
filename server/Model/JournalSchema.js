const journalSchema = new mongoose.Schema({
    journalID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    journalName: { type: String, required: true },
    privacy: { type: String, enum: ["Public", "Private"], required: true },
    creationDate: { type: Date, default: Date.now },
  });
  
  export const Journal = mongoose.model("Journal", journalSchema);
  