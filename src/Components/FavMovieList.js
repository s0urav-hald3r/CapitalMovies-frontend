import React, { Component } from 'react'
import axios from 'axios';
import Movie from './Movie'
import './MovieList.css'

export default class FavMovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            movies: []
        }
    }

    async componentDidMount() {
        const uid = sessionStorage.getItem('_id');
        console.log(uid);

        if (uid !== null) {
            let fetchmovies = await axios.get(`/user/${sessionStorage.getItem('_id')}/favourite`);
            fetchmovies = fetchmovies.data;
            for (let i = 0; i < fetchmovies.length; i++) {
                let movie = await axios.get(`https://api.themoviedb.org/3/movie/${fetchmovies[i]}?api_key=f7f07ca3fd7b0e7cc28183c3af31f32d&language=en-US`);
                movie = movie.data;
                this.setState({
                    movies: [
                        ...this.state.movies,
                        movie
                    ],
                    isFull: true
                })
            }
        }
        else {
            window.alert('Login to access...');
            this.props.history.push('/user/login');
        }

    }

    render() {
        let movielist = this.state.movies.map((movie) => {
            return <Movie
                key={movie.id}
                id={movie.id}
                title={movie.original_title}
                img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
        })

        // let show = movielist.length ? true : false;

        const h2 = {
            margin: '20px auto 30px auto',
            color: 'gray'
        }

        return (
            <div>
                {this.state.isFull
                    ? <div className='movielist'>
                        {movielist}
                    </div>
                    : <div>
                        <h2 style={h2} className='display-2 text-center'>Don't have any favourite movie! <b>:(</b></h2>
                    </div>
                }
            </div>
        )
    }
}