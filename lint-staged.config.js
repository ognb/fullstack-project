module.exports = {
  '*.{ts,tsx,js,jsx}': ['./node_modules/.bin/eslint --fix', 'prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
};
