import mongoose from 'mongoose';

class Configurations {
    constructor() {

    }

    static async ConnectWithMongoDB() {
        console.log("hellomongo", process.env.MONGODB_URI)
        try {
            mongoose.connect(process.env.MONGODB_URI);
            return {
                status: "success",
                message: "Database connected successfully"
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default Configurations;