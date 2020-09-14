import defaultResolve from 'part:@sanity/base/document-actions';

import { CreateBlogPostCoverAction } from './actions/CreateBlogPostCover.js';

export default function resolveDocumentActions(props) {
    return [...defaultResolve(props), CreateBlogPostCoverAction];
}
