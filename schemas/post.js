export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'youTubeVideoId',
            title: 'YouTube Video Id',
            type: 'string',
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 2,
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
            name: 'keywords',
            type: 'array',
            title: 'Keywords',
            description: 'Add keywords that describes your blog.',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'tag' } }],
        },
       
        {
            name: 'publishedDateOld',
            title: 'Published Date',
            type: 'datetime',
        },
        {
            name: 'publishedDate',
            title: 'Published Date',
            type: 'richDate',
        },
        {
            name: 'mainContent',
            title: 'Main Content',
            type: 'richText',
        },
    ],
};
