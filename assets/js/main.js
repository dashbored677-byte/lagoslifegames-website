const searchData = [
  { title: 'How to Play Lagos Life', url: '/how-to-play-lagos-life/', keywords: 'beginner guide start character six needs jobs money skills travel houses' },
  { title: 'Lagos Life Jobs & Salaries', url: '/lagos-life-jobs/', keywords: 'jobs salaries career promotion shift pay' },
  { title: 'How to Make Money in Lagos Life', url: '/how-to-make-money-in-lagos-life/', keywords: 'money guide jobs gigs budget rent savings' },
  { title: 'Lagos Life Best Careers', url: '/lagos-life-best-careers/', keywords: 'best careers job ranking pay shift skills progression' },
  { title: 'Lagos Life Codes & Cheats', url: '/lagos-life-codes-cheats/', keywords: 'codes cheats guide no official codes progression faster' },
  { title: 'Lagos Life App', url: '/lagos-life-app/', keywords: 'android iphone browser app fake APK download' },
  { title: 'Lagos Life Tips & Tricks', url: '/lagos-life-tips-and-tricks/', keywords: 'tips tricks needs time management jobs money transport' },
  { title: 'Lagos Life Houses & Rent', url: '/lagos-life-houses/', keywords: 'houses rent homes area weekly rent beginner upgrades' },
  { title: 'Lagos Life Map & Locations', url: '/lagos-life-map-locations/', keywords: 'map locations market beach entertainment danfo keke okada cab walk' },
  { title: 'Lagos Life Beginner Guide', url: '/lagos-life-beginner-guide/', keywords: 'beginner first day first job first week rent house career' }
];

const navToggle = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

function buildSearchResults(query) {
  const overlay = document.getElementById('searchOverlay');
  const resultsBox = document.getElementById('searchResults');
  if (!overlay || !resultsBox) return;

  const q = query.trim().toLowerCase();
  if (!q) {
    resultsBox.innerHTML = '<div class="empty-state">Type a term like jobs, money, houses, tips, or codes.</div>';
    return;
  }

  const matches = searchData.filter(item => {
    const haystack = `${item.title} ${item.keywords}`.toLowerCase();
    return haystack.includes(q);
  }).slice(0, 8);

  if (!matches.length) {
    resultsBox.innerHTML = '<div class="empty-state">No matches found. Try jobs, careers, map, houses, money, or beginner.</div>';
    return;
  }

  resultsBox.innerHTML = matches.map(item => `
    <a class="result-item" href="${item.url}">
      <div>
        <strong>${item.title}</strong>
        <span>${item.keywords}</span>
      </div>
      <span>Open</span>
    </a>
  `).join('');
}

const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchOpeners = document.querySelectorAll('[data-search-trigger]');

searchOpeners.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!searchOverlay) return;
    searchOverlay.classList.add('open');
    setTimeout(() => searchInput && searchInput.focus(), 50);
  });
});

const closeSearch = document.getElementById('closeSearch');
if (closeSearch && searchOverlay) {
  closeSearch.addEventListener('click', () => searchOverlay.classList.remove('open'));
}

if (searchOverlay) {
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) searchOverlay.classList.remove('open');
  });
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => buildSearchResults(e.target.value));
  buildSearchResults('');
}

const currentPath = window.location.pathname;
const navAnchors = document.querySelectorAll('.nav-links a');
navAnchors.forEach(link => {
  const href = link.getAttribute('href');
  if (href && href !== '/' && currentPath.startsWith(href)) {
    link.classList.add('active');
  } else if (href === '/' && currentPath === '/') {
    link.classList.add('active');
  }
});