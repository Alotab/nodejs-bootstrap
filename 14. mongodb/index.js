const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://codingctrl:h4GmCsF9PUzecp7p@cluster0.4cpi3.mongodb.net/"
)
.then(()=> console.log('database connected successfully'))
.catch(e=> console.log('Error', e))


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: {type: Date, default: Date.now}
});

// create user model
const User = mongoose.model('User', userSchema);

async function runQueryExample(){
    try{

        // create a new user document
        const newUser = await User.create({
            name: 'Updated Doe',
            email: 'brroks@test.com',
            age: 34,
            isActive: true,
            tags: ['developer'],
        })
        console.log('Created new user', newUser)

        // const newUser = new User({
        //     name: 'Tracis Mandy',
        //     email: 'mandy@test.com',
        //     age: 29,
        //     isActive: true,
        //     tags: ['Engineer','web developer'],
        // });
        // await newUser.save()
        // console.log('Created new user', newUser)

        // const allUsers = await User.find({});
        // console.log(allUsers);

        // const getUsersOfActiveFalse = await User.find({ isActive: false });
        // console.log(getUsersOfActiveFalse);

        // const getLastCreatedUserByUserId = await User.findById(newUser._id);
        // console.log(getLastCreatedUserByUserId);

        // const getFristUserwithSameName = await User.find({ name: 'Manly Lookomon'});
        // console.log(getFristUserwithSameName);

        // const selectedFields = await User.find().select('name email -_id');
        // console.log(selectedFields);


        // const limitedUsers = await User.find().limit(5).skip(1)
        // console.log(limitedUsers);

        // const countDocuments = await User.countDocuments({ isActive: false})
        // console.log(countDocuments);

        // const sortedUsers = await User.find().sort({ age: -1});
        // console.log(sortedUsers);

        // const deletedUser = await User.findByIdAndDelete(newUser._id);
        // console.log(deletedUser);

        const updatedUser = await User.findByIdAndUpdate(newUser._id, 
            {
                $set: {age: 100},
                $push: {tags: 'updated'}
            }, 
            {new: true}
        );
        console.log(updatedUser);

    }catch(error) {
        console.log('Error:', error)
    } finally {
        await mongoose.connection.close()
    }
}

runQueryExample()