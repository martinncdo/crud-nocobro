import jwt from "jsonwebtoken";
import { User } from "../config/models.js";

export default async function verifJwt (req, res, next) {
    try {
        let admin = await User.findOne({
            where: {
                id: 1
            }
        });

        let ipAdmin = await admin.dataValues.ip,
            userAgentAdmin = await admin.dataValues.userAgent;

        if (req.ip != ipAdmin) { 
            admin.update({
                ip: ""
            });
            return res.json({ status: 1200 });
        };

        if (req.headers["user-agent"] != userAgentAdmin) {
            admin.update({
                userAgent: ""
            });
            return res.json( {status: 1300 });
        };
        
        let cookieHeader = req.cookies["9kj"];
        let decodedToken = jwt.verify(cookieHeader, process.env.SIGN_JWT);
        next();
    } catch(error){
        if (error == "TokenExpiredError: jwt expired") { 
            res.json( { status: 1400 } );
        } else {
            res.status(401).json( { status: 1500 } );
            console.log(error)
        };
    };
};
