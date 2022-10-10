import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userScore = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    score: {
        type: Number,
        required: true,
    },
    

})

const UserScore = mongoose.model('UserScore', userScore);
export default UserScore;
