import './styles.css';

const prompts = [
  '네온 도시의 밤거리를 걷는 여성, 시네마틱 --ar 16:9',
  '해변 일몰 배경으로 드론이 날아가는 장면, 골든아워',
  '클레이 캐릭터가 춤추는 루프 애니메이션, 귀여운 스타일',
  '운동화가 360도 회전하는 제품 영상, 스튜디오 조명',
  '판타지 전사가 숲을 걷는 장면, 애니메이션 스타일',
];

function initTypingEffect() {
  const el = document.getElementById('typing-prompt');
  if (!el) return;

  let promptIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function tick() {
    const current = prompts[promptIdx];

    if (!isDeleting) {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx >= current.length) {
        setTimeout(() => { isDeleting = true; tick(); }, 2000);
        return;
      }
      setTimeout(tick, 45 + Math.random() * 30);
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx <= 0) {
        isDeleting = false;
        promptIdx = (promptIdx + 1) % prompts.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 20);
    }
  }

  setTimeout(tick, 600);
}

function initCountUp() {
  const el = document.querySelector('[data-count]');
  if (!el) return;

  const target = parseInt(el.dataset.count, 10);
  let started = false;

  function animate() {
    if (started) return;
    started = true;
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);

      if (value >= 1000) {
        el.textContent = (value / 1000).toFixed(value >= 100000 ? 0 : 1) + 'K';
      } else {
        el.textContent = value.toString();
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = '127K';
      }
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(el);
}

function initPhoneHover() {
  const phones = document.querySelectorAll('.phone');
  if (!phones.length) return;

  phones.forEach((phone) => {
    const video = phone.querySelector('.phone__hover-video');
    if (!video) return;

    phone.addEventListener('mouseenter', () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    });

    phone.addEventListener('mouseleave', () => {
      video.pause();
    });

    // Mobile touch toggle
    let active = false;
    phone.addEventListener('touchstart', (e) => {
      e.preventDefault();
      active = !active;
      if (active) {
        phone.classList.add('phone--touched');
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        phone.classList.remove('phone--touched');
        video.pause();
      }
    }, { passive: false });
  });
}

function initToolCards() {
  const grid = document.querySelector('.ai-tools-grid');
  if (!grid) return;
  const cards = grid.querySelectorAll('.ai-tool-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 100);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(grid);
}

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initCountUp();
  initPhoneHover();
  initToolCards();
});
