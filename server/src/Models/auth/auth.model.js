import Mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

class AuthModel {
    constructor() {
    }

    static UserModel() {
        try {
            const schema = new Mongoose.Schema({
                user_id: {
                    type: String,
                    default: uuidv4()
                },
                fullname: {
                    type: String,
                    require: true,
                    trim: true
                },
                email: {
                    type: String,
                    require: true,
                    trim: true
                },
                password: {
                    type: String,
                    require: true,
                    trim: true
                },
                active_status: {
                    type: String,
                    enum: ["Active", "Disabled"],
                    default: "Active"
                },
                login_status: {
                    type: Boolean,
                    default: false,
                    trim: true
                },
                login_time: {
                    type: Date,
                    default: null,
                    trim: true
                },
                logout_time: {
                    type: Date,
                    default: null,
                    trim: true
                }
            }, {
                timestamps: true
            })

            const User = Mongoose.model('User', schema);

            return User;
        } catch (error) {
            console.log("error from model", error);
        }
    }
}

export default AuthModel;