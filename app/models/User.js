import mongoose from "mongoose";
const {Schema,model} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    profilepic:{
        type: String,
        
    },
    coverpic:{
        type: String,
        
    },
    email: {
        type: String,   
        required: true,
        unique: true,
        lowercase: true,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    
});

export default User || mongoose.models.User || model("User", userSchema);