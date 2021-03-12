const { generateNewsletter } = require('./utils/newsletterUtils');

exports.handler = async (event) => {
    try {
        const newsletter = await generateNewsletter();
        return {
            statusCode: 200,
            body: newsletter,
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: 'Something went wrong' }),
        };
    }
};
