import { useDocumentOperation } from '@sanity/react-hooks';
import React, { useState, useEffect } from 'react';

export function CreateStreamCoverAction({
    draft,
    published,
    id,
    type,
    onComplete,
}) {
    const { patch, publish } = useDocumentOperation(id, type);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    const doc = draft || published;
    const [guestImage, setGuestImage] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        if (isPublishing && !draft) {
            setIsPublishing(false);
        }
    }, [draft]);

    const createAndAttachCover = async () => {
        const topic = doc?.topic;
        console.log(doc);
        if (!topic || !doc?.guestName || !doc?.guestTitle) return;

        setIsPublishing(true);

        try {
            await fetch(
                'https://jqq-utils.netlify.app/.netlify/functions/lqCover',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        title: topic,
                        guestName: doc.guestName,
                        guestTitle: doc.guestTitle,
                        guestImage,
                        time,
                        id,
                    }),
                }
            );
        } catch (err) {
            console.error(err);
        } finally {
            onComplete();
            setDialogOpen(false);
        }
    };

    return {
        disabled: !published,
        label:
            type !== 'stream'
                ? null
                : isPublishing
                ? 'Generating image...'
                : 'Create Cover Image',
        onHandle: async () => {
            setDialogOpen(true);
        },
        dialog: isDialogOpen && {
            type: 'modal',
            onClose: () => {
                setDialogOpen(false);
            },
            content: (
                <>
                    <h2>Cover Image Title</h2>

                    <label htmlFor="guestImage">guestImage</label>

                    <input
                        type="text"
                        value={guestImage}
                        id="guestImage"
                        onChange={(e) => setGuestImage(e.target.value)}
                    />
                    <label htmlFor="time">Time</label>

                    <input
                        id="time"
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <button
                        onClick={async (event) => await createAndAttachCover()}
                    >
                        Create Cover Image
                    </button>
                </>
            ),
        },
    };
}
