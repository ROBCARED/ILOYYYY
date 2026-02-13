// ============================================
// VALENTINE PREMIUM — CINEMATIC EXPERIENCE
// ============================================

// ── LOVE QUOTES ──
const quotes = [
    "Ornella, il existe des rencontres qui ne s'expliquent pas. La nôtre en fait partie. Cinq mois, et tu as marqué mon âme pour toujours.",
    "L'océan entre nous ne m'a jamais empêché de sentir quand tu avais mal. La France et le Togo ne sont que des mots sur une carte — toi et moi, on existe au-delà des frontières.",
    "La vie t'a frappée sans prévenir. Elle t'a pris des morceaux, elle t'a fait douter, elle t'a laissée à genoux. Mais regarde-toi. Tu es toujours là. Intacte. Invaincue. Magnifique.",
    "Ils sont venus, ils sont partis, ils sont revenus quand ça les arrangeait. Mais moi, Ornella — moi, je n'ai jamais bougé. Et je ne bougerai jamais.",
    "Tu m'as ouvert les portes de ton âme quand elle saignait. Tu m'as montré tes blessures sans masque. Cette confiance-là, c'est sacré. Je la protégerai toute ma vie.",
    "Quand le monde me pesait, ta voix suffisait à tout alléger. On s'est sauvé l'un l'autre sans même s'en rendre compte.",
    "Tu portes en toi une lumière que personne — ni les déceptions, ni les trahisons, ni la distance — ne pourra jamais éteindre.",
    "Tu mérites quelqu'un qui te choisit sans hésiter. Quelqu'un qui ne part pas. Quelqu'un qui comprend que tu n'es pas une option, mais une évidence.",
    "Cinq mois. C'est court pour le calendrier, mais c'est une éternité pour le cœur. Tu es gravée en moi, Ornella.",
    "6000 kilomètres. Et pourtant, personne au monde ne me connaît comme toi. Certains liens ne se mesurent pas en distance, mais en profondeur.",
    "Tu es belle. Pas de cette beauté qui s'oublie — de celle qui brûle, qui réchauffe, qui donne envie de devenir meilleur rien qu'en te regardant exister.",
    "Cette Saint-Valentin n'est pas une date. C'est ma façon de te dire : tu as compté quand personne ne regardait, et ça, je ne l'oublierai jamais."
];

let currentQuote = 0;
let isTyping = false;
const isMobile = window.innerWidth <= 480 || ('ontouchstart' in window);

// ── PRELOADER ──
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 1800);
});

