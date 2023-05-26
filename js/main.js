const Home = {
  render: () => 'Home Page',
}

const About = {
  render: () => 'About Page',
}

const Portfolio = {
  render: () => 'Portfolio Page',
}

const Gallery = {
  render: () => 'Gallery Page',
}

const SNS = {
  render: () => 'SNS Page',
}

const Error404 = {
  render: () => 'Page not found',
}

const routes = {
  '/': Home,
  '/about': About,
  '/portfolio': Portfolio,
  '/gallery': Gallery,
  '/sns': SNS,
}

function router() {
  const path = window.location.hash.slice(1) || '/'
  const page = routes[path] || Error404
  document.getElementById('root').innerHTML = page.render()

  // Remove 'active' class from all links
  const navLinks = document.querySelectorAll('.nav-link')
  navLinks.forEach((link) => link.classList.remove('active'))

  // Add 'active' class to the link of current page
  const activeLink = document.querySelector(`.nav-link[href='${path}.html']`)
  if (activeLink) {
    activeLink.classList.add('active')
  }
}

window.addEventListener('hashchange', router)
window.addEventListener('load', router)
