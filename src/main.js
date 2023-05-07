import { moviePage } from './navigation.js'
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'content-Type': 'application/json;charset=utf-8'
  },
  params: {
    api_key: API_KEY
  }

})

function createMovies (movies, container) {
  container.innerHTML = ''
  const imagesURL = 'https://image.tmdb.org/t/p/w300'

  movies.forEach((movie) => {
    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie-container')

    const movieImg = document.createElement('img')
    movieImg.classList.add('movie-img')
    movieImg.setAttribute('alt', movie.title)
    movieImg.setAttribute('src', `${imagesURL}${movie.poster_path}`)

    movieContainer.appendChild(movieImg)
    container.appendChild(movieContainer)
  })
}

function createCategories (categories, container) {
  container.innerHTML = ''
  categories.forEach((category) => {
    const categoryContainer = document.createElement('div')
    const categoryTitleText = document.createTextNode(category.name)
    const categoryTitle = document.createElement('h3')

    categoryContainer.classList.add('category-container')
    categoryTitle.classList.add('category-title')
    categoryTitle.setAttribute('id', `id${category.id}`)

    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`
      genericSection.innerHTML = ''
      window.scrollTo(0, 0)
    })
    categoryTitle.appendChild(categoryTitleText)
    categoryContainer.appendChild(categoryTitle)
    container.appendChild(categoryContainer)
  })
}

function createSimilarMovies (movies) {
  relatedMoviesContainer.innerHTML = ''
  const imagesURL = 'https://image.tmdb.org/t/p/w300'
  movies.forEach((movie) => {
    const image = document.createElement('img')
    const containerImage = document.createElement('div')
    containerImage.classList.add('movie-container')
    image.classList.add('movie-img')
    image.alt = movie.title
    image.src = `${imagesURL}${movie.poster_path}`
    containerImage.appendChild(image)
    relatedMoviesContainer.appendChild(containerImage)
  })
}

export function selectCorrectMovie (movies) {
  const images = Array.from(
    document.querySelectorAll('.movie-container img')
  )
  images.forEach((image) => {
    image.addEventListener('click', findCorrectImg)
  })

  function findCorrectImg (event) {
    const ref = event.target.src.split('w300')[1]
    const filterMovie = movies.find((m) => {
      return m.poster_path === ref
    })
    moviePage(filterMovie)
    getCategoriesPreviewMovie(filterMovie)
  }
}

// llamados a API

export async function getTrendingMoviesPreview () {
  const trendingMovies = 'trending/movie/day'
  const { data } = await api(trendingMovies)

  const movies = data.results
  createMovies(movies, trendingMoviesPreviewList)
  selectCorrectMovie(movies)
  selectCorrectMovie(movies)
}
export async function getCategoriesPreview () {
  const categoriesMovies = 'genre/movie/list'
  const { data } = await api(categoriesMovies)
  const categories = data.genres

  createCategories(categories, categoriesPreviewList)
}
export async function getMoviesByCategory (id, category) {
  const trendingMovies = 'discover/movie'
  const { data } = await api(trendingMovies, {
    params: {
      with_genres: id
    }
  })

  const movies = data.results

  createMovies(movies, genericSection)
  selectCorrectMovie(movies)
}
export async function getMoviesBySearch (query) {
  const searchMovies = 'search/movie'
  const { data } = await api(searchMovies, {
    params: {
      query
    }
  })

  const movies = data.results

  createMovies(movies, genericSection)
  selectCorrectMovie(movies)
}
export async function getTrendingMovies () {
  const trendingMovies = 'trending/movie/day'
  const { data } = await api(trendingMovies)

  const movies = data.results
  createMovies(movies, genericSection)
  selectCorrectMovie(movies)
}
export async function getSimilarMovies (id) {
  const similarMovies = `/movie/${id}/similar`
  const { data } = await api(similarMovies)
  const movies = data.results
  createSimilarMovies(movies)
}
export async function getCategoriesPreviewMovie (genres) {
  const categoriesMovies = `movie/${genres.id}`
  const { data } = await api(categoriesMovies)
  const categories = data.genres
  createCategories(categories, movieDetailCategoriesList)
}
