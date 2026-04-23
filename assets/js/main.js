document.addEventListener('DOMContentLoaded', function () {
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
  canvas.addEventListener('mousemove', draw);
}

function startDrawing(event) {
    drawing = true;
    draw(event); 
}

function stopDrawing() {
    drawing = false;
    context.beginPath(); 
}

function draw(event) {
    if (!drawing) return;

    context.lineWidth = 5;
    context.lineCap = 'round';

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (currentTool === 'brush') {
        context.strokeStyle = document.getElementById('colorPicker').value;
    } else if (currentTool === 'eraser') {
        context.strokeStyle = '#FFFFFF';
    }

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function setTool(tool) {
    currentTool = tool;
}





