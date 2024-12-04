const locationReviewsSchema = new mongoose.Schema({
    reviewID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    locationID: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    submissionDate: { type: Date, default: Date.now },
  });
  
  export const LocationReviews = mongoose.model(
    "LocationReviews",
    locationReviewsSchema
  );
  