import { Entrevista } from "../config/models.js";

async function getEntrevistas (req, res) {
    try {
        let sendJson = {};
        let entrevistas = await Entrevista.findAll({
            order: [
                ['id', 'DESC']
            ]
        });
        for (let i = 0; i < entrevistas.length; i++) {
            sendJson[i] = entrevistas[i].dataValues;
        };
        res.status(200).json(sendJson);
    }catch(error){
        console.log(`Error al mandar las entrevistas: ${error}`);
    };
};

export default getEntrevistas;