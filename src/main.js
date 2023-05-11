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
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const father = entry.target.parentNode
        father.classList.add('loading')
        const lazyImage = entry.target.querySelector('img')
        lazyImage.src = lazyImage.dataset.img
        observer.unobserve(lazyImage)
      }
    })
  }
  return new IntersectionObserver(callback)
}
function validateImageComplete (img, containerImg, generalContainer) {
  img.addEventListener('load', () => {
    if (img.complete) {
      generalContainer.classList.remove('loading')
      containerImg.classList.add('charge-end')
      containerImg.classList.remove('movie-container')
    }
  })
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
    createObserver().observe(movieContainer)
    if (movie.poster_path !== null) {
      movieImg.setAttribute('data-img', `${imagesURL}${movie.poster_path}`)
      movieImg.setAttribute('loading', 'lazy')
      movieImg.id = movie.id
      movieImg.setAttribute('alt', movie.title)
      movieContainer.appendChild(movieImg)
      validateImageComplete(movieImg, movieContainer, container)
    } else {
      movieContainer.innerHTML = `<h2>${movie.title}</h2>`
      movieContainer.classList.add('movie-else-img')
      movieContainer.style.background = '#2a0646'
      movieContainer.style.display = 'grid'
      movieContainer.style.placeItems = 'center'
    }

    container.appendChild(movieContainer)
  })

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
}
function createNullImg (movies) {
  const tittle = document.createElement('h2')
  tittle.classList.remove('inactive')
  tittle.classList.add('tittle')
  headerSection.style.background = '#2a0646'
  tittle.innerText = movies.original_title
  tittle.style.color = 'white'
  tittle.style.textAlign = 'center'
  tittle.style.fontSize = '60px'
  headerSection.appendChild(tittle)
  headerSection.style.color = 'white'
}
export function deleteNullImg () {
  const h2 = document.querySelector('header h2')
  if (h2) {
    h2.remove()
  }
}
function createMovieDetail (movies) {
  if (movies !== undefined) {
    const imagesURL = 'https://image.tmdb.org/t/p/w500'
    if (movies.poster_path !== null) {
      deleteNullImg()
      headerSection.style.background = `linear-gradient( 180deg, rgba(0, 0, 0, 0.35) 7.27%, rgba(0, 0, 0, 0) 40.17%),
    url(${imagesURL}${movies.poster_path}) `
    } else {
      deleteNullImg()
      createNullImg(movies)
    }
    movieDetailTitle.innerText = movies.title
    movieDetailDescription.innerText = movies.overview
    movieDetailScore.innerText = movies.vote_average

    getSimilarMovies(movies.id)
    getCategoriesPreviewMovie(movies)
  }
}
// function stopAnimation (container) {
//   container.classList.remove('loading')
// }
export function startAnimation (container) {
  container.classList.add('loading')
}

// llamados a API
export async function getTrendingMoviesPreview () {
  const trendingMovies = 'trending/movie/day'
  const { data } = await api(trendingMovies)

  const movies = data.results
  createMovies(movies, trendingMoviesPreviewList)
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
