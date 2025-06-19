import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Date,
            required: true
        },
        isRevoked: {
            type: Boolean,
            default: false,
        },
    },{
        timestamps: true
    }
)

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
export default RefreshToken;

