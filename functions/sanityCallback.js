const { sanity, getTweetsForStream } = require('./utils/sanity');

exports.handler = async (event) => {
    if (process.env.SCHEDULING_ENABLED !== 'true') {
        console.log('Scheduling tweets is turned off');
        return {
            statusCode: 200,
            body: JSON.stringify({ msg: 'Scheduling is turned off' }),
        };
    }
    let body;
    try {
        body = JSON.parse(event.body);
        if (!body || !body.ids) {
            return {
                statusCode: 200,
                body: JSON.stringify(body),
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 400,
            body: JSON.stringify({ err: 'Invalid request' }),
        };
    }
    const { created, updated, deleted } = body.ids;
    const recordIds = [...new Set([...created, ...updated, ...deleted])];
    console.log('Records that have been updated', recordIds);
    try {
        const updatedRecords = await sanity.getDocuments(recordIds);
        const updatedStreamRecords = updatedRecords.filter(
            (record) =>
                record &&
                record._type === 'stream' &&
                new Date(record.publishedDate.utc) > new Date()
        );
        console.log('Updated stream records', updatedStreamRecords);
        const retVal = [];
        const tweetPromises = updatedStreamRecords.map(async (record) => {
            const [tweet1, tweet2] = getTweetsForStream(record);
            await sanity.createOrReplace(tweet1);
            retVal.push(tweet1);
            await sanity.createOrReplace(tweet2);
            retVal.push(tweet2);
        });
        await Promise.all(tweetPromises);
        console.log('Scheduled tweets', retVal);
        return formatReturn(200, retVal);
    } catch (err) {
        console.error(err);
        return formatReturn(500, { msg: 'Something weng wrong' });
    }
};

const formatReturn = (statusCode, body) => {
    return { statusCode, body: JSON.stringify(body) };
};
