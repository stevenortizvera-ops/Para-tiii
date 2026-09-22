'use strict';

// Personaliza estos datos. Las rutas de fotos, canción y voz se indican en README.md.
const CONFIG = {
  relationshipStartDate: '2026-04-26', // 26 de abril de 2026
  heroPhoto: 'assets/foto1.png',       // Foto principal hero
  finalPhoto: 'assets/foto2.png',      // Foto sección final
  songCover: 'assets/foto1.png',        // Foto de portada en el disco giratorio
  songSrc: '',                          // Sin archivo MP3 local; usamos el widget de Spotify
  spotifyEmbedUrl: 'https://open.spotify.com/embed/track/35EfXlRKogBr1RvrkFBMHr?utm_source=generator&si=6e69524affd446c7', // Wonderwall - Oasis
  voiceSrc: 'assets/mensaje-steven.ogg',
  gallery: [
    { title: 'Nosotros, tal como somos', photo: 'assets/foto1.png', position: '50% 30%' },
    { title: 'Las salidas que recuerdo', photo: 'assets/foto2.png', position: '50% 40%' },
    { title: 'Los días sencillos', photo: 'assets/foto3.png', position: '50% 50%' },
    { title: 'Una foto favorita', photo: 'assets/foto4.png', position: '50% 30%' },
    { title: 'Las pequeñas aventuras', photo: 'assets/foto5.png', position: '50% 50%' },
    { title: 'Lo que viene después', photo: 'assets/foto6.png', position: '50% 40%' }
  ],
  timeline: [
    { date: '26 DE ABRIL DE 2026', title: 'Nuestra nueva etapa', description: 'Volver a encontrarnos y aprender a cuidarnos mejor. Un comienzo que quiero recordar contigo.' },
    { date: '26 DE MAYO DE 2026', title: 'Nuestro primer mes', description: 'Los días fueron sumando conversaciones, salidas y momentos que ya tienen un lugar especial para mí.' },
    { date: '26 DE JUNIO DE 2026', title: 'Nuestro segundo mes', description: 'Dos meses de aprendernos de nuevo, de reírnos y de seguir construyendo algo bonito juntos.' },
    { date: '26 DE JULIO DE 2026', title: 'Nuestro tercer mes', description: 'Tres meses que ya se sienten como muchos recuerdos. Gracias por cada uno de ellos.' },
    { date: '26 DE AGOSTO DE 2026', title: 'Nuestro cuarto mes ♡', description: 'Cuatro meses juntos. Cada día que pasa me confirma que volvería a elegirte una y otra vez.' }
  ]
};
const $ = id => document.getElementById(id);
const prefersLessMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
window.addEventListener('load', () => setTimeout(() => $('loading').classList.add('done'), 500));
setTimeout(() => $('loading').classList.add('done'), 1500);

$('openGift').addEventListener('click', () => $('historia').scrollIntoView({behavior:prefersLessMotion?'instant':'smooth'}));
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), {threshold:.08});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Typewriter en pantalla de bienvenida ──────────────────────────
(function initWelcomeAnimation() {
  if (prefersLessMotion) return; // Respeta preferencia de sin movimiento

  const giftCard   = document.querySelector('.gift-card');
  const invitation = document.querySelector('.invitation');
  const heartBtn   = document.querySelector('.heart-button');

  // Oculta todo inicialmente
  [...giftCard.children].forEach(el => { el.style.opacity = '0'; el.style.transition = 'none'; });
  invitation.style.opacity = '0';
  heartBtn.style.opacity   = '0';

  // Función fade-in suave
  function fadeIn(el, delay) {
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s ease';
      el.style.opacity = '1';
    }, delay);
  }

  // Función typewriter: escribe texto letra a letra
  function typewriter(el, text, startDelay, charDelay, onDone) {
    setTimeout(() => {
      el.style.transition = 'opacity 0.3s ease';
      el.style.opacity = '1';
      el.textContent = '';
      let i = 0;
      const interval = setInterval(() => {
        el.textContent += text[i++];
        if (i >= text.length) { clearInterval(interval); if (onDone) onDone(); }
      }, charDelay);
    }, startDelay);
  }

  // Secuencia de aparición (empieza cuando el loading termina ~1.6s)
  const base = 1700;
  const children = [...giftCard.children];
  // [0] eyebrow "TIENES UN REGALO"
  fadeIn(children[0], base);
  // [1] ornament ✳
  fadeIn(children[1], base + 500);
  // [2] eyebrow "PARA"
  fadeIn(children[2], base + 900);
  // [3] h1 "Nicolle" → typewriter letra a letra
  typewriter(children[3], 'Nicolle', base + 1300, 90, () => {
    // [4] thin-rule
    fadeIn(children[4], 0);
    // [5] "De Steven ♥"
    fadeIn(children[5], 300);
    // [6] texto intro
    fadeIn(children[6], 700);
    // Invitación y corazón al final
    setTimeout(() => {
      fadeIn(invitation, 0);
      fadeIn(heartBtn,   400);
    }, 900);
  });
})();


