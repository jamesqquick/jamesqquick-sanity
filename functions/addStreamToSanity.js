const { addOrUpdateStream } = require('./utils/sanity');
exports.handler = async (event) => {
    const headers = {
        'access-control-allow-origin': '*',
        'access-control-allow-headers': '*',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE',
    };

    if (event.httpMethod !== 'POST') {
        // To enable CORS
        console.log('preflight');
        return {
            statusCode: 200, // <-- Important!
            headers,
            body: 'This was not a POST request!',
        };
    }
    const body = JSON.parse(event.body);
    const {
        title,
        guestName,
        guestTitle,
        guestImageURL,
        time,
        twitterHandle,
        coverImageUrl,
    } = body;

    if (
        !title ||
        !guestName ||
        !guestTitle ||
        !guestImageURL ||
        !time ||
        !twitterHandle
    ) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ err: 'All parameters are required.' }),
        };
    }

    try {
        const stream = await addOrUpdateStream(body);
        console.log('Added stream', stream);
        return {
            statusCode: 200,
            body: JSON.stringify(stream),
            headers,
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: 'Something went wrong' }),
        };
    }
};
