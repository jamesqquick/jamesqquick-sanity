import React from 'react';

const preview = ({ value }) => {
    return (
        <>
            <p>
                {value.type} - {value.link}
            </p>
        </>
    );
};
export default {
    name: 'iconLink',
    title: 'Icon Link',
    type: 'object',
    preview: {
        component: preview,
        select: {
            link: 'link',
            type: 'type',
        },
    },
    fields: [
        {
            name: 'link',
            type: 'url',
            title: 'Link',
        },
        {
            name: 'text',
            type: 'string',
            title: 'text',
        },
        {
            title: 'Type',
            name: 'type',
            type: 'string',
            options: {
                list: [
                    { title: 'code', value: 'code' },
                    { title: 'event', value: 'event' },
                    { title: 'video', value: 'video' },
                    { title: 'slides', value: 'slides' },
                ],
            },
        },
    ],
};
