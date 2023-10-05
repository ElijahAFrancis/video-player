const typeDefs = `
type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Video {
    id: String
    title: String
    filename: String
}

type Query {
    video(id: String): Video
}

type Mutation {
    uploadVideo(title: String, video: String): Video
}

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }
`;

module.exports = typeDefs;