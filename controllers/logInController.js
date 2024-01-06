import { User } from "../config/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const logInController = async (req, res, next) => {
    console.log(req.headers["user-agent"])
    let user = await User.findOne({
        where: {
          user: await req.body.user
        }
      });
    
    if (user == null) { 
      res.status(401).json( {error: "Invalidate credentials"} ); 
    }else {
      let passHash = user.dataValues.password;

      if (passHash == undefined) { res.status(401).json({ error: "Invalidate credentials" }) }; 
  
        let result = await bcrypt.compare(req.body.password, passHash);
        if (!result) {
          res.status(401).json( {error: "Invalidate credentials"} );
        }else {
          let token = jwt.sign({ user: "admin" }, process.env.SIGN_JWT, { expiresIn: 60*30});
          user.update({
            userAgent: req.headers["user-agent"],
            ip: req.ip
          });
          res.cookie("9kj", token, { httpOnly: true });
          res.json({status: 200}).end()
        };
    };
};

export default logInController;