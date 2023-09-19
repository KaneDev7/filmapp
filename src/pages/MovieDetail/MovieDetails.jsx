import { useParams } from 'react-router-dom'
import { useGetMovieByIdQuery, useGetMovieVideosQuery } from '../../services/TMDB'
import ChargementCard from "../../components/movie/ChargementCard";
import MovieInfos from "./container/MovieInfos";
import ReactPlayer from 'react-player'
import SimilarMovies from './container/SimilarMovies';
import RecommendMovies from './container/RecommendMovies';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelecteGenre } from '../../reducers/movieGenre_slice';
import Credits from './container/Credits';
import PersonInfos from '../../components/movie/PersonInfos';
import { setShowPersonInfos } from '../../reducers/ShowPersonInfos_slice';
import Comment from './container/Comment';


export default function MovieDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const {token} = useSelector(state => state.auth)
    const  {isActif: isPersonInfosActif} = useSelector(state => state.isPersonInfosActif)
    const { data: movieDetailData, isFetching, error } = useGetMovieByIdQuery(id)
    const { data: movieVideos } = useGetMovieVideosQuery(movieDetailData?.id)

    useEffect(()=>{
        dispatch(setSelecteGenre('all'))
    })

    useEffect(()=>{
        dispatch(setShowPersonInfos({isActif: false}))
    },[])

    if (isFetching) return <ChargementCard />
    return (
        <section>
           {isPersonInfosActif &&  <PersonInfos/>}

            <div className='relative' >
                <img className='w-screen h-[80vh] object-cover' src={`https://image.tmdb.org/t/p/original${movieDetailData?.backdrop_path}`} alt="movie-img" />
                <div className='w-full h-full absolute inset-0 bg-black/25 gradient pl-20 flex items-center'>
                    <div className=''>
                        <h1 className='text-8xl text-primary font-bold '> {movieDetailData?.title} </h1>
                        <p className='mt-5 text-white/50 text-xl leading-8 w-[50%] '>  {movieDetailData.overview} </p>
                    </div>
                </div>
            </div>

            <MovieInfos movieDetailData={movieDetailData} />
            <Credits movieId={movieDetailData?.id} />

            <div className="w-full flex justify-center items-center" >

                <div className='w-[80%] flex justify-center flex-col items-center gap-5 mt-10 '>
                    {movieVideos?.results.length > 0  &&
                     <h1 className='text-primary text-3xl my-5 self-start font-bold'> Videos </h1>
                    }
                   
                    {movieVideos?.results.slice(0,3).map(video => (
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${video.key}`}
                        key={video.key}
                            controls
                            className='react-player'
                        />
                    ))
                    }
            <RecommendMovies movieId={movieDetailData?.id} />
            <SimilarMovies movieId={movieDetailData?.id} />
            <Comment  movieId={movieDetailData?.id}/>

            </div>

            </div>

        </section>

    )
}
