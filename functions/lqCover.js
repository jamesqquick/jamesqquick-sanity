const {
    generateLearningQuickCoverURL,
    uploadGuestProfilePicIfNotExists,
} = require('./utils/StreamUtils');
const simpleReturn = require('netlify-functions-simple-return');
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
    const { title, guestName, guestTitle, guestImageURL, time } = body;

    if (!title || !guestName || !guestTitle || !guestImageURL || !time) {
        return {
            statusCode: 400, // <-- Important!
            headers,
            body: JSON.stringify({ err: 'All parameters are required.' }),
        };
    }

    try {
        const guestImageName = `${guestName.split(' ')[0]}-${
            guestName.split(' ')[1]
        }`;
        uploadGuestProfilePicIfNotExists(guestImageName, guestImageURL);
        const url = generateLearningQuickCoverURL(
            title,
            guestName,
            guestTitle,
            guestImageName,
            time
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ url }),
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
