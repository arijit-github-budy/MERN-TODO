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
                    unique: true,
                    default: Date.now()
                },
                fullname: {
                    type: String,
                    require: true,
                    trim: true
                },
                email: {
                    type: String,
                    unique: true,
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

    static ContactModel() {
        try {
            const schema = new Mongoose.Schema({
                contact_id: {
                    type: String,
                    unique: true,
                    default: Date.now()
                },
                fullname: {
                    type: String,
                    require: true,
                    trim: true
                },
                email: {
                    type: String,
                    unique: true,
                    require: true,
                    trim: true
                },
                reason: {
                    type: String,
                    require: true,
                    trim: true
                },
                contact_time: {
                    type: Date,
                    default: null,
                    trim: true
                }
            }, {
                timestamps: true
            })

            const Contact = Mongoose.model('Contact', schema);

            return Contact;
        } catch (error) {
            console.log("error from contact model", error);
        }
    }
}

export default AuthModel;