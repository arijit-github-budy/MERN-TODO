import JWT from 'jsonwebtoken';

class JwtService {
    constructor() { }

    static async GenerateJwtTokenService(info) {
        try {
            if (!info) throw new Error("Information is not available or invalid for token creation.")

            let jwtToken = JWT.sign(info, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

            if (!jwtToken) throw new Error("Token generation failed.");

            return jwtToken
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    static async VerifyJwtTokenService(token) {
        try {
            if (!token) throw new Error("Token is not available or invalid.")

            let infoUser = JWT.verify(token, process.env.JWT_SECRET);

            if (!infoUser) throw new Error("Invalid token recevied.");

            return infoUser
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

}

export default JwtService;