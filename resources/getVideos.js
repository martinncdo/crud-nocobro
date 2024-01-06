import { Video } from "../config/models.js";

async function getVideos (req, res) {
    try {
        let sendJson = {};
        let videos = await Video.findAll();
        for (let i = 0; i < videos.length; i++) {
            sendJson[i] = videos[i].dataValues;
        };
        res.status(200).json(sendJson);
    }catch(error){
        console.log(`Error al mandar los videos: ${error}`);
    };
};

export default getVideos;