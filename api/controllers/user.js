import UserScore from '../models/user-score.js';
import User from '../models/user.js'


export const postUser = async (req, res) => {
    const { name, age, email, occupation, currentlyEmployed, address, yrsEmployed } = req.body

    const newUser = new User({
        name,
        email,
        age,
        occupation,
        currentlyEmployed,
        address,
        yrsEmployed

    });

    try {

        //check if email has already being used
        const user = await User.findOne({
            email: req.body.email,
        })
        if (user) {
            res.status(400).json({
                message: 'Email is already in use',
            })
        } else {

            //save user
            const createdUser = await newUser.save();

            //score user
            scoreUser(createdUser, res)
        }

    } catch (err) {
        res.json(err);
    };
}


export const scoreUser = async (createdUser, res) => {
    const { age, occupation, currentlyEmployed, address, yrsEmployed, _id } = createdUser;
    let initialScore = 0;

    try {

        if (age < 18 || age === null) {
            const userScore = new UserScore({
                user: _id,
                score: initialScore
            })

            await userScore.save()

            res.json({
                message: 'User score recorded as zero because inputted age is below 18.',
            })
        } else {

            const parameters = [age, currentlyEmployed, occupation, address, yrsEmployed];
            //filter out falsely values/value and increment initial score by the remaining values
            const remainingValues = parameters.filter((i) => i);

            for (let i = 0; i < remainingValues.length; ++i) {
                initialScore++;
            }

            if (yrsEmployed < 1 || yrsEmployed === isNaN) {
                const score = initialScore + 0;
                const userScore = new UserScore({
                    user: _id,
                    score: score
                })

                await userScore.save()

                res.json({
                    message: 'User score recorded.',
                })

            } else if (yrsEmployed > 1 && yrsEmployed <= 5) {
                const score = initialScore + 2;

                const userScore = new UserScore({
                    user: _id,
                    score: score
                })

                await userScore.save()

                res.json({
                    message: 'User score recorded.',
                })
            } else if (yrsEmployed > 5 && yrsEmployed <= 10) {
                const score = initialScore + 3;

                const userScore = new UserScore({
                    user: _id,
                    score: score
                })

                await userScore.save()

                res.json({
                    message: 'User score recorded.',
                })
            } else {
                const score = initialScore + 5;
                const userScore = new UserScore({
                    user: _id,
                    score: score
                })

                await userScore.save()

                res.json({
                    message: 'User score recorded.',
                })

            }
        }

    } catch (err) {
        res.status(500).json(err)
    }
};

export const getAllScore= async (req, res) => {
    try {
        //find all scores and populate user details
         UserScore.find().populate('user') 
            .exec( (err, users) => {
                //do stuff
                res.json(users)
            });
       

    } catch (err) {
        res.status(500).json(err)
    }
};