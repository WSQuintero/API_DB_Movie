const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'content-Type': 'application/json;charset=utf-8'
  },
  params: {
    api_key: API_KEY
  }
})

function createObserver () {
  const observer = new IntersectionObserver(callback)
  const target = document.querySelectorAll('img')
  // const img = document.querySelectorAll('img')

  target.forEach((img) => {
    observer.observe(img)
  })

  function callback (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target
        lazyImage.src = lazyImage.dataset.img
        observer.unobserve(lazyImage)
        console.log(lazyImage)
      }
    })
  }
}

function createMovies (movies, container) {
  window.scrollTo(0, 0)
  container.innerHTML = ''
  const imagesURL = 'https://image.tmdb.org/t/p/w300'

  movies.forEach((movie) => {
    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie-container')
    movieContainer.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`
    })
    const movieImg = document.createElement('img')
    movieImg.classList.add('movie-img')
    movieImg.setAttribute('alt', movie.title)
    movieImg.setAttribute('data-img', `${imagesURL}${movie.poster_path}`)
    movieImg.setAttribute('loading', 'lazy')
    movieImg.id = movie.id
    movieContainer.appendChild(movieImg)
    container.appendChild(movieContainer)
  })
  stopAnimation()
  createObserver()
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
  stopAnimation()
}
function createMovieDetail (movies) {
  if (movies !== undefined) {
    const imagesURL = 'https://image.tmdb.org/t/p/w500'
    headerSection.style.background = `linear-gradient( 180deg, rgba(0, 0, 0, 0.35) 7.27%, rgba(0, 0, 0, 0) 40.17%),
    url(${imagesURL}${movies.poster_path}) `
    movieDetailTitle.innerText = movies.title
    movieDetailDescription.innerText = movies.overview
    movieDetailScore.innerText = movies.vote_average
    getSimilarMovies(movies.id)
    getCategoriesPreviewMovie(movies)
  }
  stopAnimation()
}
function stopAnimation () {
  const estilo = document.createElement('style')
  document.head.appendChild(estilo)

  const regla =
    '.trendingPreview-movieList .movie-container::before  { animation: none; }'
  estilo.sheet.insertRule(regla, 0)
}
export function startAnimation () {
  const estilo = document.createElement('style')
  document.head.appendChild(estilo)

  const regla =
    '.trendingPreview-movieList .movie-container::before  { animation: opacidad 1s ease-in-out; }'
  estilo.sheet.insertRule(regla, 0)
}

// llamados a API
export async function getTrendingMoviesPreview () {
  const trendingMovies = 'trending/movie/day'
  const { data } = await api(trendingMovies)

  const movies = data.results
  createMovies(movies, trendingMoviesPreviewList)
  stopAnimation()
}
export async function getCategoriesPreview () {
  const categoriesMovies = 'genre/movie/list'
  const { data } = await api(categoriesMovies)
  const categories = data.genres
  containerLoad.classList.add('inactive')

  createCategories(categories, categoriesPreviewList)
}
export async function getMoviesByCategory (id) {
  const trendingMovies = 'discover/movie'
  const { data } = await api(trendingMovies, {
    params: {
      with_genres: id
    }
  })

  const movies = data.results

  createMovies(movies, genericSection)
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
}
export async function getTrendingMovies () {
  const trendingMovies = 'trending/movie/day'
  const { data } = await api(trendingMovies)

  const movies = data.results
  createMovies(movies, genericSection)
}
export async function getSimilarMovies (id) {
  const similarMovies = `/movie/${id}/similar`
  const { data } = await api(similarMovies)
  const movies = data.results
  createMovies(movies, relatedMoviesContainer)
}
export async function getCategoriesPreviewMovie (genres) {
  const categoriesMovies = `movie/${genres.id}`
  const { data } = await api(categoriesMovies)
  const categories = data.genres
  createCategories(categories, movieDetailCategoriesList)
}
export async function getOnlyMovie (id) {
  const onlyMovie = `movie/${id}`
  const { data } = await api(onlyMovie)
  const movies = data

  createMovieDetail(movies)
}
