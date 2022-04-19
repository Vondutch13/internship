module.exports = {
  recursive: true,
  exit: true,
  bail: true,
  require: [
    'graphqlactivity/test/clean-database.js',
  ],
  spec: ['graphqlactivity/test/user.js']
};
