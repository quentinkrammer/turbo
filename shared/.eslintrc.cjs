/* eslint-env node */

module.exports = {
  root: true,
  extends: ["custom"],

  parserOptions: {
    project: true,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    tsconfigRootDir: __dirname,
  },
};
