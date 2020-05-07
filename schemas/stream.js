export default {
    name: 'stream',
    title: 'Stream',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'videoLink',
            title: 'Link to the Video',
            type: 'string',
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: '2',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'coverImage',
            title: 'Cover image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'tag' } }],
        },
        {
            name: 'publishedDate',
            title: 'Published Date',
            type: 'datetime',
        },
        {
            name: 'body',
            title: 'Body',
            type: 'text',
            rows: 4,
        },
    ],
};
