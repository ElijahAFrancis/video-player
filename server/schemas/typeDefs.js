const typeDefs = `

  type Video {
    id: String!
    title: String!
    fileName: String!
    path: String!
    uploadDate: String!
  }

  type User {
    _id: ID
    name: String!
    email: String!
    videos: [Video]
  }
  
  type Auth {
    token: ID
    user: User
  }

  type Query {
    video(id: ID!): Video
    videos: [Video]
    user: User
  }

  type Mutation {
    uploadVideo(title: String!, filename: String!, path: String!, uploadDate: String!): Video
    addUser(name: String!, email: String!, password: String!): Auth
    updateUser(name: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;