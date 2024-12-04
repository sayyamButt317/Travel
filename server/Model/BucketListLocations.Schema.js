const bucketListLocationsSchema = new mongoose.Schema({
  bucketListID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BucketList",
    required: true,
  },
  locationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
});

export const BucketListLocations = mongoose.model(
  "BucketListLocations",
  bucketListLocationsSchema
);
