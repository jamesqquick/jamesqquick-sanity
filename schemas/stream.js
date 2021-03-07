import richDate from 'part:@sanity/form-builder/input/rich-date/schema';

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
            name: 'guestHandle',
            title: 'Guest Twitter Handle',
            type: 'string',
        },
        {
            name: 'topic',
            title: 'Topic',
            type: 'string',
        },
        {
            name: 'guestName',
            title: 'Guest Name',
            type: 'string',
        },
        {
            name: 'guestImageName',
            title:
                'Guest Image Name (image should already be uploaded to Cloudinary)',
            type: 'string',
        },
        {
            name: 'guestTitle',
            title: 'Guest Title',
            type: 'string',
        },
        {
            name: 'guestImage',
            title: 'Guest image',
            type: 'image',
            options: {
                hotspot: true,
            },
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
            type: 'richDate',
        },
        {
            name: 'mainContent',
            title: 'Main Content',
            type: 'richText',
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'coverImage', // Use the userPortait image field as thumbnail
        },
    },
};
