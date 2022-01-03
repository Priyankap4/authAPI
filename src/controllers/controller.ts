import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UserSchema } from "../models/userModel";

const User = mongoose.model("User", UserSchema);

export const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      } else {
        user.hashPassword = undefined;
        return res.json(user);
      }
    });
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
};

export const login = async (req, res) => {
  // Authenticate User
  try {
    User.findOne(
      {
        email: req.body.email,
      },
      (err, user) => {
        if (err) throw err;
        if (!user) {
          res
            .status(401)
            .json({ message: "Authentication failed. No user found" });
        } else if (user) {
          if (!user.comparePassword(req.body.password, user.hashPassword)) {
            res
              .status(401)
              .json({ message: `Authentication failed. Wrong password` });
          } else {
            return res.json({
              token: jwt.sign(
                {
                  email: user.email,
                  username: user.fullname,
                  _id: user.id,
                },
                "RESTFULAPIs"
              ),
            });
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
