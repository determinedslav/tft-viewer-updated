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
        friends: [RiotAccout]
    }

    type Query {
        user(username: String!): User
        users: [User]
        login(email: String!, password: String!): User
        currentUser: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        addFriend(email: String!, friend: RiotAccoutInput!): User
        login(email: String!, password: String!): String
        deleteUser(email: String!): User
        removeFriend(email: String!, friend: RiotAccoutInput!): User
        editUserUsername(email: String!, username: String!): User
        editUserPassword(email: String!, oldPassword: String!, password: String!): User
    }

`