if (CONFIG.heroPhoto) { $('heroImage').src = CONFIG.heroPhoto; document.querySelector('.photo-note').hidden = true; }
if (CONFIG.finalPhoto) $('endImage').src = CONFIG.finalPhoto;
if (CONFIG.songCover) document.querySelector('.record img').src = CONFIG.songCover;

// El disco gira siempre (la canción va por Spotify)
$('record').classList.add('spinning');

const music = $('musicAudio');
const musicButton = $('musicButton');
if (CONFIG.songSrc) {
  music.src = CONFIG.songSrc;
  musicButton.addEventListener('click', async () => {
    if (music.paused) { try { await music.play(); } catch { $('songMessage').textContent = 'No se pudo reproducir la canción. Revisa el archivo de audio.'; } }
    else music.pause();
  });
  music.addEventListener('play', () => { $('record').classList.add('spinning'); musicButton.setAttribute('aria-label','Pausar canción'); });
  music.addEventListener('pause', () => { $('record').classList.remove('spinning'); musicButton.setAttribute('aria-label','Reproducir canción'); });
  music.addEventListener('ended', () => $('record').classList.remove('spinning'));
} else {
  musicButton.disabled = true;
  musicButton.title = 'Canción pendiente';
  musicButton.setAttribute('aria-label','Canción pendiente de añadir');
  $('songMessage').textContent = 'Un espacio reservado para esa canción que es nuestra.';
}
if (CONFIG.spotifyEmbedUrl && /^https:\/\/open\.spotify\.com\/embed\//.test(CONFIG.spotifyEmbedUrl)) {
  const iframe = document.createElement('iframe');
  iframe.src = CONFIG.spotifyEmbedUrl;
  iframe.title = 'Nuestra canción en Spotify';
  iframe.loading = 'lazy';
  iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  $('spotifySlot').append(iframe); $('spotifySlot').hidden = false;
}

const track = $('galleryTrack');
CONFIG.gallery.forEach((item, index) => {
  const card = document.createElement('article'); card.className = 'gallery-card';
  card.style.setProperty('--position',item.position || 'center');
  const photo = document.createElement('img'); photo.src = item.photo || 'assets/lirios.png';
  photo.alt = item.title;
  photo.loading = 'lazy';
  card.append(photo); track.append(card);
  const dot = document.createElement('button'); dot.type = 'button'; dot.className = 'gallery-dot';
  dot.setAttribute('aria-label','Ir al recuerdo ' + (index+1));
  dot.addEventListener('click', () => card.scrollIntoView({behavior:prefersLessMotion?'instant':'smooth',block:'nearest',inline:'center'}));
  $('galleryDots').append(dot);
});
const cards = [...track.children]; const dots = [...$('galleryDots').children];
let activeIndex = 0;
function updateGallery() {
  if (!cards.length) return;
  const center = track.getBoundingClientRect().left + track.clientWidth / 2;
  activeIndex = cards.reduce((best, card, index) =>
    Math.abs(card.getBoundingClientRect().left + card.offsetWidth/2 - center) < Math.abs(cards[best].getBoundingClientRect().left + cards[best].offsetWidth/2 - center) ? index : best,0);
  $('galleryCurrent').textContent = String(activeIndex+1).padStart(2,'0');
  $('galleryTotal').textContent = String(cards.length).padStart(2,'0');
  dots.forEach((dot,index) => {dot.classList.toggle('active',index === activeIndex);dot.setAttribute('aria-current',index === activeIndex?'true':'false');});
}
let raf;
track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(updateGallery); }, {passive:true});
window.addEventListener('resize',updateGallery);
$('galleryPrev').addEventListener('click', () => cards[Math.max(0,activeIndex-1)]?.scrollIntoView({behavior:prefersLessMotion?'instant':'smooth',inline:'center',block:'nearest'}));
$('galleryNext').addEventListener('click', () => cards[Math.min(cards.length-1,activeIndex+1)]?.scrollIntoView({behavior:prefersLessMotion?'instant':'smooth',inline:'center',block:'nearest'}));
track.addEventListener('keydown',e => {if(e.key === 'ArrowRight'){$('galleryNext').click();e.preventDefault()} if(e.key === 'ArrowLeft'){$('galleryPrev').click();e.preventDefault()}});
requestAnimationFrame(updateGallery);

