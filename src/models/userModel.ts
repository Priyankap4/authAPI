import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    fullname : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    hashPassword : {
        type: String,
        required: true
    }
});

UserSchema.methods.comparePassword = (password, hashPassword)=>{
    return bcrypt.compareSync(password,hashPassword);
};