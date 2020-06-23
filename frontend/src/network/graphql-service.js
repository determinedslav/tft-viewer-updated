import client from "./apollo-client"
import types from "./graphql-types"

export default {
    async getUsers() {
        try {
            const response = await client.query({
                query: types.GET_USERS,
            });
            return response;
        } catch (error) {
            return error;
        }
    },

    async getUser(email, password) {
        try {
            const response = await client.query({
                variables: {email, password},
                query: types.GET_USER,
            });
        return response;
        } catch (error) {
            return error;
        }
    },

    async addUser(email, username, password) {
        try{
            const response = await client.mutate({
                variables: { email, username, password },
                mutation: types.ADD_USER,
            });
        return response;
        } catch (error) {
            return error;
        }
    },

    async editUserUsername(email, username) {
        try {
            const response = await client.mutate({
                variables: { email, username },
                mutation: types.EDIT_USER_USERNAME,
            });
        return response;
        } catch (error) {
            return error;
        }
    },

    async editUserPassword(email, oldPassword, password) {
        try {
            const response = await client.mutate({
                variables: { email, oldPassword, password },
                mutation: types.EDIT_USER_PASSWORD,
            });
        return response;
        } catch (error) {
            return error;
        }
    },

    async addFriend(email, friend) {
        try {
            const response = await client.mutate({
                variables: { email, friend },
                mutation: types.ADD_FRIEND,
            });
        return response;
        } catch (error) {
            return error;
        }
    },

    async removeFriend(email, friend) {
        try {
            const response = await client.mutate({
                variables: { email, friend },
                mutation: types.REMOVE_FRIEND,
            });
        return response;
        } catch (error) {
            return error;
        }
    },

    async deleteUser(email) {
        try {
        const response = await client.mutate({
            variables: { email },
            mutation: types.DELETE_USER,
        });
        return response;
        } catch (error) {
            return error;
        }
    },
}