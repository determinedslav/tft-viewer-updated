export default `
    input AccountInput {
        name: String!
        region: String!
        level: Int!
        rank: String!
        division: String!
        lp: Int!
        wins: Int!
        losses: Int!
        played: Int!
    }

    type Account {
        name: String
        region: String
        level: Int
        rank: String
        division: String
        lp: Int
        wins: Int
        losses: Int
        played: Int
    }
    
    input FriendInput {
        name: String!
        region: String!
    }

    type Friend {
        name: String
        region: String
    }

    type User {
        _id: String!
        username: String!
        email: String!
        password: String!
        account: Account
        friends: [Friend]
    }

    type Query {
        user(username: String!): User
        users: [User]
        login(email: String!, password: String!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        addFriend(_id: String!, friend: FriendInput!): User
        addAccount(_id: String!, account: AccountInput!): User
        deleteUser(_id: String!): User
        removeFriend(_id: String!, friend: FriendInput!): User
        editUserUsername(_id: String!, username: String!): User
        editUserPassword(_id: String!, oldPassword: String!, password: String!): User
    }

`