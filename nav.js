// Refernce:
// Generated with assistance from Claude
// Prompt: "Build a dynamic nav bar with dropdown and mobile hamburger for GitHub Pages."
(function () {
    var currentPage = location.pathname.split('/').pop() || 'index.html';
  
     var primaryItems = [
      { href: 'index.html',  label: 'Home'   },
      { href: '/about',  label: 'About'  },
      { href: 'events.html', label: 'Events' },
      { href: 'team.html',   label: 'Team'   },
    ];
  
    var overflowItems = [
      { href: 'mentorship.html', label: 'Mentorship'  },
      { href: 'membership.html', label: 'Get Involved' },
      { href: 'resources.html',  label: 'Resources'   },
      { href: 'partners.html',   label: 'Partners'    },
      { href: 'contact.html',    label: 'Contact'     },
      { href: 'faq.html',        label: 'FAQ'         },
    ];
  
    function buildLi(item) {
      var active = item.href === currentPage ? 'active' : '';
      var cta    = item.href === 'membership.html' ? 'nav-cta' : '';
      var cls    = [cta].filter(Boolean).join(' ');
      return (
        '<li' + (cls ? ' class="' + cls + '"' : '') + '>' +
          '<a href="' + item.href + '"' + (active ? ' class="' + active + '"' : '') + '>' +
            item.label +
          '</a>' +
        '</li>'
      );
    }
  
    var primaryLinks = primaryItems.map(buildLi).join('');
  
    var overflowLinks = overflowItems.map(buildLi).join('');
  
    var allMobileLinks = primaryItems.concat(overflowItems).map(buildLi).join('');
  //Refernce: https://www.freecodecamp.org/news/how-to-build-a-responsive-navigation-bar-with-dropdown-menu-using-javascript/ 
    var logoHTML =
      '<a class="nav-logo" href="index.html" aria-label="AWM at UBC — Home">' +
        '<img src="images/LogoLightMode.png" alt="AWM at UBC logo" class="nav-logo-img" />' +
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
            '<span></span>' + 
            '<span></span>' + 
            '<span></span>' + 
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
