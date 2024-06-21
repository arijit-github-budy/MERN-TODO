import dotenv from 'dotenv'
import server from './src/app.js';
import Configurations from './src/config/connection.config.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

(() => {
    server.listen(PORT, async () => {
        try {
            const resp = await Configurations.ConnectWithMongoDB();
            console.log(`server is running on ${PORT} port.`);
        } catch (error) {
            console.log("error", error, error.message)
            process.exit(1)
        }
    })
})();
