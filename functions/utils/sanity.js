require('dotenv').config();
const sanityClient = require('@sanity/client');
const sanity = sanityClient({
    projectId: 'rx426fbd',
    dataset: 'production',
    useCdn: false,
    token: process.env.SANITY_TOKEN,
});

const query = '*[_type == "scheduledTweet" ]';
const params = {};

const getTweetsByStreamId = async (streamId) => {
    console.log(streamId);
    const query = `*[_type == "scheduledTweet" && streamId == "${streamId}"]`;
    const params = {};

    const records = await sanity.fetch(query, params);
    return records;
};

const getTweetsForStream = (record) => {
    if (!record) throw 'No record to work with';
    const streamTimeInMs = new Date(record.publishedDate).getTime();

    const twoDaysBeforeDate = new Date(
        new Date(record.publishedDate).setDate(
            new Date(record.publishedDate).getDate() - 2
        )
    );
    let imageUrl = null;
    if (record.coverImage) {
        console.log(record.coverImage.asset);
        imageUrl = `https://cdn.sanity.io/images/rx426fbd/production/${record.coverImage.asset._ref}`;
        imageUrl = imageUrl.replace('image-', '');
    }
    const tweet1 = {
        publishTime: twoDaysBeforeDate,
        content: `In 2 days my friend ${record.guestHandle} is going to join me to talk about ${record.topic} Come hang out!
        
        https://www.twitch.tv/jamesqquick`,
        streamId: record._id,
        _type: 'scheduledTweet',
        _id: record._id + '1',
    };
    const tweet2 = {
        publishTime: new Date(streamTimeInMs - 15 * 60000),
        content: `In 15 minutes, ${record.guestHandle} is going to join me to talk about ${record.topic} Come hang out!
        
        https://www.twitch.tv/jamesqquick`,
        streamId: record._id,
        _type: 'scheduledTweet',
        _id: record._id + '2',
    };
    if (imageUrl) {
        tweet1.imageUrl = imageUrl;
        tweet2.imageUrl = imageUrl;
    }
    return [tweet1, tweet2];
};

const getSendableTweets = async () => {
    const allTweets = await sanity.fetch(query, params);
    const current = new Date();
    const readyTweets = allTweets.filter((tweet) => {
        const tweetTime = new Date(tweet.publishTime);
        return tweetTime < current;
    });
    return readyTweets;
};

module.exports = {
    sanity,
    getSendableTweets,
    getTweetsByStreamId,
    getTweetsForStream,
};
