const $links = document.querySelector(".links")
const $navToggle = document.querySelector(".nav-toggle");


$navToggle.addEventListener("click", function(){
  $links.classList.toggle("show-links")
})
  function mostrarFechaYHora() {
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var año = fecha.getFullYear();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();

    var texto = dia + "/" + mes + "/" + año + " " + hora + ":" + minutos + ":" + segundos;

    document.getElementById("fecha-y-hora").innerHTML = texto;
  }
