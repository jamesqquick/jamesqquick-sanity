export default {
    widgets: [
        {
            name: 'netlify',
            options: {
                title: 'My Netlify deploys',
                sites: [
                    {
                        title: 'James Q Quick Sanity',
                        apiId: process.env.SANITY_STUDIO_NETLIFY_APP_ID,
                        buildHookId:
                            process.env.SANITY_STUDIO_NETLIFY_BUILD_HOOK_ID,
                        name: process.env.SANITY_STUDIO_NETLIFY_SITE_NAME,
                    },
                ],
            },
        },
    ],
};
