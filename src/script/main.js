const $lista = document.getElementById('lista');


function DecodeToken(){

    const token = localStorage.getItem('token');
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    console.log(tokenPayload.role);

    return tokenPayload.role;
}

const rol = DecodeToken();

function HeaderDinamico(rol){

    if(rol == "mozo")
    {
        $lista.innerHTML = `
        <li><a href="./carta.html" class="text-zinc-800 text-xl">Carta</a></li>
        <li><a href="./mesas.html" class="text-zinc-800 text-xl">Mesas</a></li>
        `;
    }
    else if(rol == "cocinero")
    {

    }
    else if(rol == "bartender")
    {

    }
    


}

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
