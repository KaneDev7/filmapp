import React from 'react'
import ReactStars from "react-rating-stars-component";
import { BiSolidTimeFive } from 'react-icons/bi'

export default function MovieInfos({movieDetailData}) {
    const note = movieDetailData?.vote_average / 2

  return (
    <div className=' flex justify-center items-center mt-10'>
                <div className='w-[80%]  bg-black/95 flex mb-10 shadow-sm rounded-sm'>
                    <img className='w-[400px] shadow-sm rounded-sm' src={`https://image.tmdb.org/t/p/w500${movieDetailData?.poster_path}`} alt="movie-img" />

                    <div className='p-10 '>

                        <header className=' pb-4 border-b border-borderColor'>
                            <p className='text-primaryText '> {movieDetailData?.release_date} </p>
                            <h1 className='text-primary text-start font-bold text-3xl'> {movieDetailData?.title} </h1>
                        </header>

                        <div className='mt-5'>
                            <div className='w-full flex justify-between items-start text-white/70'>
                                <p className='text-md  max-w-[300px] '>
                                    {movieDetailData?.genres?.map((genre, i) => (
                                        <span key={genre + i}>   {`${genre.name}`} {movieDetailData?.genres.length - 1 !== i && ','}  </span>
                                    ))}
                                </p>

                                <p className='flex gap-2 items-center whitespace-nowrap'>
                                    {movieDetailData?.runtime} min <BiSolidTimeFive color="#BE091E" size={20} /> </p>
                            </div>
                            <div>

                            </div>
                            {note &&
                                <div className='pointer-events-none flex gap-2 items-center'>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        activeColor="#BE091E"
                                        isHalf={true}
                                        value={note}
                                    />
                                    <p className="text-white/60 "> (<span className="text-white/75">{note.toFixed(1)}</span> / 5) </p>
                                </div>
                            }
                            <p className="text-white/80 mt-1">Popularity: <span className="ml-1 text-primaryText"> {movieDetailData?.popularity} </span></p>
                            <p className="text-white/80 mt-1">Original language: <span className="ml-1 text-primaryText"> {movieDetailData?.original_language} </span></p>
                            {movieDetailData?.tagline !== '' &&
                                <p className="text-white/80 mt-1">Tagline: <span className="ml-1 text-primaryText"> {movieDetailData?.tagline} </span></p>
                            }

                            <div>

                                <p className="text-white/80 mt-1">Production companies:
                                    {
                                        movieDetailData?.production_companies.map((prod, i) => (
                                            <span key={prod + i} className="ml-1 text-primaryText"> {prod?.name}{i !== movieDetailData?.production_companies.length - 1 && ','}</span>
                                        ))
                                    }
                                </p>
                            </div>

                            <p className="pt-5 mt-5  border-t border-borderColor text-md text-white/60 leading-6 ">  {movieDetailData?.overview} </p>

                        </div>
                    </div>
                </div>
            </div>
  )
}
