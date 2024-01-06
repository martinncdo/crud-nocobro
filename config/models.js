import { sequelize as sq } from "./db.js";
import { DataTypes } from "sequelize";

const User = sq.define("users", {
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userAgent: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

const Entrevista = sq.define("entrevistas", {
    titulo: {
        type: DataTypes.STRING
    },
    fecha: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    nombre_artista: {
        type: DataTypes.STRING
    },
    redes: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    link_redes: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    link_entrevista: {
        type: DataTypes.STRING
    }
});

const Video = sq.define("videos", {
    link_video: {
        type: DataTypes.STRING
    },
    link_instagram: {
        type: DataTypes.STRING
    },
    usuario_instagram: {
        type: DataTypes.STRING
    }
});

try {
    User.sync().then(() => {
        console.log("User Model synced");
    });
    
    Entrevista.sync().then(() => {
        console.log("Entrevista Model synced")
    });
    
    Video.sync().then(() => {
        console.log("Videos Model synced");
    });
}catch(err) {
    console.log(`Error al sincronizar modelos: ${err}`);
}

export { User, Entrevista, Video };