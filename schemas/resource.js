export default {
    name: 'resource',
    title: 'Resource',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'link',
            title: 'Resource Link',
            type: 'string',
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 2,
        },

        {
            name: 'type',
            title: 'Type',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'resourceType' } }],
        },
        {
            name: 'tag',
            title: 'Tag',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'tag' } }],
        },
    ],
};
