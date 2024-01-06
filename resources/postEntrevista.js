import { Entrevista } from "../config/models.js";

async function postEntrevista (req, res) {
    console.log(req.body);
    let { titulo, fecha, descripcion, nombre_artista, redes, link_redes, link_entrevista } = req.body;
    const entrevista = Entrevista.create({
        titulo,
        fecha,
        descripcion,
        nombre_artista,
        redes,
        link_redes,
        link_entrevista
    });
};

export { postEntrevista };