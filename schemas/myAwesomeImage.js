import React from 'react';

const preview = (props) => {
    return <pre>{JSON.stringify(props, null, 2)}</pre>;
};
export default {
    name: 'myAwesomeImage',
    title: 'My Awesome Image',
    type: 'image',
    options: {
        hotspot: true,
    },
    // preview: {
    //     component: preview,
    // },
    fields: [
        {
            name: 'alt',
            type: 'string',
            validation: (rule) => rule.required(),
            title: 'Alternative Text',
            description:
                'You should input some alternate text for accessibility',
            options: {
                isHighlighted: true,
            },
        },
    ],
};
