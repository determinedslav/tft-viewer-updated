import gql from 'graphql-tag';

export default {
GET_USER: gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            _id, username, email, account{name, region}, friends{name, region}
        }
    }
`,

ADD_USER: gql`
    mutation AddUser($email: String!, $username: String!, $password: String!) {
        addUser(email: $email, username: $username, password: $password) {
            _id, username, email, account{name, region}, friends{name, region}
        }
    }
`,

ADD_ACCOUNT: gql`
    mutation AddAccount($_id: String!, $account: RiotAccoutInput!) {
        addAccount(_id: $_id, account: $account){account{name, region}}
    }
`,

EDIT_USER_USERNAME: gql`
    mutation EditUserUsername($_id: String!, $username: String!) {
        editUserUsername(_id: $_id, username: $username){username}
    }
`,

EDIT_USER_PASSWORD: gql`
    mutation EditUserPassword($_id: String!, $oldPassword: String!, $password: String!) {
        editUserPassword(_id: $_id, oldPassword: $oldPassword, password: $password){username}
    }
`,

ADD_FRIEND: gql`
    mutation AddFriend($_id: String!, $friend: RiotAccoutInput!) {
        addFriend(_id: $_id, friend: $friend){friends{name, region}}
    }
`,

REMOVE_FRIEND: gql`
    mutation RemoveFriend($_id: String!, $friend: RiotAccoutInput!) {
        removeFriend(_id: $_id, friend: $friend){friends{name, region}}
    }
`,

DELETE_USER: gql`
    mutation DeleteUser($_id: String!){
        deleteUser(_id: $_id){username}
    }
`,
}