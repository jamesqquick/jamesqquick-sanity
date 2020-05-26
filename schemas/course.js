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
            name: 'youTubeVideoId',
            title: 'YouTube Video Id',
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
            name: 'published',
            title: 'Is it published?',
            type: 'boolean',
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
        {
            name: 'whatYouGet',
            title: 'What You Get',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'faq',
            title: 'FAQ',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'courseOverview',
            title: 'Course Overview',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'whoIsItFor',
            title: 'Who Is It For',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'courseOutline',
            title: 'Course Outline',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'fullCost',
            title: 'Full Cost of the Course',
            type: 'number',
        },
        {
            name: 'discountCost',
            title: 'Discount Cost of the Course',
            type: 'number',
        },
        {
            name: 'purchaseLink',
            title: 'Link to purchase',
            type: 'string',
        },
    ],
};
