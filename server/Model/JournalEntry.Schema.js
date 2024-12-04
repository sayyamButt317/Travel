const journalEntriesSchema = new mongoose.Schema({
    entryID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    journalID: { type: mongoose.Schema.Types.ObjectId, ref: "Journal", required: true },
    locationID: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    entryText: { type: String, required: true },
    photos: [{ type: String }],
    dateVisited: { type: Date },
    createdAt: { type: Date, default: Date.now },
  });
  
  export const JournalEntries = mongoose.model("JournalEntries", journalEntriesSchema);
  