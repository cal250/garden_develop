/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    require.resolve("tailwindcss"),
    require.resolve("./postcss/polygon-background.js"),
  ],
};
