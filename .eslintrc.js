module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  globals: {
    axios: 'readonly',
    API_KEY: 'readonly',
    headerSection: 'readonly',
    trendingPreviewSection: 'readonly',
    categoriesPreviewSection: 'readonly',
    genericSection: 'readonly',
    movieDetailSection: 'readonly',
    searchForm: 'readonly',
    trendingMoviesPreviewList: 'readonly',
    categoriesPreviewList: 'readonly',
    movieDetailCategoriesList: 'readonly',
    relatedMoviesContainer: 'readonly',
    headerTitle: 'readonly',
    arrowBtn: 'readonly',
    headerCategoryTitle: 'readonly',
    searchFormInput: 'readonly',
    searchFormBtn: 'readonly',
    trendingBtn: 'readonly',
    movieDetailTitle: 'readonly',
    movieDetailDescription: 'readonly',
    movieDetailScore: 'readonly',
    inputSearch: 'readonly',
    movieSimilarContainer: 'readonly',
    containerLoad: 'readonly',
    movieContainer: 'readonly',
    movieContainerTrending: 'readonly',
    footer: 'readonly',
    body: 'readonly',
    html: 'readonly',
    buttonShowMore: 'readonly',
    containerMovies: 'readonly',
    favorites: 'readonly',
    favoritesMovieList: 'readonly'
  },
  rules: {
    'no-unused-vars': 'off'
  }
}
