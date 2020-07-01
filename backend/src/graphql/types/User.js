export default `

    input RiotAccoutInput {
        name: String!
        region: String!
    }

    type RiotAccout {
        name: String
        region: String
    }

    type User {
        _id: String!
        username: String!
        email: String!
        password: String!
        account: RiotAccout
        friends: [RiotAccout]
    }

    type Query {
        user(username: String!): User
        users: [User]
        login(email: String!, password: String!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        addFriend(_id: String!, friend: RiotAccoutInput!): User
        addAccount(_id: String!, account: RiotAccoutInput!): User
        deleteUser(_id: String!): User
        removeFriend(_id: String!, friend: RiotAccoutInput!): User
        editUserUsername(_id: String!, username: String!): User
        editUserPassword(_id: String!, oldPassword: String!, password: String!): User
    }

`