if (CONFIG.relationshipStartDate && /^\d{4}-\d{2}-\d{2}$/.test(CONFIG.relationshipStartDate)) {
  const [y,m,d] = CONFIG.relationshipStartDate.split('-').map(Number);
  const start = Date.UTC(y,m-1,d), today = new Date();
  const current = Date.UTC(today.getFullYear(),today.getMonth(),today.getDate());
  const days = Math.floor((current-start)/86400000);
  if (days >= 0 && new Date(start).getUTCDate() === d) {
    $('daysCount').textContent = String(days);
    $('daysLabel').textContent = 'DÍAS JUNTOS';
    $('daysSince').textContent = 'desde el ' + new Intl.DateTimeFormat('es-PE',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(start));
  }
}
CONFIG.timeline.forEach(event => {
  const card = document.createElement('article'); card.className = 'event reveal';
  const date = document.createElement('span'); date.className = 'event-date'; date.textContent = event.date;
  const heading = document.createElement('h3');heading.textContent = event.title;
  const description = document.createElement('p');description.textContent = event.description;
  card.append(date,heading,description);$('timeline').append(card);observer.observe(card);
});

const waveform = $('waveform');
for(let i=0;i<55;i++) {
  const bar=document.createElement('span');
  bar.style.height = (10+Math.round((Math.sin(i*1.12)+1)*10+(Math.sin(i*.39+1)+1)*9))+'px';
  waveform.append(bar);
}
const voice = $('voiceAudio');
const voiceButton = $('voiceButton');
const formatTime = seconds => Number.isFinite(seconds) ? `${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}` : '0:00';
if (CONFIG.voiceSrc) {
  voice.src = CONFIG.voiceSrc;
  voiceButton.addEventListener('click', async () => {
    if(voice.paused){try{await voice.play()}catch{$('voiceStatus').textContent='No se pudo abrir el audio.'}}
    else voice.pause();
  });
  voice.addEventListener('loadedmetadata',()=>{$('voiceDuration').textContent=formatTime(voice.duration)});
  voice.addEventListener('play',()=>{voiceButton.textContent='Ⅱ';voiceButton.setAttribute('aria-label','Pausar mensaje de voz')});
  voice.addEventListener('pause',()=>{voiceButton.textContent='▶';voiceButton.setAttribute('aria-label','Reproducir mensaje de voz')});
  voice.addEventListener('timeupdate',()=>{
    const ratio = voice.duration ? voice.currentTime/voice.duration : 0;
    $('voiceProgress').value = String(Math.round(ratio*100));
    $('voiceCurrent').textContent = formatTime(voice.currentTime);
    [...waveform.children].forEach((bar,index)=>bar.classList.toggle('passed',index/55 < ratio));
  });
  $('voiceProgress').addEventListener('input',e=>{if(voice.duration)voice.currentTime=Number(e.target.value)/100*voice.duration});
} else {
  voiceButton.disabled = true;
  voiceButton.title = 'Audio pendiente';
  voiceButton.setAttribute('aria-label','Mensaje de voz pendiente de añadir');
  $('voiceStatus').textContent = 'Mi voz estará aquí pronto';
  $('voiceProgress').disabled = true;
}
const dialog = $('secretDialog');
$('secretTrigger').addEventListener('click',()=>dialog.showModal());
$('closeSecret').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
