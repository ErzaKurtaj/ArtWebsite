document.addEventListener('DOMContentLoaded', function () {
  // Mark the active nav link by matching the current filename
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach(link => {
    const linkFile = link.getAttribute('href').split('/').pop();
    if (linkFile === currentFile) link.classList.add('navbar__link--active');
  });

  const clickableHeadings = document.querySelectorAll('.clickable-heading');

  clickableHeadings.forEach(heading => {
      heading.addEventListener('click', function () {
          const description = this.nextElementSibling;
          if (description.style.display === 'none') {
              description.style.display = 'block';
          } else {
              description.style.display = 'none';
          }
      });
  });

  const navToggle = document.querySelector('.navbar__toggle');
  const navbar    = document.querySelector('.navbar');

  if (navToggle && navbar) {
    navToggle.addEventListener('click', function () {
      const isOpen = navbar.classList.toggle('navbar--open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when clicking outside the navbar
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target) && navbar.classList.contains('navbar--open')) {
        navbar.classList.remove('navbar--open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape and return focus to toggle
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navbar.classList.contains('navbar--open')) {
        navbar.classList.remove('navbar--open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }
});

// Modal functionality
function viewMore(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Close the modal when clicking outside of the modal content
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = 'none';
        }
    }
}

// Canvas drawing functionality
const canvas = document.getElementById('artCanvas');
const context = canvas ? canvas.getContext('2d') : null;
let drawing = false;
let currentTool = 'brush';

if (canvas) {
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('touchstart', e => { e.preventDefault(); startDrawing(e.touches[0]); }, { passive: false });
  canvas.addEventListener('touchend', stopDrawing);
  canvas.addEventListener('touchmove', e => { e.preventDefault(); draw(e.touches[0]); }, { passive: false });
}

function getCanvasCoords(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top)  * scaleY
  };
}

function startDrawing(event) {
  drawing = true;
  const { x, y } = getCanvasCoords(event);
  context.beginPath();
  context.moveTo(x, y);
}

function stopDrawing() {
  drawing = false;
  context.beginPath();
}

function draw(event) {
  if (!drawing) return;
  const sizeEl = document.getElementById('brushSize');
  context.lineWidth  = sizeEl ? parseInt(sizeEl.value) : 5;
  context.lineCap    = 'round';
  context.lineJoin   = 'round';
  if (currentTool === 'brush') {
    const picker = document.getElementById('colorPicker');
    context.strokeStyle = picker ? picker.value : '#1a0a0c';
    context.globalCompositeOperation = 'source-over';
  } else {
    context.strokeStyle = '#fdfaf7';
    context.globalCompositeOperation = 'source-over';
  }
  const { x, y } = getCanvasCoords(event);
  context.lineTo(x, y);
  context.stroke();
  context.beginPath();
  context.moveTo(x, y);
}

function clearCanvas() {
  if (context) context.clearRect(0, 0, canvas.width, canvas.height);
}

function setTool(tool) {
  currentTool = tool;
  document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
  const btn = document.getElementById(tool + 'Btn');
  if (btn) btn.classList.add('active');
  const status = document.getElementById('toolStatus');
  if (status) {
    status.innerHTML = tool === 'brush'
      ? '<i class="fa-solid fa-paintbrush"></i> Brush active'
      : '<i class="fa-solid fa-eraser"></i> Eraser active';
  }
}

function setColor(color) {
  const picker = document.getElementById('colorPicker');
  if (picker) picker.value = color;
  document.querySelectorAll('.swatch').forEach(s => {
    const bg = s.style.backgroundColor;
    const hex = color.toLowerCase();
    s.classList.toggle('active', s.style.background === hex || bg === hexToRgb(hex));
  });
  if (currentTool === 'eraser') setTool('brush');
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgb(${r}, ${g}, ${b})`;
}

function setBrushSize(size) {
  const label = document.getElementById('brushSizeVal');
  if (label) label.textContent = size;
}

function downloadCanvas() {
  if (!canvas) return;
  const offscreen = document.createElement('canvas');
  offscreen.width  = canvas.width;
  offscreen.height = canvas.height;
  const ctx = offscreen.getContext('2d');
  ctx.fillStyle = '#fdfaf7';
  ctx.fillRect(0, 0, offscreen.width, offscreen.height);
  ctx.drawImage(canvas, 0, 0);
  const link = document.createElement('a');
  link.download = 'my-artwork.png';
  link.href = offscreen.toDataURL('image/png');
  link.click();
}





