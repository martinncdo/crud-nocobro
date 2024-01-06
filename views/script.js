const items = 2;
let section = undefined;
let classPags = [];
let elementsPags = [];
const $templateEntrevista = document.querySelector(".entrevista-template").content,
$fragment = document.createDocumentFragment(),
$seccionMultimedia = document.querySelector(".seccion-multimedia"),
$templateVideos = document.querySelector(".videos-template").content;

async function makePages(items, endpoint) {
    try {
        classPags = [];
        elementsPags = [];
        let res = await fetch(endpoint);
        let json = await res.json();

        let pagsHtml = "";
        let pag = 0;
        let i = 0;
        let page = []

        Object.keys(json).forEach(el => {
            i++;
            page.push(json[el])
            if (i % items === 0) {
                pag++;
                pagsHtml += `<button class="pag pag${pag}">${pag}</button>`;
                classPags.push(`.pag${pag}`);
                elementsPags.push(page);
                page = [];
            };           

            if (i === Object.keys(json).length) {
                pag++;
                pagsHtml += `<button class="pag pag${pag}">${pag}</button>`;
                classPags.push(`.pag${pag}`);
                elementsPags.push(page);
                page = []
            };
        });
        document.querySelector(".row-paginas").innerHTML = pagsHtml;
    } catch (err) {
        console.log(err);
    };
};

