const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

/**
 * resolvers - Resolvers for GraphQL queries and mutations
 * @returns {object} - Returns an object containing Query and Mutation resolvers
 */
const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Not Authenticated');
    },
  },
  Mutation: {
    addUser: async (parent, { firstName, lastName, email }) => {
      const user = await User.create({ firstName, lastName, email });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
