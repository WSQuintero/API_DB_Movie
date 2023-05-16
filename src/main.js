const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'content-Type': 'application/json;charset=utf-8'
  },
  params: {
    api_key: API_KEY
  }
})

let page1 = 1
let favoritesMovies = JSON.parse(localStorage.getItem('favoritesMovies')) || []
window.addEventListener('resize', toResize)

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

function createFavoriteButton (container, movie, isClicked) {
  const likeButton = document.createElement('div')
  const svgImg = document.createElement('img')
  let clicked = false

  svgImg.classList.add('like__button--img')
  svgImg.src = './svg/likeUnSelected.svg'
  likeButton.classList.add('like__button')
  likeButton.appendChild(svgImg)
  container.appendChild(likeButton)

  svgImg.addEventListener('click', clickFavorite)

  const findClicked = favoritesMovies.some((id) => id.id === movie.id)

  function clickFavorite () {
    if (clicked === false) {
      svgImg.src = './svg/likeSelected.svg'
      clicked = true

      if (!findClicked) {
        favoritesMovies.push({ ...movie, clicked: true })
        addNewFavoriteMovie()
        addFavoriteMovieToSection()
      }
    } else {
      clicked = false
      svgImg.src = './svg/likeUnSelected.svg'
      const favoritesMoviesUnSelected = favoritesMovies.filter((favorite) => {
        return favorite.id !== movie.id
      })
      favoritesMovies = favoritesMoviesUnSelected
      addFavoriteMovieToSection()
      addNewFavoriteMovie()
    }
  }

  if (isClicked !== undefined) {
    clicked = false
    clickFavorite()
  }
}
function addNewFavoriteMovie () {
  const favoriteMovie = JSON.stringify(favoritesMovies)
  localStorage.setItem('favoritesMovies', favoriteMovie)
}
function validateIsClicked (movie) {
  return favoritesMovies.find((mov) => mov.id === movie.id)
}

