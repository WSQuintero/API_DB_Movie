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
function createFavoriteButton (container) {
  const likeButton = document.createElement('div')
  likeButton.classList.add('like__button')
  const svgImg = document.createElement('img')
  svgImg.classList.add('like__button--img')
  svgImg.src = '../svg/likeUnSelected.svg'
  likeButton.appendChild(svgImg)
  container.appendChild(likeButton)

  svgImg.addEventListener('click', () => {
    svgImg.src = '/svg/likeSelected.svg'
    console.log('si')
  })
}
function createMovies (movies, container) {
  window.scrollTo(0, 0)
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
      movieImg.setAttribute('loading', 'lazy')
      movieImg.id = movie.id
      movieImg.setAttribute('alt', movie.title)
      movieContainer.appendChild(movieImg)

      movieImg.addEventListener('click', (event) => {
        location.hash = `#movie=${movie.id}`
      })

      createFavoriteButton(movieContainer)
      validateImageComplete(movieImg, movieContainer, container)
    } else {
      movieContainer.innerHTML = `<h2>${movie.title}</h2>`
      movieContainer.classList.add('movie-else-img')
      movieContainer.style.background = '#2a0646'
      movieContainer.style.display = 'grid'
      movieContainer.style.placeItems = 'center'
      createFavoriteButton(movieContainer)
    }

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
  page1 = 1
  const trendingMovies = 'discover/movie'
  const { data } = await api(trendingMovies, {
    params: {
      with_genres: id,
      page: page1
    }
  })

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
      query
    }
  })

  const movies = data.results

  createMovies(movies, containerMovies)
}
export async function getTrendingMovies (page) {
  const trendingMovies = 'trending/movie/day'

  const { data } = await api(trendingMovies, {
    params: {
      page: 1
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
        page: page1
      }
    })
    page1++
    const movies = data.results

    generalContainer.appendChild(container)
    createMovies(movies, container)

    console.log(page1)
    generalContainer.insertAdjacentElement('beforeend', buttonShowMore)
  })
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
