export default {
    name: 'course',
    title: 'Course',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'courseLink',
            title: 'Link to the Course',
            type: 'string',
        },
        {
            name: 'newsletterSignupURL',
            title: 'URL For Newsletter Signup',
            type: 'string',
        },
        {
            name: 'newsletterMessage',
            title: 'Message for Newsletter',
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
            name: 'mainContent',
            title: 'Main Content',
            type: 'richText',
        },
    ],
};
