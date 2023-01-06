const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'),
      navLink = document.querySelectorAll('.nav-link'),
      sections = document.querySelectorAll('section[id]'),
      themeBtn = document.getElementById('dark-btn'),
      darkTheme = 'dark-theme',
      iconTheme = 'fa-sun',
      selectedTheme = localStorage.getItem('selected-theme'),
      selectedIcon = localStorage.getItem('selected-icon'),
      getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light',
      getCurrentIcon = () => themeBtn.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun'
var accordion = new Accordion('.accordion-container');

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    })
};

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    })
};

/*--Remove Menu Mobile on click--*/
function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*--skills accordion--*/
function Accordion (element, newSettings) {
    var accordion = this
    var settings, classes
    if (!newSettings) {
      settings = {
        hideAll: false,
        showAll: false,
        showFirst: false,
        panelId: null }
      classes = {
        container: '.accordion-container',
        panel: '.skills-content'
      }
    } else {
      settings = newSettings
      classes = {
        container: element,
        panel: '.skills-content'
      }
    };
  
    accordion.settings = settings
    accordion.classes = classes
  
    var panels = document.querySelectorAll(accordion.classes.panel)
  
    panels.forEach(function (panel) {
      panel.addEventListener('click', function () {
        accordion.togglePanel(panel)
      })
    })
  
    this.togglePanel = function (panel) {
      panel.classList.toggle('active')
      var heading = panel.children[1]
      if (heading.style.maxHeight) {
        heading.style.maxHeight = null
      } else {
        heading.style.maxHeight = heading.scrollHeight + 'px'
      }
    }
  
    this.togglePanelById = function (id) {
      var panel = document.querySelectorAll('.skills-content')[id]
      accordion.togglePanel(panel)
    }
  
    this.showAll = function () {
      panels.forEach(function (panel) {
        panel.classList.add('active')
        var heading = panel.children[1]
        heading.style.maxHeight = heading.scrollHeight + 'px'
      })
    }
  
    this.hideAll = function () {
      panels.forEach(function (panel) {
        panel.classList.remove('active')
        var heading = panel.children[1]
        heading.style.maxHeight = null
      })
    }
  
    if (accordion.settings.showAll) accordion.showAll()
    if (accordion.settings.hideAll) accordion.hideAll()
    if (accordion.settings.showFirst) accordion.togglePanelById(parseInt(accordion.settings.panelId))
  };

/*--qualification tab--*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
  tab.addEventListener('click', () =>{
    const target = document.querySelector(tab.dataset.target)
    
    tabContents.forEach(tabContent =>{
      tabContent.classList.remove('qualification-active')
    })
    target.classList.add('qualification-active')
    tabs.forEach(tab =>{
      tab.classList.remove('qualification-active')
    })
    tab.classList.add('qualification-active')
  })
})

/*--active link--*/
function scrollActive(){
  const scrollY = window.pageYOffset

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute('id')
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
    }else{
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*--show scroll btn--*/
function scrollBtn(){
  const scrollBtn = document.getElementById('scroll-up')
  if(this.scrollY >= 360){
    scrollBtn.classList.add('showBtn')
  }else{
    scrollBtn.classList.remove('showBtn')
  }
}
window.addEventListener('scroll', scrollBtn)

/*--dark theme--*/
if(selectedTheme){
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeBtn.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}
themeBtn.addEventListener('click', () =>{
  document.body.classList.toggle(darkTheme)
  themeBtn.classList.toggle(iconTheme)
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})