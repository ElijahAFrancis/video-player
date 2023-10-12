const ffmpeg = require('fluent-ffmpeg');

// Function to convert video to MP4 format
const convertToMP4 = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err))
      .run();
  });
};

module.exports = { convertToMP4 };