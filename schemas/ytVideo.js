export default {
    name: 'ytVideo',
    title: 'YouTube Video',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'link',
            title: 'Video Link',
            type: 'string',
        },
        {
            name: 'coverImage',
            title: 'Cover image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
    ],
};
