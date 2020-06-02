require('dotenv').config();
const Twitter = require('twitter');
var twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
const axios = require('axios');
const { sanity } = require('./sanity');

const sendTweets = async (tweets) => {
    if (!tweets) return;
    for (let i = 0; i < tweets.length; i++) {
        const tweet = tweets[i];
        //destroy first to try and make sure we don't get in an infinite loop
        await sanity.delete(tweet._id);
        await sendTweetWithImage(tweet.imageUrl, tweet.content);
    }
};

const sendTweetWithImage = async (imageUrl, status) => {
    if (!imageUrl) {
        await twitterClient.post('statuses/update', { status });
        console.log('tweet sent', status);
        return;
    }
    const imageData = await getRemoteImageInB64(imageUrl);
    const media = await twitterClient.post('media/upload', {
        media_data: imageData,
    });

    var status = {
        status,
        media_ids: media.media_id_string,
    };
    await twitterClient.post('statuses/update', status);
    console.log('Tweet sent', status);
};

const getRemoteImageInB64 = async (imageUrl) => {
    try {
        let image = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
        });
        let returnedB64 = Buffer.from(image.data).toString('base64');
        return returnedB64;
    } catch (err) {
        console.error(err);
        return null;
    }
};

module.exports = { twitterClient, sendTweets, sendTweetWithImage };
