const bucketListSchema = new mongoose.Schema({
  listID: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  listName: { type: String, required: true },
  privacy: { type: String, enum: ["Public", "Private"], required: true },
  creationDate: { type: Date, default: Date.now },
});

export const BucketList = mongoose.model("BucketList", bucketListSchema);
