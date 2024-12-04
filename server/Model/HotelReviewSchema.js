const hotelReviewsSchema = new mongoose.Schema({
    reviewID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    hotelID: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    submissionDate: { type: Date, default: Date.now },
  });
  
  export const HotelReviews = mongoose.model("HotelReviews", hotelReviewsSchema);
  