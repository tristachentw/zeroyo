var sprites = require('postcss-sprites');

module.exports = {
  plugins: [
    sprites({
      stylesheetPath: './build/assets/',
	    spritePath: './build/assets/'
    })
  ]
};
