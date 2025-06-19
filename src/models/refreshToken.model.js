import mongoose from "mongoose";

const RefreshTokenSchema = mongoose.createSchema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: date,
            required: true
        },
        isRevoked: {
            type: Boolean,
            default: false,
        },
    },{
        timestamp: true
    }
)

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
export default RefreshToken;

