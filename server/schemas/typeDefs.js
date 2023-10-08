const typeDefs = `
type User {
    _id: ID
    name: String
    email: String
    videos: [Video]
  }

  type Video {
    id: String
    title: String
    filename: String
}

type Query {
    video(id: String): Video
    videos: [Video]
    user: User
}

type Mutation {
    uploadVideo(title: String, video: String): Video
    addUser(name: String!, email: String!, password: String!): Auth
    updateUser(name: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
}

  type Auth {
    token: ID
    user: User
  }
`;

module.exports = typeDefs;