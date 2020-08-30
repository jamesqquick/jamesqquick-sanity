import React from 'react';

const preview = ({ value }) => {
    return (
        <>
            {value.links &&
                value.links.map((link) => (
                    <p>
                        {link.type}- {link.link}
                    </p>
                ))}
        </>
    );
};
export default {
    name: 'iconLinksList',
    title: 'List of Icon Links',
    type: 'object',
    preview: {
        component: preview,
        select: {
            links: 'links',
        },
    },
    fields: [
        {
            name: 'links',
            type: 'array',
            of: [{ type: 'iconLink' }],
            title: 'Icon Links',
        },
    ],
};
