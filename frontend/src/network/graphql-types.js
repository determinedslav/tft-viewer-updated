import gql from 'graphql-tag';

export default {
GET_USERS: gql`
    query{users{username, email}}
`,

GET_USER: gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            username, email, friends{name, region}
        }
    }
`,

ADD_USER: gql`
    mutation AddUser($email: String!, $username: String!, $password: String!) {
        addUser(email: $email, username: $username, password: $password) {
            username, email, friends{name, region}
        }
    }
`,

EDIT_USER_USERNAME: gql`
    mutation EditUserUsername($email: String!, $username: String!) {
        editUserUsername(email: $email, username: $username){username}
    }
`,

EDIT_USER_PASSWORD: gql`
    mutation EditUserPassword($email: String!, $oldPassword: String!, $password: String!) {
        editUserPassword(email: $email, oldPassword: $oldPassword, password: $password){username}
    }
`,

ADD_FRIEND: gql`
    mutation AddFriend($email: String!, $friend: FriendInput!) {
        addFriend(email: $email, friend: $friend){friends{name, region}}
    }
`,

REMOVE_FRIEND: gql`
    mutation RemoveFriend($email: String!, $friend: FriendInput!) {
        removeFriend(email: $email, friend: $friend){friends{name, region}}
    }
`,

DELETE_USER: gql`
    mutation DeleteUser($email: String!){
        deleteUser(email: $email){username}
    }
`,
}