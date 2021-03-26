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
    const [firstLine, secondLine] = wrapTitleWords(title, 12);
    console.log('HEYYYYYYYYYYYYYYYYY');
    console.log(firstLine, secondLine);
    const url = cloudinary.url('learning_quick/lg-bg-2', {
        transformation: [
            {
                overlay: {
                    font_family: 'Montserrat',
                    font_size: 120,
                    font_weight: 500,
                    text: firstLine.toUpperCase(),
                    text_align: 'right',
                },
                width: 1000,
                crop: 'fit',
                color: '#0E142E',
                effect: 'colorize',
                y: '-280',
                x: '50',
                gravity: 'east',
            },
            {
                overlay: {
                    font_family: 'Montserrat',
                    font_size: 130,
                    font_weight: 700,
                    text: secondLine.toUpperCase(),
                    text_align: 'right',
                },
                width: 1050,
                crop: 'fit',
                color: '#ffffff',
                effect: 'colorize',
                y: '-130',
                x: '50',
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
                gravity: 'south_east',
            },
            {
                overlay: {
                    font_family: 'Montserrat',
                    font_size: 85,
                    text: guestName.toUpperCase(),
                    font_weight: 'bold',
                    text_align: 'right',
                },
                color: '#0E142E',
                effect: 'colorize',
                y: '400',
                x: '50',
                width: '1000',
                crop: 'fit',
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
                crop: 'fit',
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
                y: '105',
                x: '50',
                width: '600',
                gravity: 'south_east',
            },
            // {
            //     overlay: 'learning_quick:me.png',
            //     height: '300',
            //     width: '300',
            //     y: '150',
            //     x: '-525',
            //     radius: 'max',
            //     border: '6px_solid_rgb:c7d0d9',
            // },
            {
                overlay: `learning_quick:${guestImageName}`,
                height: '500',
                width: '500',
                y: '150',
                x: '-260',
                radius: 'max',
                // border: '10px_solid_rgb:de5254',
                crop: 'fill',
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
