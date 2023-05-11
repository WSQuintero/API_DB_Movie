import {
  getTrendingMoviesPreview,
  getCategoriesPreview,
  getMoviesByCategory,
  getMoviesBySearch,
  getTrendingMovies,
  getOnlyMovie,
  deleteNullImg
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
    deleteNullImg()
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
  headerSection.style.background = ''
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.remove('inactive')
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')
  headerCategoryTitle.innerText = 'Tendencias'
  getTrendingMovies()
}
function searchPage () {
  footer.classList.remove('inactive')
  html.style.background = '#5c218a'
  headerSection.classList.remove('header-container--long')
  // headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.add('inactive')
  searchForm.classList.remove('inactive')
  headerSection.style.background = ''
  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')
  const movie = location.hash.split('=')[1]
  count++
  getMoviesBySearch(movie)
}
function moviePage (movie) {
  window.scrollTo(0, 0)
  html.style.background = 'rgb(219, 219, 219)'
  footer.classList.add('inactive')
  const idMovie = location.hash.split('=')
  headerSection.classList.add('header-container--long')
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.add('header-arrow--white')
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.add('inactive')
  searchForm.classList.add('inactive')
  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.add('inactive')
  movieDetailSection.classList.remove('inactive')
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

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  movieDetailSection.classList.add('inactive')
  const categoryId = location.hash.replace(/.*category=(\d+)-.*/g, '$1')
  const categoryName = location.hash.replace(/.*category=\d+-(\w+)/g, '$1')
  headerCategoryTitle.innerText = categoryName

  getMoviesByCategory(Number(categoryId))
}
function homePage () {
  footer.classList.remove('inactive')
  html.style.background = '#5c218a'
  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''
  arrowBtn.classList.add('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerTitle.classList.remove('inactive')
  headerCategoryTitle.classList.add('inactive')
  searchForm.classList.remove('inactive')
  trendingPreviewSection.classList.remove('inactive')
  categoriesPreviewSection.classList.remove('inactive')
  genericSection.classList.add('inactive')
  movieDetailSection.classList.add('inactive')
  getTrendingMoviesPreview()
  getCategoriesPreview()
}
