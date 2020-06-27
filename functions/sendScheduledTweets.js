require('dotenv').config();
const { getSendableTweets } = require('./utils/sanity');
const { sendTweets } = require('./utils/twitter');

exports.handler = async (event) => {
    try {
        const tweets = await getSendableTweets();
        console.log(tweets);
        //await sendTweets(tweets);
        return {
            statusCode: 200,
            body: JSON.stringify(tweets),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ err: 'Something went wrong' }),
        };
    }
};
