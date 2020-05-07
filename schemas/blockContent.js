export default {
    name: 'richText',
    type: 'array',
    title: 'My Awesome Content',
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
    ],
};
