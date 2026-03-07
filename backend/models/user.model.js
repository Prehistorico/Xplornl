import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    insignia:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
},{
    timestamps: true //createdAt, updatedAt
});

const User = mongoose.model('User', userSchema);

export default User;