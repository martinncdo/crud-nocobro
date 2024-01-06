import { Video } from "../config/models.js";

async function postVideo (req, res) {
    let { link_video, link_instagram, usuario_instagram } = req.body;
    const video = await Video.create({
        link_video,
        link_instagram,
        usuario_instagram
    });
};

export { postVideo };