// ── PARTICLE SYSTEM ──
function initParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const count = isMobile ? 25 : (canvasId === 'particleCanvas' ? 50 : 60);

    class Particle {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * canvas.width;
            this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedY = Math.random() * 0.4 + 0.1;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.fadeSpeed = Math.random() * 0.003 + 0.001;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.01 + 0.005;

            // Colors: gold and rose tones
            const colors = [
                [201, 169, 110],  // gold
                [212, 184, 124],  // gold-light
                [183, 110, 121],  // rose
                [212, 160, 167],  // rose-light
                [245, 213, 200],  // blush
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.y -= this.speedY;
            this.wobble += this.wobbleSpeed;
            this.x += Math.sin(this.wobble) * 0.3 + this.speedX;

            if (this.y < -10 || this.opacity <= 0) {
                this.reset();
            }
        }

        draw() {
            const [r, g, b] = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
            ctx.fill();

            // Glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.15})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Connection lines (skip on mobile for performance)
        if (!isMobile) {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const op = (1 - dist / 120) * 0.06;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(201, 169, 110, ${op})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// ── ROSE PETALS SYSTEM ──
function initRosePetals() {
    const canvas = document.getElementById('roseCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const petals = [];

    class Petal {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * canvas.width;
            this.y = initial ? Math.random() * canvas.height : -20;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 0.8 + 0.3;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * 0.02;
            this.opacity = Math.random() * 0.25 + 0.05;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.02 + 0.01;
            this.wobbleAmp = Math.random() * 1.5 + 0.5;

            const tones = [
                [183, 110, 121, 0.5],  // rose
                [201, 169, 110, 0.3],  // gold
                [212, 160, 167, 0.4],  // rose-light
                [190, 80, 90, 0.3],    // deep rose
            ];
            this.tone = tones[Math.floor(Math.random() * tones.length)];
        }

        update() {
            this.y += this.speedY;
            this.wobble += this.wobbleSpeed;
            this.x += Math.sin(this.wobble) * this.wobbleAmp + this.speedX;
            this.rotation += this.rotSpeed;

            if (this.y > canvas.height + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;

            const [r, g, b] = this.tone;

            // Petal shape
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(
                this.size * 0.5, -this.size * 0.8,
                this.size, -this.size * 0.3,
                0, this.size
            );
            ctx.bezierCurveTo(
                -this.size, -this.size * 0.3,
                -this.size * 0.5, -this.size * 0.8,
                0, 0
            );
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.7)`;
            ctx.fill();

            ctx.restore();
        }
    }

    for (let i = 0; i < (isMobile ? 15 : 30); i++) {
        petals.push(new Petal());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// ── TYPEWRITER WITH CURSOR ──
function typeWriter(element, text, speed = 35) {
    return new Promise((resolve) => {
        isTyping = true;
        element.innerHTML = '<span class="cursor"></span>';
        let i = 0;

        function type() {
            if (i < text.length) {
                const cursorEl = element.querySelector('.cursor');
                element.insertBefore(document.createTextNode(text.charAt(i)), cursorEl);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after a delay
                setTimeout(() => {
                    const cursor = element.querySelector('.cursor');
                    if (cursor) cursor.remove();
                    isTyping = false;
                    resolve();
                }, 1500);
            }
        }
        type();
    });
}

// ── SHOW QUOTE ──
function showQuote() {
    if (isTyping) return;
    const quoteText = document.getElementById('quoteText');

    // Fade out
    quoteText.style.opacity = '0';
    quoteText.style.transform = 'translateY(10px)';
    quoteText.style.transition = 'all 0.4s ease';

    setTimeout(() => {
        quoteText.style.transition = 'none';
        quoteText.style.opacity = '1';
        quoteText.style.transform = 'translateY(0)';
        typeWriter(quoteText, quotes[currentQuote], 30);
        currentQuote = (currentQuote + 1) % quotes.length;
    }, 400);
}

// ── LETTER LINES ANIMATION ──
function animateLetterLines() {
    const lines = document.querySelectorAll('.letter-line');
    lines.forEach((line, index) => {
        const delay = parseInt(line.getAttribute('data-delay')) || index * 200;
        setTimeout(() => {
            line.classList.add('visible');
        }, delay + 500);
    });
}

// ── SEAL BREAK + SCENE TRANSITION ──
function transitionToReveal() {
    const inviteScene = document.getElementById('scene-invite');
    const revealScene = document.getElementById('scene-reveal');

    // Exit animation
    inviteScene.classList.add('scene-exit');

    setTimeout(() => {
        inviteScene.classList.remove('active');
        inviteScene.style.display = 'none';

        revealScene.classList.add('active', 'scene-enter');

        // Init effects for reveal scene
        initRosePetals();

        // Show first quote
        setTimeout(() => showQuote(), 800);

        // Animate letter lines
        setTimeout(() => animateLetterLines(), 1200);
    }, 800);
}

// ── GOLDEN SPARKLE ON CLICK ──
function createSparkle(x, y) {
    const count = 6;
    for (let i = 0; i < count; i++) {
        const spark = document.createElement('span');
        spark.textContent = '✦';
        spark.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: ${Math.random() * 12 + 8}px;
            color: rgba(201, 169, 110, ${Math.random() * 0.6 + 0.4});
            pointer-events: none;
            z-index: 9999;
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        `;
        document.body.appendChild(spark);

        const angle = (Math.PI * 2 * i) / count;
        const distance = Math.random() * 80 + 40;

        requestAnimationFrame(() => {
            spark.style.left = (x + Math.cos(angle) * distance) + 'px';
            spark.style.top = (y + Math.sin(angle) * distance - 20) + 'px';
            spark.style.opacity = '0';
            spark.style.transform = `scale(0) rotate(${Math.random() * 180}deg)`;
        });

        setTimeout(() => spark.remove(), 1000);
    }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
    // Init particles for invite scene
    initParticles('particleCanvas');

    // Seal click
    const seal = document.getElementById('seal');
    seal.addEventListener('click', (e) => {
        createSparkle(e.clientX, e.clientY);

        // Seal break animation
        const wax = seal.querySelector('.seal-wax');
        wax.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        wax.style.transform = 'scale(1.5) rotate(15deg)';
        wax.style.opacity = '0';
        wax.style.filter = 'blur(4px)';

        setTimeout(() => transitionToReveal(), 500);
    });

    // Next quote button
    const nextBtn = document.getElementById('nextQuote');
    nextBtn.addEventListener('click', (e) => {
        createSparkle(e.clientX, e.clientY);
        showQuote();
    });

    // Ambient sparkle on click
    document.addEventListener('click', (e) => {
        if (e.target.closest('.seal') || e.target.closest('.quote-nav')) return;

        const spark = document.createElement('span');
        spark.textContent = '✦';
        spark.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 14px;
            color: rgba(201, 169, 110, 0.6);
            pointer-events: none;
            z-index: 9999;
            transition: all 0.8s ease-out;
        `;
        document.body.appendChild(spark);

        requestAnimationFrame(() => {
            spark.style.top = (e.clientY - 40) + 'px';
            spark.style.opacity = '0';
            spark.style.transform = 'scale(0)';
        });

        setTimeout(() => spark.remove(), 800);
    });
});
