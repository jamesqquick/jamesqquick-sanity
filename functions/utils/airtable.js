require('dotenv').config();
const Airtable = require('airtable');
const jqqBase = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_JQQ_BASE_ID
);
const lbtBase = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_LBT_BASE_ID
);
const newsletterTable = jqqBase(process.env.NEWSLETTER_TABLE_NAME);
const contentTable = jqqBase(process.env.CONTENT_TABLE_NAME);
const streamsTable = jqqBase(process.env.STREAMS_TABLE_NAME);
const shareTable = lbtBase(process.env.SHARE_TABLE_NAME);

const minifyRecord = (record) => {
    return {
        id: record.id,
        ...record.fields,
    };
};

const getRecentVideos = async () => {
    const videos = await contentTable
        .select({
            filterByFormula: `AND({status}="Published", {archived}=FALSE())`,
        })
        .firstPage();
    return minifyRecords(videos);
};

const getShares = async () => {
    const records = await shareTable
        .select({
            filterByFormula: `AND({emailed}=FALSE(), {emailable}=TRUE(), {archived}=FALSE())`,
        })
        .firstPage();
    return minifyRecords(records);
};

const getCurrentNewsletter = async () => {
    const info = await newsletterTable
        .select({
            filterByFormula: `DATETIME_DIFF( date, today(), 'days') = 0`,
        })
        .firstPage();
    return minifyRecords(info)[0];
};

const getCurrentStream = async () => {
    const streams = await streamsTable
        .select({
            filterByFormula: `DATETIME_DIFF( streamDate, today(), 'days') = 0`,
        })
        .firstPage();
    return minifyRecords(streams)[0];
};

const getShareRecordToTweet = async () => {
    const records = minifyRecords(
        await shareTable
            .select({
                maxRecords: 1,
                filterByFormula: `AND({tweetable} = "1", {tweeted} != "1")`,
            })
            .firstPage()
    );
    if (records.length !== 1) return null;
    return records[0];
};

const minifyRecords = (records) => {
    if (!records || records.length === 0) return [];
    return records.map((record) => minifyRecord(record));
};

module.exports = {
    getRecentVideos,
    getShares,
    getCurrentNewsletter,
    getCurrentStream,
};
