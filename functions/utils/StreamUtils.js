require('dotenv').config();
const { cloudinary } = require('./cloudinary');
const { wrapTitleWords } = require('./StringUtils');
const generateLearningQuickCoverURL = ({
    title,
    guestName,
    guestTitle,
    guestImageName,
    time,
}) => {
    console.log(guestImageName);
    const [firstLine, secondLine] = wrapTitleWords(title, 16);
    console.log(firstLine, secondLine);
    const url = cloudinary.url('learning_quick/lg-bg-3', {
        transformation: [
            {
                overlay: {
                    font_family: 'Montserrat',
                    font_size: 130,
                    font_weight: 500,
                    text: firstLine.toUpperCase(),
                    text_align: 'right',
                },
                width: 1250,
                color: '#0E142E',
                effect: 'colorize',
                y: '-280',
                x: '50',
                crop: 'limit',
                gravity: 'east',
            },
            {
                overlay: {
                    font_family: 'Montserrat',
                    font_size: 150,
                    font_weight: 700,
                    text: secondLine.toUpperCase(),
                    text_align: 'right',
                },
                width: 1250,
                color: '#ffffff',
                effect: 'colorize',
                y: '-130',
                x: '50',
                crop: 'limit',
                gravity: 'east',
            },
            {
                overlay: {
                    font_family: 'Montserrat',
                    font_size: 32,
                    text: 'FEATURING',
                },
                color: '#ffffff',
                effect: 'colorize',
                y: '500',
                x: '50',
                crop: 'limit',
                gravity: 'south_east',
            },
            {
                overlay: {
                    font_family: 'Montserrat',
                    font_size: 75,
                    text: guestName.toUpperCase(),
                    font_weight: 'bold',
                    text_align: 'right',
                },
                color: '#0E142E',
                effect: 'colorize',
                y: '400',
                x: '50',
                width: '1000',
                crop: 'limit',
                gravity: 'south_east',
            },
            {
                overlay: {
                    font_family: 'Montserrat',
                    font_size: 38,
                    text: guestTitle.toUpperCase(),
                    text_align: 'right',
                },
                color: '#ffffff',
                effect: 'colorize',
                y: '350',
                x: '50',
                width: 1000,
                crop: 'limit',
                gravity: 'south_east',
            },
            {
                overlay: {
                    font_family: 'Montserrat',
                    font_size: 60,
                    text: time,
                    fontWeight: 'bold',
                },
                color: '#ffffff',
                effect: 'colorize',
                y: '110',
                x: '50',
                width: '600',
                crop: 'limit',
                gravity: 'south_east',
            },
            {
                overlay: 'learning_quick:me.png',
                height: '400',
                width: '400',
                y: '-50',
                x: '-650',
                radius: 'max',
                border: '6px_solid_rgb:c7d0d9',
            },
            {
                overlay: `learning_quick:${guestImageName}`,
                height: '400',
                width: '400',
                y: '150',
                x: '-400',
                radius: 'max',
                // border: '10px_solid_rgb:de5254',
                crop: 'fill',
                border: '6px_solid_rgb:c7d0d9',
            },
        ],
    });
    return url;
};

const uploadGuestProfilePicIfNotExists = async (
    guestImageName,
    guestImageURL
) => {
    console.log(`Uploading image for${guestImageName}`);
    console.log(`Upload image from ${guestImageURL}`);
    try {
        const res = await cloudinary.uploader.upload(guestImageURL, {
            public_id: `learning_quick/${guestImageName}`,
        });
        console.log(res);
        return guestImageName;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    generateLearningQuickCoverURL,
    uploadGuestProfilePicIfNotExists,
};
