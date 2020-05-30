export default {
    name: 'scheduledTweet',
    title: 'Scheduled Tweet',
    type: 'document',
    fields: [
        {
            name: 'content',
            title: 'Content',
            type: 'string',
        },
        {
            name: 'streamId',
            title: 'Stream ID',
            type: 'string',
        },
        {
            name: 'publishTime',
            title: 'Published Time',
            type: 'datetime',
        },
    ],
};
