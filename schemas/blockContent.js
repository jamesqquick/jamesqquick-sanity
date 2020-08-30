export default {
    name: 'richText',
    type: 'array',
    title: 'My Awesome Content',
    of: [
        {
            type: 'block',
        },
        {
            type: 'myImage',
        },
        {
            title: 'Code editor (default)',
            description: 'Code editor',
            type: 'code',
        },
        {
            type: 'iconLink',
        },
        {
            type: 'iconLinksList',
        },
    ],
};