document.addEventListener("click", (e) => {
    // Primer click
    if (e.target.matches(".btn-entrevistas")) {
        $seccionMultimedia.innerHTML = "";
        makePages(items, "http://192.168.0.177:8000/entrevistas");
        section = "entrevistas";
    };

    // Segundo click
    if (section === "entrevistas") {
        classPags.forEach(btnClass => {
            if (e.target.matches(btnClass) && section === "entrevistas") {
                $seccionMultimedia.innerHTML = "";
                elementsPags[e.target.textContent - 1].forEach(element => {
                    console.log(element);
                    $templateEntrevista.querySelector(".titulo").textContent = element.titulo;
                    $templateEntrevista.querySelector(".fecha").textContent = element.fecha;
                    $templateEntrevista.querySelector(".descripcion").textContent = element.descripcion;
                    $templateEntrevista.querySelector(".btn-deleteEntrevista").dataset.id = element.id;
                                        
                    let htmlRow = `<tr class="first-row">
                        <th class="column-redes">Red Social</th>
                        <th class="column-redes">Links</th>
                    </tr>`;
    
                    for (let i = 0; i < element.redes.length; i++) {
                        htmlRow += `<tr class="row-redes">
                            <th class="column-redes">${element.redes[i]}</th>
                            <th class="column-rees">${element.link_redes[i]}</th>
                        </tr>
                        `;  
                    };
    
                        $templateEntrevista.querySelector(".table-entrevistas").innerHTML = htmlRow;
                        $templateEntrevista.querySelector(".link-youtube").textContent = element.link_entrevista;
                        let $clone = document.importNode($templateEntrevista, true);
                        $fragment.appendChild($clone);
                    });
    
                $seccionMultimedia.appendChild($fragment);
            };
        });
    };

    // Tercer click
    if (e.target.matches(".btn-videos")){
      $seccionMultimedia.innerHTML = "";
      makePages(items, "http://192.168.0.177:8000/videos");  
      section = "videos";
    };

    if (section === "videos"){
        classPags.forEach(btnClass => {
            if (e.target.matches(btnClass) && section === "videos") {
                $seccionMultimedia.innerHTML = "";
                elementsPags[e.target.textContent - 1].forEach(element => {
                    console.log(element)
                    $templateVideos.querySelector(".usuario-instagram").textContent = element.usuario_instagram;

                    let html = `<tr class="row-redes">
                        <th class="column-redes">Link de instagram</th>
                        <th class="column-rees">${element.link_instagram}</th>
                    </tr>
                    <tr class="row-redes">
                        <th class="column-redes">Link del video</th>
                        <th class="column-rees">${element.link_video}</th>
                    </tr>
                    `;

                    $templateVideos.querySelector(".table-videos").innerHTML = html;
                    $templateVideos.querySelector(".btn-deleteVideos").dataset.id = element.id;
                    let $clone = document.importNode($templateVideos, true);
                    $fragment.appendChild($clone);
                })
                $seccionMultimedia.appendChild($fragment);
            };
        });
    };

    // Cuarto click
    if (e.target.matches(".btn-añadir")) {
        document.querySelector(".row-paginas").innerHTML = `
            <button class="add-entrevista">Entrevista</button>
            <button class="add-video">Video</button> 
        `;
        $seccionMultimedia.innerHTML = "";
    };

    // Quinto click
    if (e.target.matches(".add-entrevista")) {
        $seccionMultimedia.innerHTML = `
        <form class="form-entrevista">
            <label>Titulo de la entrevista</label>
            <input type="text" name="titulo" placeholder="Ejemplo: Entrevista a Yaisa Montes">
            <label>Fecha</label>
            <input type="text" name="fecha" value="10 de noviembre de 2023 · Entrevista">
            <label>Descripción</label>
            <input type="text" name="descripcion" placeholder="Ingresá la descripción...">
            <div class="div-redes">
                <label for="spotify">Spotify</label>
                <input type="checkbox" value="spotify" id="spotify">
                <input type="text" class="link-spotify" placeholder="Link a cuenta de Spotify">
            </div>
            <div class="div-redes">
                <label for="instagram">Instagram</label>
                <input type="checkbox" value="instagram" id="instagram">
                <input type="text" class="link-instagram" placeholder="Link a cuenta de Instagram">
            </div>
            <div class="div-redes">
                <label for="youtube">YouTube</label>
                <input type="checkbox" value="youtube" id="youtube">
                <input type="text" class="link-youtube" placeholder="Link a canal de YouTube">
            </div>
            <div class="div-redes">
                <label for="facebook">Facebook</label>
                <input type="checkbox" value="facebook" id="facebook">
                <input type="text" class="link-facebook" placeholder="Link a cuenta de Facebook">
            </div>
            <label>Link de la entrevista</label>
            <input type="text" name="link_entrevista" placeholder="Link de entrevista en YouTube">
            <input type="submit" value="Agregar">
        </form>
        `;
    };

    // Sexto click
    if (e.target.matches(".add-video")){
        $seccionMultimedia.innerHTML =  `
            <form class="form-video">
                <label>Link del video en YouTube</label>
                <input type="text" name="link_video" placeholder="Link de video en YouTube">
                <label>Usuario de Instagram</label>
                <input type="text" name="usuario_instagram" placeholder="Usuario de Instagram">
                <label>Link de Instagram</label>
                <input type="text" name="link_instagram" placeholder="Link de la cuenta de Instagram">
                <input type="submit" value="Agregar">
            </form>
        `;
    };
});

let idRedes = ["#spotify", "#instagram", "#youtube", "#facebook"]

document.addEventListener("submit", (e) => {
    if (e.target == document.querySelector(".form-entrevista")) {
        e.preventDefault();
        let redes = [];
        let link_redes = [];
        for (let index = 0; index < idRedes.length; index++) {
            if (document.querySelector(idRedes[index]).checked === true){
                redes.push(document.querySelector(idRedes[index]).value);
                link_redes.push(document.querySelector(`.link-${idRedes[index].split("#")[1]}`).value);
            };
        };
        let nombre_artista = e.target.titulo.value.split(" ");
        let res = fetch("http://192.168.0.177:8000/entrevistas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: e.target.titulo.value,
                fecha: e.target.fecha.value,
                descripcion: e.target.descripcion.value,
                nombre_artista: nombre_artista[2],
                redes: redes,
                link_redes: link_redes,
                link_entrevista: e.target.link_entrevista.value
            })
        });
        $seccionMultimedia.innerHTML = "";
    };

    if (e.target.matches(".form-video")){
        e.preventDefault();
        let res = fetch("http://192.168.0.177:8000/videos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                link_video: e.target.link_video.value,
                link_instagram: e.target.link_instagram.value,
                usuario_instagram: e.target.usuario_instagram.value
            })
        })
    };
});

