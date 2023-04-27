async function getTrendingMoviesPreview () {
  const trendingMovies = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
  const imagesURL = 'https://image.tmdb.org/t/p/w300'
  const res = await fetch(trendingMovies)
  const data = await res.json()

  const movies = data.results
  movies.forEach((movie) => {
    const trendingPreviewMoviesContainer = document.querySelector(
      '#trendingPreview .trendingPreview-movieList'
    )
    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie-container')

    const movieImg = document.createElement('img')
    movieImg.classList.add('movie-img')
    movieImg.setAttribute('alt', movie.title)
    movieImg.setAttribute('src', `${imagesURL}${movie.poster_path}`)

    movieContainer.appendChild(movieImg)
    trendingPreviewMoviesContainer.appendChild(movieContainer)
  })
}
async function getCategoriesPreview () {
  const categoriesMovies = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  const res = await fetch(categoriesMovies)
  const data = await res.json()

  const categories = data.genres
  categories.forEach((category) => {
    const categoriesMovieContainer = document.querySelector(
      '#categoriesPreview .categoriesPreview-list'
    )
    const categoryContainer = document.createElement('div')
    const categoryTitleText = document.createTextNode(category.name)
    const categoryTitle = document.createElement('h3')

    categoryContainer.classList.add('category-container')
    categoryTitle.classList.add('category-title')
    categoryTitle.setAttribute('id', `id${category.id}`)

    categoryTitle.appendChild(categoryTitleText)
    categoryContainer.appendChild(categoryTitle)
    categoriesMovieContainer.appendChild(categoryContainer)
  })
}

getTrendingMoviesPreview()
getCategoriesPreview()
