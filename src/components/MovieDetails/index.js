import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../NavBar'
import CastCard from '../CastCard'
import './index.css'
import backDropContainer from './styledComponents'

class MovieDetails extends Component {
  state = {
    movieDetails: {},
    isLoading: true,
    castList: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const API_KEY = 'c30f3145f60cfa18cd42afbf59d27eaf'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    console.log(apiUrl)
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)

    const castResponse = []
    const newData = {
      title: data.title,
      backDropPath: data.backdrop_path,
      overView: data.overview,
      posterPath: data.poster_path,
    }
    this.setState({
      isLoading: false,
      movieDetails: newData,
      castDetails: castResponse,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderMovieDetails = () => {
    const {movieDetails} = this.state
    console.log(movieDetails)
    const {castList} = this.state
    const {title, backDropPath, overView, runtime, posterPath} = movieDetails
    return (
      <div>
        <div className="details-container">
          <img
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            alt=""
            className="image"
          />
          <div className="movie-name-container">
            <h2>{title} </h2>
            <p>{overView}</p>
            <p>{runtime}</p>
          </div>
        </div>
        <h1>Cast</h1>
        {castList.map(eachItem => (
          <CastCard />
        ))}
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <Navbar />
        <div className="route-page-body">
          {isLoading ? this.renderLoadingView() : this.renderMovieDetails()}
        </div>
      </>
    )
  }
}

export default MovieDetails
