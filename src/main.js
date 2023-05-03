const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'content-Type': 'application/json;charset=utf-8'
  },
  params: {
    api_key: API_KEY
  }
})
export async function getTrendingMoviesPreview () {
  const trendingMovies = 'trending/movie/day'
  const imagesURL = 'https://image.tmdb.org/t/p/w300'
  const { data } = await api(trendingMovies)

  const movies = data.results

  trendingMoviesPreviewList.innerHTML = ''

  movies.forEach((movie) => {
    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie-container')

    const movieImg = document.createElement('img')
    movieImg.classList.add('movie-img')
    movieImg.setAttribute('alt', movie.title)
    movieImg.setAttribute('src', `${imagesURL}${movie.poster_path}`)

    movieContainer.appendChild(movieImg)
    trendingMoviesPreviewList.appendChild(movieContainer)
  })
}
export async function getCategoriesPreview () {
  const categoriesMovies = 'genre/movie/list'
  const { data } = await api(categoriesMovies)

  const categories = data.genres
  categoriesPreviewList.innerHTML = ''
  categories.forEach((category) => {
    const categoryContainer = document.createElement('div')
    const categoryTitleText = document.createTextNode(category.name)
    const categoryTitle = document.createElement('h3')

    categoryContainer.classList.add('category-container')
    categoryTitle.classList.add('category-title')
    categoryTitle.setAttribute('id', `id${category.id}`)

    categoryTitle.addEventListener('click', () => { location.hash = `#category=${category.id}-${category.name}`; genericSection.innerHTML = ''; window.scrollTo(0, 0) })
    categoryTitle.appendChild(categoryTitleText)
    categoryContainer.appendChild(categoryTitle)
    categoriesPreviewList.appendChild(categoryContainer)
  })
}
export async function getMoviesByCategory (id, category) {
  const trendingMovies = 'discover/movie'
  const imagesURL = 'https://image.tmdb.org/t/p/w300'
  const { data } = await api(trendingMovies, {
    params: {
      with_genres: id
    }
  })

  const movies = data.results
  headerCategoryTitle.innerText = category
  genericSection.innerHTML = ''

  movies.forEach((movie) => {
    const genericList = document.createElement('div')
    genericList.classList.add('movie-container')

    const movieImg = document.createElement('img')
    movieImg.classList.add('movie-img')
    movieImg.setAttribute('alt', movie.title)
    movieImg.setAttribute('src', `${imagesURL}${movie.poster_path}`)
    genericList.appendChild(movieImg)
    genericSection.appendChild(genericList)
  })
}

console.log('hola')
