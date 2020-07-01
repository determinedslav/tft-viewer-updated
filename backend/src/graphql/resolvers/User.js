import User from "../../models/User";

// bcrypt is used to crypt passwords
import bcrypt from "bcrypt";
// jsonwebtoken is used for authentication
import jsonwebtoken from "jsonwebtoken";

// validator is used for validating fields and handling custom errors with ValidationError
import validator from 'validator';
import ValidationError from '../ValidationError';

import dotenv from "dotenv";
dotenv.config();

export default {
    Query: {
        user: async (root, args) => {
            const response = await User.findOne(args);
            if(!response){
                throw new Error(`Cannot find user: ${args}`);
            }
            return response;
        },
        users: async () => {
            const response = await User.find().populate();
            if(!response){
                throw new Error(`Cannot find users`);
            }
            return response;
        },
        login: async(root, {email, password}) => {
            const response = await User.findOne({email});
            if(!response){
                throw new Error(`Cannot find user with email: ${email}`)
            }
            const valid = await bcrypt.compare(password, response.password);
            if(!valid){
                throw new Error(`Cannot match password for email: ${email}`)
            }
            return response;
        },
        /*
        currentUser: async (root, args, {user}) => {
            if(!user){
                throw new ValidationError([{
                    key: 'user',
                    message: 'user_not_authenticated',
                }])
            }
            return await User.findById(user._id);   
        }
        */
    },
    Mutation: {
        addUser: async (root, {username, email, password, testfield}) => {

            let errors = [];
            
            if(validator.isEmpty(username)){
                errors.push({
                    key: 'username',
                    message: 'is_empty',
                })    
            }

            if(!validator.isEmail(email)){
                errors.push({
                    key: 'email',
                    message: 'email_not_valid',
                })    
            }
            
            if(!validator.isLength(password, {min: 6, max: 20})){
                errors.push({
                    key: 'password',
                    message: 'password_length',
                })    
            }

            if(errors.length){
                throw new ValidationError(errors);
            }

            const newUser = await new User({
                username,
                testfield, 
                email, 
                password: await bcrypt.hash(password, 10)
            });
            if(!newUser){
                throw new Error(`Cannot create user ${email}`)
            }
            let savedUser = null;
            try {
            savedUser = await newUser.save();        
            } catch (e) {
                 if(e.code === 11000){
                    throw new ValidationError([{
                        key: 'email',
                        message: 'email_in_use',
                    }]);
                 }
                 throw new Error(`Cannot create user ${email}`)
            }
            const response = await User.findOne({email});
            if(!response){
                return new Error(`Cannot find user with email: ${email}`)
            }
            return response;
            /*
            return jsonwebtoken.sign({
                    _id: newUser._id,
                    email: newUser.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
            });
            */

        },
        addAccount: async (root, {_id, account}) => {
            const response = await User.findOneAndUpdate({_id}, {$set: {
                account, 
            }}, {new: true}).exec();
            if(!response){
                throw new Error(`Cannot save username:`);
            }
            return response;
        },
        addFriend: async (root, {_id, friend}) => {
            const user = await User.findOne({_id});
            user.friends.forEach(element => {
                if(element.name === friend.name && element.region === friend.region){
                    throw new Error(`Friend already exists`);
                }
            });
            const response = await User.findOneAndUpdate({_id}, {$push: {
                friends: friend, 
            }}, {new: true}).exec();
            if(!response){
                throw new Error(`Cannot save friend`);
            }
            return response;
            
        },
        removeFriend: async (root, {_id, friend}) => {
            const response = await User.findOneAndUpdate({_id}, {$pull: {
                friends: friend, 
            }}, {new: true}).exec();
            if(!response){
                throw new Error(`Cannot remove friend`);
            }
            return response;
            
        },
        /*
        login: async(root, {email, password}) => {
            const user = await User.findOne({email});
            if(!user){
                throw new Error(`Cannot find user with email: ${email}`)
            }

            const valid = await bcrypt.compare(password, user.password);

            if(!valid){
                throw new Error(`Cannot match password for email: ${email}`)
            }

            return jsonwebtoken.sign(
                {
                    _id: user._id,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )
        },
        */
        deleteUser: async (root, {_id}) => {
            const user = await User.findOne({_id})
            if(!user){
                throw new Error(`Cannot find user`)
            }
            const response = await user.remove(user)
            if(!response){
                throw new Error(`Cannot delete user`);
            }
            return response;
        },
        editUserUsername: async (root, {_id, username}) => {
            const response = await User.findOneAndUpdate({_id}, {$set: {
                username, 
            }}, {new: true}).exec();
            if(!response){
                throw new Error(`Cannot save username:`);
            }
            return response;
        },
        editUserPassword: async (root, {_id, oldPassword, password}) => {

            let errors = [];
            
            const user = await User.findOne({_id});
            if(!user){
                throw new Error(`Cannot find user`)
            }

            const comparePass = await bcrypt.compare(oldPassword, user.password);
            if(!comparePass){
                throw new Error(`Cannot match password`)
            }

            const compareNewPass = await bcrypt.compare(password, user.password);
            if(compareNewPass){
                throw new Error(`New password cannot be the same as old password`)
            }

            if(!validator.isLength(password, {min: 6, max: 20})){
                errors.push({
                    key: 'password',
                    message: 'password_length',
                })    
            }
    
            if(errors.length){
                throw new ValidationError(errors);
            }

            const response = await User.findOneAndUpdate({_id}, {$set: {
                password: await bcrypt.hash(password, 10), 
            }}, {new: true}).exec();
            if(!response){
                throw new Error(`Cannot save password`);
            }
            return response;
        }
    }
}