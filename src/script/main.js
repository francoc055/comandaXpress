import {DecodeToken} from './../services/tokenService.js'

const $lista = document.getElementById('lista');

const token = localStorage.getItem('token');

const rol = DecodeToken(token);

function HeaderDinamico(rol){

    if(rol == "mozo")
    {
        $lista.innerHTML = `
        <li><a href="./carta.html" class="text-zinc-800 text-xl p-1">Carta</a></li>
        <li><a href="./mesas.html" class="text-zinc-800 text-xl p-1">Mesas</a></li>
        `;
    }
    else if(rol == "cocinero" || rol == "bartender")
    {
      $lista.innerHTML = `
      <li><a href="./pedidos.html" class="text-zinc-800 text-xl p-1">Pedidos</a></li>
      `;
    }

    
}

HeaderDinamico(rol);

function typewriterEffect(text, delay) {
    const target = document.getElementById('typewriter');
    let index = 0;
    let isDeleting = false;

    function animate() {
      const currentText = text.substring(0, index);

      target.textContent = currentText;

      if (!isDeleting) {
        index++;

        if (index > text.length) {
          isDeleting = true;
        }
      } else {
        index--;

        if (index === 0) {
          isDeleting = false;
        }
      }


      setTimeout(animate, 70);
    }

    animate();
  }

  const text = "Bienvenido a la comandaXpress";
  const delay = 70; 
  typewriterEffect(text, delay);


 