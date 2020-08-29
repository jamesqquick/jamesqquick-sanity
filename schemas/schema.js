// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import blockContent from './blockContent';
import tag from './tag';
import post from './post';
import talk from './talk';
import stream from './stream';
import course from './course';
import resourceType from './resourceType';
import resource from './resource';
import ytVideo from './ytVideo';
import myAwesomeImage from './myAwesomeImage';
import scheduledTweet from './scheduledTweet';
import richDate from 'part:@sanity/form-builder/input/rich-date/schema';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
    // We name our schema
    name: 'default',
    // Then proceed to concatenate our document type
    // to the ones provided by any plugins that are installed
    types: schemaTypes.concat([
        // The following are document types which will appear
        // in the studio.
        post,
        tag,
        talk,
        stream,
        resourceType,
        resource,
        course,
        blockContent,
        myAwesomeImage,
        scheduledTweet,
        richDate,
        ytVideo,
    ]),
});
