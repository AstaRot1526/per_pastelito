// Inicializa EmailJS
emailjs.init({
    publicKey: "vzfeyN8dbeiqwr5YN"  // reemplaza con tu publicKey real
});

const botonNo = document.getElementById('botonNo');
let fuegosActivos = false;

botonNo.addEventListener('mouseenter', () => {
  const contenedor = document.querySelector('.contenedor');
  const maxX = contenedor.clientWidth - botonNo.clientWidth;
  const maxY = contenedor.clientHeight - botonNo.clientHeight - 60;
  const nuevoX = Math.random() * maxX;
  const nuevoY = Math.random() * maxY;
  botonNo.style.left = `${nuevoX}px`;
  botonNo.style.top = `${nuevoY}px`;
});

// Frases románticas 🥹
const frases = [
  "Te adoro mi amor 🥹",
  "Me encantas mi cielo 🥹",
  "Eres la niña de mi corazón 🥹",
  "¿Quién es mi chiquitita? 🥹"
];

function crearFrase() {
  const frase = document.createElement('span');
  frase.classList.add('frase-que-cae');
  frase.textContent = frases[Math.floor(Math.random() * frases.length)];
  frase.style.left = Math.random() * 100 + "vw";
  frase.style.fontSize = (Math.random() * 10 + 16) + "px";
  document.body.appendChild(frase);

  setTimeout(() => {
    frase.remove();
  }, 5000);
}

function mostrarMensaje() {
  // Ocultar contenido
  document.getElementById('contenedor').style.display = 'none';
  document.getElementById('mensajeFinal').style.display = 'block';

  // Enviar correo con EmailJS
  emailjs.send("service_wbc9sse", "template_2budzms", {
    to_name: "Anthony Romero",
    message: "¡Le dieron que sí! 🥹"
  }).then(function(response) {
    console.log("Correo enviado ✅", response);
  }, function(error) {
    console.error("Error al enviar correo ❌", error);
  });

  // Lluvia de rosas
  for (let i = 0; i < 50; i++) {
    const rosa = document.createElement('img');
    rosa.src = 'https://stickerly.pstatic.net/sticker_pack/GKxNn91GyJYvRhMszE6eOQ/NTSEY9/33/-1883044000.png';
    rosa.classList.add('rosa');
    rosa.style.left = Math.random() * 100 + 'vw';
    rosa.style.top = '-50px';
    rosa.style.animationDuration = (Math.random() * 3 + 3) + 's';
    document.body.appendChild(rosa);
    setTimeout(() => rosa.remove(), 7000);
  }

  // Lluvia de frases 🥹
  setInterval(crearFrase, 1200);

  // Fuegos artificiales
  if (!fuegosActivos) {
    fuegosActivos = true;
    setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight / 2;
      crearFuego(x, y);
    }, 500);
  }
}

// Canvas fuegos
const canvas = document.getElementById('canvasFuegos');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const fuegos = [];

function crearFuego(x, y) {
  for (let i = 0; i < 40; i++) {
    fuegos.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      alpha: 1,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`
    });
  }
}

function animarFuegos() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fuegos.forEach((f, i) => {
    f.x += f.vx;
    f.y += f.vy;
    f.alpha -= 0.015;
    ctx.fillStyle = f.color;
    ctx.globalAlpha = f.alpha;
    ctx.beginPath();
    ctx.arc(f.x, f.y, 3, 0, Math.PI * 2);
    ctx.fill();
    if (f.alpha <= 0) fuegos.splice(i, 1);
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animarFuegos);
}

animarFuegos();
