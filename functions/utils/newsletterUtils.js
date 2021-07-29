const {
    getCurrentNewsletter,
    getRecentVideos,
    getShares,
    getCurrentStream,
} = require('./airtable');
const showdown = require('showdown');
const converter = new showdown.Converter();

const generateNewsletter = async () => {
    const newsletterInfo = await getCurrentNewsletter();
    const videos = await getRecentVideos();
    const shares = await getShares();
    const streamInfo = await getCurrentStream();
    const headerTemplate = getHeaderTemplate(newsletterInfo);
    const streamTemplate = getStreamTemplate(streamInfo);
    const recentVideosTemplate = getRecentVideosTemplate(videos);
    const sharesTempalte = getLBTLinksTemplate(shares);
    const promoTemplate = getPromoTemplate();
    const footerTemplate = getFooterTemplate();
    return [
        headerTemplate,
        streamTemplate,
        recentVideosTemplate,
        sharesTempalte,
        promoTemplate,
        footerTemplate,
    ].join('<br>');
};

const getLBTLinksTemplate = (records) => {
    const header = `<h1>Content From the #LearnBuildTeach Community
</h1><br>
<p>Learn.Build.Teach. is a personal philosophy and community. Here's the latest content from our Discord community.
</p>`;
    const closing = `<p>Want to share your work and learn from others? You can join the community <a href="https://discord.gg/vM2bagU">here.</a></p>
`;
    const links = records
        .map(
            (record) =>
                `<li><a href="${record.link}">${record.title}</a> by ${record.discordUser}</li>`
        )
        .join('');
    return header + links + '<br>' + closing;
};

const getRecentVideosTemplate = (records) => {
    const header = `<h1>Recent Videos</h1>`;
    const links = records
        .map((record) => {
            const smallImageURL = record.coverImage[0].thumbnails.large.url;
            return `</br><h3><a href="${record.link}">${record.title}</a></h3><br/><img src="${smallImageURL}" alt="${record.title} Cover Image"/><br/>`;
        })
        .join('');
    return header + '</br>' + links;
};

const getStreamTemplate = (streamInfo) => {
    if (!streamInfo) return '';
    let { coverImageURL } = streamInfo;
    coverImageURL = coverImageURL.replace('/v1', '/w_600/v1');

    return `<h1>Today's Stream - ${streamInfo.streamTitle} with ${streamInfo.fullName}</h1>
  <img src="${coverImageURL}"/><br>
  <p>We will go live at 11 am CST on Twitch! <a href="https://www.twitch.tv/jamesqquick">Join us on Twitch!</a></p>`;
};

const getPromoTemplate = () => {
    return `<h1>Check out the Compressed.fm Podcast</h1>
  <p>Check out the weekly podcast focused on Web Development and Design at <a href="http://compressed.fm/">compressed.fm</a>.</p>`;
};

const getHeaderTemplate = (newsletterInfo) => {
    if (!newsletterInfo) return '';
    const { intro } = newsletterInfo;
    const introHTML = converter.makeHtml(intro);
    return introHTML;
};

const getFooterTemplate = () => {
    return `<p>P.S. Don't forget to follow me on <a href="https://twitter.com/jamesqquick">Twitter</a> and subscribe to <a href="https://www.youtube.com/c/jamesqquick">my YouTube channel</a> for more great content.</p>`;
};

module.exports = { generateNewsletter };
