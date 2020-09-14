import { useDocumentOperation } from '@sanity/react-hooks';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function CreateBlogPostCoverAction({
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
    const [coverTitle, setCoverTitle] = useState(doc.title);

    useEffect(() => {
        if (isPublishing && !draft) {
            setIsPublishing(false);
        }
    }, [draft]);

    const createAndAttachCover = async () => {
        const title = doc.title;
        if (!title) return;

        setIsPublishing(true);

        try {
            await fetch(
                'https://jqq-utils.netlify.app/.netlify/functions/createBlogPostCover',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        title: coverTitle,
                        id: id,
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
            type !== 'post'
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
                    <input
                        type="text"
                        value={coverTitle}
                        onChange={(e) => setCoverTitle(e.target.value)}
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
