export default {
    name: 'richText',
    type: 'array',
    title: 'My Content',
    of: [
        {
            type: 'block',
        },
        {
            type: 'myAwesomeImage',
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
        {
            type: 'ytVideo',
        },
    ],
};
