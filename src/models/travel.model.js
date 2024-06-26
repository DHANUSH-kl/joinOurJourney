import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";
import { Review } from "./review.model.js";

const imageSchema = new mongoose.Schema({
    path: String,
    public_id: String,
    // Add other properties if needed
   });

const tripSchema = new Schema({
    departure : {
        type : Date,
    },
    endDate : {
        type : Date
    },
    location : {
        type : String,
    },
    categories : {
        type : [String],
    },
    title : {
        type : String,
    },
    youtubeUrl: {
        type: String, 
    },
    tripDescription : {
        type : String,
        // minlength: [200, "Trip description must be at least 200 characters."]
    },
    accomodations : {
        type : [String]
    },
    includes : {
        type : [String]
    },
    excludes : {
        type : [String]
    },
    totalDays : {
        type : Number,
    },
    totalCost : {
        type : Number
    },
    tripImages: [imageSchema],
    stopImages: [imageSchema],
    stopLocation : {
        type : [String],
    },
    stopDescription : {
        type : [String],
    },
    tripLeaderMessage : {
        type : String
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : "review"
    }]
} , {timestamps:true});


// Mongoose middleware to remove trip ID from users' createdTrips when a trip is deleted
tripSchema.pre('remove', async function (next) {
    try {
        const tripId = this._id;

        // Update all users that have this trip in their createdTrips array
        await mongoose.model('User').updateMany(
            { createdTrips: tripId },
            { $pull: { createdTrips: tripId } }
        );

        next();
    } catch (error) {
        next(error);
    }
});


export const Trip = mongoose.model("Trip", tripSchema);