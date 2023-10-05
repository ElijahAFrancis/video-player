const Video = require('../models/Video');

const resolvers = {
    Query: {
        video: async (parent, { id }) => {
            return await Video.findById(id);
        }
    },
    user: async (parent, args, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'videos',
          });
  
          user.videos.sort((a, b) => b.uploadDate - a.uploadDate);
  
          return user;
        }
  
        throw AuthenticationError;
      },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
              return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw AuthenticationError;
        },
        uploadVideo: async (parent, { title, video }) => {
            const newVideo = new Video({ title, filename: video });
            return await newVideo.save();
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
        }
    }
};

module.exports = resolvers;