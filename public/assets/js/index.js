(function () {
  class Animal {
    constructor(name, edad, comentarios, imagen, sonido) {
      this.name = name;
      this.edad = edad;
      this.comentarios = comentarios;
      this.imagen = imagen;
      this.sonido = sonido;
    }

    mostrarEnTabla() {
      const animalesDiv = document.getElementById('Animales');
      const animalCard = document.createElement('div');
      animalCard.classList.add('participante', 'm-3', 'text-center');

      animalCard.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="assets/imgs/${this.imagen}" class="card-img-top" alt="${this.name}">
          <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">Edad: ${this.edad}</p>
            <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="mostrarDetalle('${this.name}', '${this.comentarios}')">Ver detalle</button>
            <button class="btn btn-success" onclick="reproducirSonido('${this.sonido}')">Reproducir sonido</button>
          </div>
        </div>
      `;

      animalesDiv.appendChild(animalCard);
    }
  }

  async function obtenerImagenes() {
    try {
      const response = await fetch('animales.json');
      const data = await response.json();
      return data.animales;
    } catch (error) {
      console.error('Error al obtener las imágenes de los animales:', error);
    }
  }

  function registrarAnimal() {
    const nombre = document.getElementById('animal').value;
    const edad = document.getElementById('edad').value;
    const comentarios = document.getElementById('comentarios').value;

    console.log(`Registrando animal: ${nombre}, Edad: ${edad}, Comentarios: ${comentarios}`);

    if (nombre && edad && comentarios) {
      obtenerImagenes().then((animales) => {
        const animalData = animales.find((animal) => animal.name === nombre);
        if (animalData) {
          const nuevoAnimal = new Animal(nombre, edad, comentarios, animalData.imagen, animalData.sonido);
          nuevoAnimal.mostrarEnTabla();
          // Reset the form fields
          document.getElementById('animal').value = "";
          document.getElementById('edad').value = "";
          document.getElementById('comentarios').value = "";
        }
      });
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  document.getElementById('btnRegistrar').addEventListener('click', registrarAnimal);

  window.mostrarDetalle = function (name, comentarios) {
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = `<p><strong>Animal:</strong> ${name}</p><p><strong>Comentarios:</strong> ${comentarios}</p>`;
  };

  window.reproducirSonido = function (sonido) {
    const player = document.getElementById('player');
    player.src = `assets/sounds/${sonido}`;
    player.play();
  };
})();

