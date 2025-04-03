import jwt, { JwtPayload } from "jsonwebtoken";

const jwtParser = (token: string, SECRET: string): JwtPayload => {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    return decoded;
}

export default jwtParser;