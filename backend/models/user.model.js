import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    Username: {type: String,              
                required: true, 
                unique: true},
    Password: {type: String,              
        required: true, 
        },   // Password phải được hash
    Role: {type: Number,
        required: true,
        },
    email: {type: String,
        required: true,
        },
    });
    
    
let userModel = mongoose.model('Users', UserSchema,"Users");


export default userModel;