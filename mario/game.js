const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configurações do jogo
const gravity = 0.5;
const mario = {
  x: 50,
  y: canvas.height - 60,
  width: 50,
  height: 50,
  color: 'red',
  speed: 5,
  velocityY: 0,
  isJumping: false,
};

// Controle do jogador
const keys = {
  right: false,
  left: false,
  up: false,
};

// Eventos do teclado
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') keys.right = true;
  if (event.key === 'ArrowLeft') keys.left = true;
  if (event.key === 'ArrowUp' && !mario.isJumping) {
    mario.isJumping = true;
    mario.velocityY = -10;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowRight') keys.right = false;
  if (event.key === 'ArrowLeft') keys.left = false;
  if (event.key === 'ArrowUp') keys.up = false;
});

// Atualização do jogo
function update() {
  // Movimentos laterais
  if (keys.right) mario.x += mario.speed;
  if (keys.left) mario.x -= mario.speed;

  // Gravidade
  mario.y += mario.velocityY;
  mario.velocityY += gravity;

  // Impedir que o Mario caia do canvas
  if (mario.y + mario.height >= canvas.height) {
    mario.y = canvas.height - mario.height;
    mario.isJumping = false;
  }

  // Limitar o Mario à tela
  if (mario.x < 0) mario.x = 0;
  if (mario.x + mario.width > canvas.width) mario.x = canvas.width - mario.width;
}

// Renderização do jogo
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhar o Mario
  ctx.fillStyle = mario.color;
  ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
}

// Loop do jogo
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Iniciar o jogo
gameLoop();
