// Sections
const headerSection = document.querySelector('#header')
const trendingPreviewSection = document.querySelector('#trendingPreview')
const categoriesPreviewSection = document.querySelector('#categoriesPreview')
const genericSection = document.querySelector('#genericList')
const movieDetailSection = document.querySelector('#movieDetail')
const favorites = document.querySelector('.favorites')
const favoritesMovieList = document.querySelector('.favorites-movieList')
// Lists & Containers
const searchForm = document.querySelector('#searchForm')
const trendingMoviesPreviewList = document.querySelector(
  '.trendingPreview-movieList'
)

const movieContainerTrending = document.querySelector(
  '.trendingPreview-movieList .movie-container'
)
const movieContainerTrendingBefore = getComputedStyle(
  movieContainerTrending,
  '::before'
)

const categoriesPreviewList = document.querySelector('.categoriesPreview-list')
const movieDetailCategoriesList = document.querySelector(
  '#movieDetail .categories-list'
)
const relatedMoviesContainer = document.querySelector(
  '.relatedMovies-scrollContainer'
)
const movieDetailGeneralcontainer = document.querySelector(
  '.movieDetail-generalcontainer'
)

const movieDetailGeneralcontainerFlex = document.querySelector(
  ' .movieDetail-generalcontainerFlex'
)
const movieDetailContainerImg = document.querySelector(
  '.movieDetail-containerImg'
)

// Elements
const headerContainer = document.querySelector('.header-container')
const headerTitle = document.querySelector('.header-title')
const arrowBtn = document.querySelector('.header-arrow')
const headerCategoryTitle = document.querySelector(
  '.header-title--categoryView'
)

const searchFormInput = document.querySelector('#searchForm input')
const searchFormBtn = document.querySelector('#searchBtn')

const trendingBtn = document.querySelector('.trendingPreview-btn')

const movieDetailTitle = document.querySelector('.movieDetail-title')
const movieDetailDescription = document.querySelector(
  '.movieDetail-description'
)
const movieDetailScore = document.querySelector('.movieDetail-score')
const inputSearch = document.querySelector('.inputSearch')
const movieSimilarContainer = document.querySelector('movie-container')

const containerLoad = document.querySelector('.containerLoad')
const movieContainer = document.querySelector('.movie-container')
const html = document.querySelector('html')
const footer = document.querySelector('footer')
const body = document.querySelector('body')
const buttonShowMore = document.createElement('button')
const containerMovies = document.createElement('div')
