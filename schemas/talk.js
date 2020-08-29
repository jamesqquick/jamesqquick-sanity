export default {
    name: 'talk',
    title: 'Talk',
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
            name: 'youTubeVideoId',
            title: 'ID Of the YouTube Video',
            type: 'string',
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: '2',
        },
        {
            name: 'conference',
            title: 'Conference',
            type: 'string',
        },
        {
            name: 'slidesLink',
            title: 'Slides Link',
            type: 'string',
        },
        {
            name: 'conferenceLink',
            title: 'Conference Link',
            type: 'string',
        },
        {
            name: 'codeLink',
            title: 'Code Link',
            type: 'string',
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
            name: 'mainContent',
            title: 'Main Content',
            type: 'richText',
        },
    ],
};
