import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema(
    {
        username : {
            type: String,
            required : [true, 'Please Enter usename'],
            unique : true,
            trim: true
        },
        email: {
            type: String,
            required : [true, 'Please Enter an email'],
            unique: true,
            trim : true
        },
        password: {
            type: String,
            required : [true, 'Please Enter a password'],
            unique: true,
            trim : true
        },
    },{timestamp: true}
);

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')) next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.mathchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', UserSchema);

export default User;