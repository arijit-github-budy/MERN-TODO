import mongoose from 'mongoose';

class Configurations {
    constructor() {}

    static async ConnectWithMongoDB() {
        try {
            mongoose.connect(process.env.MONGODB_URI);
            return {
                status: "success",
                code: 200,
                message: "Database connected successfully"
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default Configurations;