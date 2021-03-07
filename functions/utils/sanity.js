require('dotenv').config();
const sanityClient = require('@sanity/client');
const fs = require('fs');
const request = require('request');
const sanity = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET_NAME,
    token: process.env.SANITY_TOKEN,
    useCdn: false,
});
const { basename } = require('path');
const slug = require('slug');

const query = '*[_type == "scheduledTweet" ]';
const params = {};

const getTweetsByStreamId = async (streamId) => {
    const query = `*[_type == "scheduledTweet" && streamId == "${streamId}"]`;
    const params = {};

    const records = await sanity.fetch(query, params);
    return records;
};

const getTweetsForStream = (record) => {
    if (!record) throw 'No record to work with';
    const streamTimeInMs = new Date(record.publishedDate.utc).getTime();

    let imageUrl = null;
    if (record.coverImage) {
        console.log(record.coverImage.asset);
        imageUrl = `https://cdn.sanity.io/images/rx426fbd/production/${record.coverImage.asset._ref}`;
        imageUrl = imageUrl.replace('image-', '');
        imageUrl = imageUrl.replace('-png', '.png');
    }
    const tweet1 = {
        publishTime: new Date(streamTimeInMs - 48 * 60 * 60 * 1000),
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
        if (tweetTime > current) return false;
        //If it's older than 30 minutes, forget it
        const expiredThreshold = 30 * 60 * 1000;
        if (current - tweetTime > expiredThreshold) {
            console.warn(
                `Tweet ${tweet._id} is stale, going to attempt to delete`
            );
            //TODO: is there a better way to handle the fact that this is async? Do we care if it fails? Maybe we just try again later :)
            sanity.delete(tweet._id);
            return false;
        }
        return true;
    });
    return readyTweets;
};

const addOrUpdateStream = async ({
    title: topic,
    guestName,
    guestTitle,
    time: publishedDate,
    twitterHandle: guestHandle,
    coverImageUrl,
    profilepic,
}) => {
    const fullTitle = `${topic} with ${guestName}`;
    console.log(publishedDate);
    const newStream = {
        _type: 'stream',
        title: fullTitle,
        topic,
        guestName,
        guestTitle,
        publishedDate: {
            _type: 'richDate',
            utc: publishedDate,
            local: publishedDate,
            timezone: '	Etc/UTC',
        },
        guestHandle,
    };
    const existingRecords = await getExistingStreamsByTitle(fullTitle);
    if (existingRecords.length > 0) {
        const existingRecord = existingRecords[0];
        const updatedRecord = await sanity
            .patch(existingRecord._id)
            .set(newStream)
            .commit();
        return updatedRecord;
    } else {
        return await uploadNewStream(newStream, coverImageUrl);
    }
};

const getExistingStreamsByTitle = async (title) => {
    const query = `*[_type == "stream" && title == "${title}"]`;
    const params = {};
    return await sanity.fetch(query, params);
};

const uploadNewStream = async (newStream, coverImageUrl) => {
    const uploadedCoverImage = await uploadImage(coverImageUrl);
    newStream['coverImage'] = {
        _type: 'image',
        asset: {
            _ref: uploadedCoverImage._id,
            _type: 'reference',
        },
    };
    newStream['slug'] = {
        _type: 'slug',
        current: slug(newStream.title),
    };
    const createdStream = sanity.create(newStream);
    return createdStream;
};

const uploadImage = async (imageUrl) => {
    return await sanity.assets.upload('image', request(imageUrl), {
        filename: basename(imageUrl),
    });
};

module.exports = {
    sanity,
    getSendableTweets,
    getTweetsByStreamId,
    getTweetsForStream,
    addOrUpdateStream,
};