function createMovies (movies, container) {
  container.innerHTML = ''
  const imagesURL = 'https://image.tmdb.org/t/p/w300'

  movies.forEach((movie) => {
    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie-container')
    const movieImg = document.createElement('img')
    movieImg.classList.add('movie-img')
    createObserver().observe(movieContainer)
    if (movie.poster_path !== null) {
      movieImg.setAttribute('data-img', `${imagesURL}${movie.poster_path}`)
    } else {
      movieImg.setAttribute(
        'data-img',
        'https://thumbs.dreamstime.com/b/no-hay-se%C3%B1al-de-imagen-disponible-aislada-sobre-fondo-blanco-signo-aislado-ilustraci%C3%B3n-vectorial-219198729.jpg'
      )
    }
    arrowBtn.id = headerSection.id
    headerCategoryTitle.id = headerSection.id
    movieContainer.id = headerSection.id
    movieContainer.style.border = '2px solid var(--idColor)'
    movieContainer.style.padding = '7px'

    movieImg.setAttribute('loading', 'lazy')
    movieImg.id = movie.id
    movieImg.setAttribute('alt', movie.title)
    movieContainer.appendChild(movieImg)

    movieImg.addEventListener('click', (event) => {
      location.hash = `#movie=${movie.id}`
    })
    createFavoriteButton(movieContainer, movie, validateIsClicked(movie))
    validateImageComplete(movieImg, movieContainer, container)

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

function toResize () {
  if (window.innerWidth <= 600) {
    headerCategoryTitle.innerText = ''
    headerSection.style.background = 'none'
  } else {
    headerSection.style.background = '#0e122d'
    headerSection.style.color = '#fff'
  }
}

function createMovieDetail (movies) {
  headerCategoryTitle.classList.add('inactive')
  headerSection.style.position = 'fixed'
  arrowBtn.id = ''
  headerCategoryTitle.id = 'headerSection.id'
  if (window.innerWidth >= 600) {
    headerSection.style.background = '#0e122d'
    headerSection.style.color = '#fff'
    headerSection.id = ''
  }

  if (movies !== undefined) {
    const imagesURL = 'https://image.tmdb.org/t/p/w500'
    if (movies.poster_path === null) {
      movieDetailContainerImg.innerHTML =
        '<img class="movieDetail-Img" src="https://thumbs.dreamstime.com/b/no-hay-se%C3%B1al-de-imagen-disponible-aislada-sobre-fondo-blanco-signo-aislado-ilustraci%C3%B3n-vectorial-219198729.jpg">'
    } else {
      movieDetailContainerImg.innerHTML = `<img class="movieDetail-Img" src="${imagesURL}${movies.poster_path}">`
    }

    movieDetailGeneralcontainer.classList.remove('inactive')

    if (window.innerWidth >= '600') {
      headerCategoryTitle.classList.remove('inactive')
      headerCategoryTitle.innerText = decodeURIComponent(movies.title)
    } else {
      headerCategoryTitle.classList.add('inactive')
      headerCategoryTitle.innerText = ''
    }

    movieDetailTitle.innerText = decodeURIComponent(movies.title)
    movieDetailDescription.innerText = decodeURIComponent(movies.overview)
    movieDetailScore.innerText = movies.vote_average

    getSimilarMovies(movies.id)
    getCategoriesPreviewMovie(movies)
    createFavoriteButton(
      movieDetailContainerImg,
      movies,
      createFavoriteButton(movieContainer, movies, validateIsClicked(movies))
    )
  }
  const movieDetailFavoriteButton = document.querySelector(
    ' .movieDetail-containerImg .like__button .like__button--img'
  )
  const favoriteButtonCorrectMoviePage = favoritesMovies.some((a) => {
    return a.id === movies.id
  })
  if (favoriteButtonCorrectMoviePage) {
    movieDetailFavoriteButton.src = './svg/likeSelected.svg'
  }
}

function createButtonShowMore (container, generalContainer, link) {
  buttonShowMore.classList.add('buttonShowMore')
  buttonShowMore.innerText = 'Mostrar más'
  container.classList.add('containerMovies')
  generalContainer.insertAdjacentElement('beforeend', buttonShowMore)
  getNewPage(container, generalContainer, link)
}

// llamados a API
export async function getTrendingMoviesPreview () {
  const trendingMovies = 'trending/movie/day'
  const { data } = await api(trendingMovies, {
    params: {
      language: navigator.language || 'es-ES'
    }
  })

  const movies = data.results
  createMovies(movies, trendingMoviesPreviewList)
}
export async function getCategoriesPreview () {
  const categoriesMovies = 'genre/movie/list'
  const { data } = await api(categoriesMovies, {
    params: {
      language: navigator.language || 'es-ES'
    }
  })
  const categories = data.genres
  containerLoad.classList.add('inactive')

  createCategories(categories, categoriesPreviewList)
}
export async function getMoviesByCategory (id) {
  page1 = 1
  const trendingMovies = 'discover/movie'
  const { data } = await api(trendingMovies, {
    params: {
      with_genres: id,
      page: page1,
      language: navigator.language || 'es-ES'
    }
  })
  headerSection.style.position = 'relative'

  const movies = data.results
  genericSection.appendChild(containerMovies)

  createMovies(movies, containerMovies)
  createButtonShowMore(containerMovies, genericSection, trendingMovies)
  page1 = 2
}
export async function getMoviesBySearch (query) {
  const searchMovies = 'search/movie'
  const { data } = await api(searchMovies, {
    params: {
      query,
      language: navigator.language || 'es-ES'
    }
  })

  const movies = data.results

  createMovies(movies, genericSection)
}
export async function getTrendingMovies (page) {
  const trendingMovies = 'trending/movie/day'

  const { data } = await api(trendingMovies, {
    params: {
      page: 1,
      language: navigator.language || 'es-ES'
    }
  })
  const movies = data.results
  genericSection.appendChild(containerMovies)
  createMovies(movies, containerMovies)
  createButtonShowMore(containerMovies, genericSection, trendingMovies)
  page1 = 2
}
function getNewPage (container, generalContainer, link) {
  buttonShowMore.addEventListener('click', async () => {
    container.innerHTML = ''
    const generalLink = link

    const { data } = await api(generalLink, {
      params: {
        page: page1,
        language: navigator.language || 'es-ES'
      }
    })
    page1++
    const movies = data.results

    generalContainer.appendChild(container)
    createMovies(movies, container)

    generalContainer.insertAdjacentElement('beforeend', buttonShowMore)
  })
}
export async function getSimilarMovies (id) {
  const similarMovies = `/movie/${id}/similar`
  const { data } = await api(similarMovies, {
    params: {
      language: navigator.language || 'es-ES'
    }
  })
  const movies = data.results
  createMovies(movies, relatedMoviesContainer)
}
export async function getCategoriesPreviewMovie (genres) {
  const categoriesMovies = `movie/${genres.id}`
  const { data } = await api(categoriesMovies, {
    params: {
      language: navigator.language || 'es-ES'
    }
  })
  const categories = data.genres
  createCategories(categories, movieDetailCategoriesList)
}
export async function getOnlyMovie (id) {
  const onlyMovie = `movie/${id}`
  const { data } = await api(onlyMovie, {
    params: {
      language: navigator.language || 'es-ES'
    }
  })
  const movies = data

  createMovieDetail(movies)
}

// llamados a local storage

export function addFavoriteMovieToSection () {
  if (favoritesMovies.length === 0) {
    favoritesMovieList.innerHTML = ''
    const InformativeTextAboutFavoriteMovies = document.createElement('p')
    InformativeTextAboutFavoriteMovies.innerText =
      'Por favor agrega tus peliculas favoritas '
    favoritesMovieList.style.justifyContent = 'center'
    favoritesMovieList.appendChild(InformativeTextAboutFavoriteMovies)
  } else {
    favoritesMovieList.style.justifyContent = 'left'
    createMovies(favoritesMovies, favoritesMovieList)
  }
}
