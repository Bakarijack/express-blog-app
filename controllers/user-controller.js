import User from "../modal/User";
import bcryptjs from 'bcryptjs';

export const getAllUser = async (req, res, next) => {
    let users;

    try{
        users = await User.find();
    }catch (err){
        console.log(err);
    }

    if (!users){
        return res.status(404).json({message: 'No users found'});
    }

    return res.status(200).json({users});
}

export const signup = async(req, res, next) => {
    const { name, email, password} = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({email});
    }catch (err){
        return console.log(err);
    }

    if (existingUser){
        return res.status(400).json({message: 'User already exists!\nLogin instead.'});
    }

    const hashedPassword = bcryptjs.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });

    try{
        await user.save();
    }catch (err){
        console.log(err);
    }

    return res.status(201).json({user});
}

export const login = async (req, res, next) => {
    const { email, password} = req.body;
    let existingUser;

    try{
        existingUser = await User.findOne({email});
    }catch (err){
        return console.log(err);
    }

    if (!existingUser){
        return res.status(404).json({message: 'User does not exist!\nSignup to create the user'})
    }

    const isPasswordCorrect = bcryptjs.compare(password, existingUser.password);

    if (!isPasswordCorrect){
        return res.status(400).json({message: 'Incorrect password'});
    }

    return res.status(200).json({ message: 'Login successful'})
}