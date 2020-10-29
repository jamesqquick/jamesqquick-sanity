import { useDocumentOperation } from '@sanity/react-hooks';
import React, { useState, useEffect } from 'react';

export function CreateStreamCoverAction({
    draft,
    published,
    id,
    type,
    onComplete,
}) {
    const [isPublishing, setIsPublishing] = useState(false);
    const doc = draft || published;

    useEffect(() => {
        if (isPublishing && !draft) {
            setIsPublishing(false);
        }
    }, [draft]);

    const createAndAttachCover = async () => {
        console.log(doc);
        // return;
        if (
            !doc?.topic ||
            !doc?.guestName ||
            !doc?.guestTitle ||
            !doc?.publishedDate ||
            !doc?.guestImageName
        )
            return;

        const { local } = doc.publishedDate;
        const date = new Date(local);
        const time = `${date
            .toDateString()
            .substring(0, 10)}, ${date.getHours()}:00 CDT`;

        setIsPublishing(true);

        try {
            await fetch('/.netlify/functions/lqCover', {
                method: 'POST',
                body: JSON.stringify({
                    title: doc.topic,
                    guestName: doc.guestName,
                    guestTitle: doc.guestTitle,
                    guestImageName: doc.guestImageName,
                    time,
                    id: doc._id,
                }),
            });
        } catch (err) {
            console.error(err);
        } finally {
            onComplete();
        }
    };

    return {
        disabled:
            !doc?.topic ||
            !doc?.guestName ||
            !doc?.guestTitle ||
            !doc?.publishedDate ||
            !doc?.guestImageName,
        label:
            type !== 'stream'
                ? null
                : isPublishing
                ? 'Generating image...'
                : 'Create Cover Image',
        onHandle: createAndAttachCover,
    };
}
