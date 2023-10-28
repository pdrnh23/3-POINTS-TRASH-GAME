

textoObjetoEstatico1.innerHTML = "Papel";
textoObjetoEstatico2.innerHTML = "Plástico";
textoObjetoEstatico3.innerHTML = "Metal";
textoObjetoEstatico4.innerHTML = "Vidro"; 

var objetosArrastaveis = document.getElementsByClassName("objeto");
var objetosEstaticos = document.getElementsByClassName("lixeiras");
var indexObjetoArrastavel = 0; // Índice do objeto arrastável atual

var acertos = 0; // Contador de acertos
var erros = 0; // Contador de erros

var placarAcertos = document.getElementById("placarAcertos");
var placarErros = document.getElementById("placarErros");

var posicoesIniciais = {
  objeto1: { top: '75%', left: '50%' },
  objeto2: { top: '75%', left: '50%' },
  objeto3: { top: '75%', left: '50%' },
  objeto4: { top: '75%', left: '50%' }
};


function atualizarPlacar() {
  placarAcertos.innerHTML = "Acertos: " + (acertos * 1);
  placarErros.innerHTML = "Erros: " + erros;
}

function incrementarAcertos() {
  acertos++;
  atualizarPlacar();
  exibirProximoObjeto();
}

function incrementarErros() {
  erros++;
  atualizarPlacar();
  if(erros >= 4) window.location.href = '/Gamer_Over/gameover.html' 
  exibirProximoObjeto();
}

function exibirProximoObjeto() {
  // Oculta o objeto arrastável atual
  objetosArrastaveis[indexObjetoArrastavel].style.visibility = "hidden";

  // Exibe o próximo objeto arrastável
  if (indexObjetoArrastavel == 3){
    for (var i = 0; i < objetosArrastaveis.length; i++) {
      var objeto = objetosArrastaveis[i];
      objeto.style.visibility = "hidden";
      objeto.style.top = posicoesIniciais[objeto.id].top;
      objeto.style.left = posicoesIniciais[objeto.id].left;
    }
    objetosArrastaveis[0].style.visibility = "visible";
    indexObjetoArrastavel = 0;
  }
  else indexObjetoArrastavel ++;

  if (indexObjetoArrastavel < objetosArrastaveis.length) {
    objetosArrastaveis[indexObjetoArrastavel].style.visibility = "visible";
  }
}

// Inicialize todos os objetos arrastáveis como invisíveis
for (var i = 0; i < objetosArrastaveis.length; i++) {
  objetosArrastaveis[i].style.visibility = "hidden";
}

// Exibe o primeiro objeto arrastável
objetosArrastaveis[0].style.visibility = "visible";

for (var i = 0; i < objetosArrastaveis.length; i++) {
  var objetoArrastavel = objetosArrastaveis[i];

  objetoArrastavel.addEventListener("mousedown", iniciarArrasto);
  objetoArrastavel.addEventListener("mousemove", arrastar);
  objetoArrastavel.addEventListener("mouseup", pararArrasto);
}

var isDragging = false;
var offsetX = 0;
var offsetY = 0;

function iniciarArrasto(event) {
  isDragging = true;
  offsetX = event.clientX - this.offsetLeft;
  offsetY = event.clientY - this.offsetTop;
}

function arrastar(event) {
  if (isDragging) {
    this.style.left = event.clientX - offsetX + "px";
    this.style.top = event.clientY - offsetY + "px";

    var ret1 = this.getBoundingClientRect();

    for (var i = 0; i < objetosEstaticos.length; i++) {
      var objetoEstatico = objetosEstaticos[i];
      var ret2 = objetoEstatico.getBoundingClientRect();

      if (
        ret1.left < ret2.right &&
        ret1.right > ret2.left &&
        ret1.top < ret2.bottom &&
        ret1.bottom > ret2.top
      ) {

        if (this.getAttribute("data-tipo") === objetoEstatico.parentElement.getAttribute("data-tipo")) {
          incrementarAcertos();
        } else {
          incrementarErros();
        }
        isDragging = false; // Adicionado para prevenir múltiplos incrementos durante um único arrasto
        break;
      }
    }
  }
}

function pararArrasto() {
  isDragging = false;
}

function reiniciarJogo() {
  // Redefinir contadores
  acertos = 0;
  erros = 0;

  // Atualizar placar
  atualizarPlacar();

  // Redefinir índice do objeto arrastável
  indexObjetoArrastavel = 0;

  // Ocultar todos os objetos arrastáveis e redefinir suas posições
  for (var i = 0; i < objetosArrastaveis.length; i++) {
    var objeto = objetosArrastaveis[i];
    objeto.style.visibility = "hidden";
    objeto.style.top = posicoesIniciais[objeto.id].top;
    objeto.style.left = posicoesIniciais[objeto.id].left;
  }

  // Tornar o primeiro objeto arrastável visível
  objetosArrastaveis[0].style.visibility = "visible";
}
