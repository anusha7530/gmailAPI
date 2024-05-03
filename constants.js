require('dotenv');

const auth = {
    type: 'OAuth2',
    user: '<EMAIL_ADDRESS>',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
};

module.exports = {
    auth
}