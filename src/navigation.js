import {
  getTrendingMoviesPreview,
  getCategoriesPreview,
  getMoviesByCategory,
  getMoviesBySearch,
  getTrendingMovies,
  getOnlyMovie,
  addFavoriteMovieToSection
} from './main.js'

let count = 0

window.addEventListener('load', navigator, false)
window.addEventListener('hashchange', navigator, false)
searchFormBtn.addEventListener('click', () => {
  location.hash = `#search=${inputSearch.value}`
})
trendingBtn.addEventListener('click', () => {
  location.hash = '#trends'
})
arrowBtn.addEventListener('click', () => {
  if (count > 1) {
    history.back()
    arrowBtn.classList.remove('header-arrow--white')
    count--
  } else location.hash = 'home'
})

function navigator () {
  if (location.hash.startsWith('#trends')) {
    trendsPage()
  } else if (location.hash.startsWith('#search=')) {
    searchPage()
  } else if (location.hash.startsWith('#movie=')) {
    moviePage()
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage()
  } else {
    homePage()
  }
}
function trendsPage () {
  footer.classList.remove('inactive')
  html.style.background = '#5c218a'
  headerSection.classList.remove('header-container--long')
  // headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  if (window.innerWidth < 600) {
    arrowBtn.style.color = 'var(--purple-dark-2)'
    headerSection.style.paddingTop = '40px'
  } else {
    arrowBtn.style.color = 'white'
    headerCategoryTitle.style.color = 'white'
  }

  headerSection.style.position = 'relative'
  headerSection.style.display = 'flex'
  headerSection.style.justifyContent = 'space-between'
  headerSection.style.alignItems = 'center'
  headerSection.style.gap = '10px'

  headerSection.style.background = ''
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.remove('inactive')
  searchForm.classList.add('inactive')
  movieDetailGeneralcontainer.classList.add('inactive')
  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')
  headerCategoryTitle.innerText = 'Tendencias'
  favorites.classList.add('inactive')

  getTrendingMovies()
}
function searchPage () {
  footer.classList.remove('inactive')
  html.style.background = '#5c218a'
  headerSection.classList.remove('header-container--long')
  // headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  if (window.innerWidth <= 600) {
    arrowBtn.style.color = 'var(--purple-dark-2)'
  } else {
    arrowBtn.style.color = 'white'
  }
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.add('inactive')
  searchForm.classList.remove('inactive')
  headerSection.style.background = ''
  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')
  favorites.classList.add('inactive')
  movieDetailGeneralcontainer.classList.add('inactive')
  headerSection.style.position = 'relative'
  const movie = location.hash.split('=')[1]
  count++
  getMoviesBySearch(movie)
}
function moviePage (movie) {
  window.scrollTo(0, 0)
  html.style.background = 'white'
  footer.classList.add('inactive')
  const idMovie = location.hash.split('=')
  headerSection.classList.add('header-container--long')
  headerSection.style.background = ''
  arrowBtn.style.color = 'white'
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.add('header-arrow--white')
  arrowBtn.id = ''
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.add('inactive')
  searchForm.classList.add('inactive')
  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.add('inactive')
  movieDetailSection.classList.remove('inactive')
  favorites.classList.add('inactive')
  movieDetailGeneralcontainer.classList.add('inactive')

  count++
  getOnlyMovie(idMovie[1])
}
function categoriesPage () {
  footer.classList.remove('inactive')
  html.style.background = '#5c218a'
  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.remove('inactive')
  searchForm.classList.add('inactive')
  genericSection.classList.remove('inactive')
  movieDetailGeneralcontainer.classList.add('inactive')
  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  movieDetailSection.classList.add('inactive')
  favorites.classList.add('inactive')
  const idCategory = location.hash.split('=')
  headerSection.id = `id${idCategory[1].split('-')[0]}`
  headerSection.style.background = 'var(--idColor)'
  headerCategoryTitle.style.color = 'var(--idColor2'
  arrowBtn.style.color = 'var(--idColor2'
  const categoryId = location.hash.replace(/.*category=(\d+)-.*/g, '$1')
  const categoryName = location.hash.replace(/.*category=\d+-(\w+)/g, '$1')
  headerCategoryTitle.innerText = decodeURIComponent(categoryName)

  getMoviesByCategory(Number(categoryId))
}
function homePage () {
  movieContainer.style.background = ''
  footer.classList.remove('inactive')
  html.style.background = '#5c218a'
  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''
  headerSection.style.position = 'relative'
  arrowBtn.classList.add('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerTitle.classList.remove('inactive')
  headerCategoryTitle.classList.add('inactive')
  searchForm.classList.remove('inactive')
  trendingPreviewSection.classList.remove('inactive')
  categoriesPreviewSection.classList.remove('inactive')
  genericSection.classList.add('inactive')
  movieDetailSection.classList.add('inactive')
  favorites.classList.remove('inactive')
  movieDetailGeneralcontainer.classList.add('inactive')

  getTrendingMoviesPreview()
  getCategoriesPreview()
  addFavoriteMovieToSection()
}
