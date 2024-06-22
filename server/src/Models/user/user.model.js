import Mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

class UserModel {
    constructor() {
    }

    static TodoModel() {
        try {
            const schema = new Mongoose.Schema({
                todo_id: {
                    type: String,
                    default: uuidv4()
                },
                title: {
                    type: String,
                    require: true,
                    trim: true
                },
                description: {
                    type: String,
                    require: true,
                    trim: true
                },
                status: {
                    type: String,
                    require: true,
                    enum: ["Pending", "Completed"],
                    trim: true
                },
                created_date: {
                    type: Date,
                    default: new Date(),
                    trim: true
                }
            }, {
                timestamps: true
            })

            const Todo = Mongoose.model('Todo', schema);

            return Todo;
        } catch (error) {
            console.log("error from todo model", error);
        }
    }
}

export default UserModel;