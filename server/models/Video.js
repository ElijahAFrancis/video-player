const mongoose = require('mongoose');

const { Schema } = mongoose;

const videoSchema = new Schema({
  uploadDate: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  video:{
    type: String,
    required: true,
    unique: true
    }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;