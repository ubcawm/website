// nav.js
// Generated with assistance from Claude (Anthropic)
(function () {
  var path = location.pathname.replace(/\/$/, ''); // strip trailing slash
  var currentPage = path.split('/').pop() || '';   // last segment, or '' for root

  var primaryItems = [
    { href: '/',            slug: '',           label: 'Home'   },
    { href: '/about',       slug: 'about',      label: 'About'  },
    { href: '/events',      slug: 'events',     label: 'Events' },
    { href: '/team',        slug: 'team',       label: 'Team'   },
  ];

  var overflowItems = [
    { href: '/mentorship',  slug: 'mentorship',  label: 'Mentorship'   },
    { href: '/membership',  slug: 'membership',  label: 'Get Involved' },
    { href: '/resources',   slug: 'resources',   label: 'Resources'    },
    { href: '/partners',    slug: 'partners',    label: 'Partners'     },
    { href: '/contact',     slug: 'contact',     label: 'Contact'      },
    { href: '/faq',         slug: 'faq',         label: 'FAQ'          },
  ];

  function isActive(slug) {
    if (slug === '') return currentPage === '' || currentPage === 'index';
    return currentPage === slug;
  }

  function buildLi(item) {
    var active = isActive(item.slug) ? 'active' : '';
    var cta    = item.slug === 'membership' ? 'nav-cta' : '';
    var cls    = [cta].filter(Boolean).join(' ');
    return (
      '<li' + (cls ? ' class="' + cls + '"' : '') + '>' +
        '<a href="' + item.href + '"' + (active ? ' class="' + active + '"' : '') + '>' +
          item.label +
        '</a>' +
      '</li>'
    );
  }

  var primaryLinks  = primaryItems.map(buildLi).join('');
  var overflowLinks = overflowItems.map(buildLi).join('');
  var allMobileLinks = primaryItems.concat(overflowItems).map(buildLi).join('');

  var logoHTML =
    '<a class="nav-logo" href="/" aria-label="AWM at UBC — Home">' +
      '<img src="/images/LogoLightMode.png" alt="AWM at UBC logo" class="nav-logo-img" />' +
      '<span class="nav-logo-text">AWM @ UBC</span>' +
    '</a>';

  var html =
    '<nav class="site-nav">' +
      '<div class="nav-inner">' +
        logoHTML +
        '<ul class="nav-links" id="navLinks">' +
          primaryLinks +
          '<li class="nav-more" id="navMoreItem">' +
            '<button class="nav-more-btn" id="moreBtn" aria-haspopup="true" aria-expanded="false">' +
              'More ' +
              '<span class="more-chevron" aria-hidden="true"></span>' +
            '</button>' +
            '<ul class="more-dropdown" id="moreDropdown" aria-hidden="true">' +
              overflowLinks +
            '</ul>' +
          '</li>' +
        '</ul>' +
        '<button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
        '<div class="nav-mobile-panel" id="mobilePanel" aria-hidden="true">' +
          '<ul>' + allMobileLinks + '</ul>' +
        '</div>' +
      '</div>' +
    '</nav>';

  document.getElementById('nav-placeholder').innerHTML = html;

  var moreBtn      = document.getElementById('moreBtn');
  var moreDropdown = document.getElementById('moreDropdown');
  moreBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = moreDropdown.classList.toggle('open');
    moreBtn.classList.toggle('open', isOpen);
    moreBtn.setAttribute('aria-expanded', isOpen);
    moreDropdown.setAttribute('aria-hidden', !isOpen);
  });

  var navToggle   = document.getElementById('navToggle');
  var mobilePanel = document.getElementById('mobilePanel');
  navToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = mobilePanel.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    mobilePanel.setAttribute('aria-hidden', !isOpen);
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.site-nav')) return;
    if (moreDropdown.classList.contains('open')) {
      moreDropdown.classList.remove('open');
      moreBtn.classList.remove('open');
      moreBtn.setAttribute('aria-expanded', 'false');
      moreDropdown.setAttribute('aria-hidden', 'true');
    }
    if (mobilePanel.classList.contains('open')) {
      mobilePanel.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      mobilePanel.setAttribute('aria-hidden', 'true');
    }
  });

})();
