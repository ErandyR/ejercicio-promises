var arregloPlanetas = [];

function getJson(url) {
    return new Promise(function (resolve, reject) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", url);
        ajax.send();
        ajax.onreadystatechange = function (data) {
            if (ajax.readyState == 4)
                resolve(JSON.parse(ajax.responseText));
        }
    })
}

getJson("data/earth-like-results.json")
    .then(function (contenidoDelObjeto) {
        return getJson(contenidoDelObjeto.results.forEach(function (planetas) {
            getJson(planetas)
                .then(function (planeta) {
                    console.log(planeta);
                    funcionImpresora(planeta);
                });
        }));

    });

var tarjetaPlaneta = document.getElementById("contenedorTarjeta");

var plantillaInicial =
    '<div class="col s12 m7">' +
    '<div class="card">' +
    '<div class="card-image">' +
    '<img src="assets/img/gj667Cc.jpg">' +
    '<span class="card-title">Planeta</span>' +
    '</div>' +
    '<div class="card-content">' +
    '<p>Nombre: __nombre__</p>' +
    '<p>Fecha de descubrimiento: __desc__</p>' +
    '<p>Telescopio: __telescopio__</p>' +
    '</div>' +
    '</div>' +
    '</div>';



function funcionImpresora(planeta) {
    var plantillaFinal = "";
    var nombre = planeta.pl_name;
    var desc = planeta.pl_disc;
    var telescopio = planeta.pl_telescope;
    console.log(nombre + " " + desc + " " + telescopio);
    plantillaFinal += plantillaInicial.replace('__nombre__', nombre)
        .replace('__desc__', desc)
        .replace('__telescopio__', telescopio);
    tarjetaPlaneta.innerHTML += plantillaFinal;

};
