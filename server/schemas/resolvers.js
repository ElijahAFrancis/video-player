const { Video, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const ffmpeg = require('fluent-ffmpeg');

const resolvers = {
  Query: {
    videos: async () => {
      return await Video.find();
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate(
          'videos'
        );

        user.videos.sort((a, b) => b.uploadeDate - a.uploadDate);

        return user;
      }

      throw AuthenticationError;
    }
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
    },
    uploadVideo: async (_, { file, title }) => {
      const { createReadStream, filename, mimetype } = await file;
      const uploadDate = formatDate(new Date());
      const { path: originalPath, generatedFilename } = generatePathAndFilename(filename, uploadDate);
      const mp4Path = `${originalPath}.mp4`;

      // Save the original video file to the server
      const stream = createReadStream();
      const writeStream = createWriteStream(originalPath);
      await new Promise((resolve, reject) => {
        stream.pipe(writeStream);
        stream.on('end', resolve);
        stream.on('error', (error) => {
          writeStream.close();
          reject(error);
        });
      });

      // Convert the video to MP4 format using FFmpeg
      await new Promise((resolve, reject) => {
        ffmpeg(originalPath)
          .output(mp4Path)
          .on('end', resolve)
          .on('error', (err) => reject(err))
          .run();
      });

      // Create and return the Video object
      const video = {
        id: 'uniqueVideoID',
        title,
        uploadDate,
        filename: generatedFilename,
        path: mp4Path, // Return the path to the converted MP4 file
      };

      // In a real application, you would save video metadata to a database
      // For example: VideoModel.create(video);

      return video;
    },
  }
};

module.exports = resolvers;
