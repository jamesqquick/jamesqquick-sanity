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
        const topic = doc?.topic;
        console.log(doc);
        if (!topic || !doc?.guestName || !doc?.guestTitle) return;

        // setIsPublishing(true);

        // try {
        //     await fetch(
        //         '/.netlify/functions/lqCover',
        //         {
        //             method: 'POST',
        //             body: JSON.stringify({
        //                 title: topic,
        //                 guestName: doc.guestName,
        //                 guestTitle: doc.guestTitle,
        //                 guestImage,
        //                 time,
        //                 id,
        //             }),
        //         }
        //     );
        // } catch (err) {
        //     console.error(err);
        // } finally {
        //     onComplete();
        // }
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
