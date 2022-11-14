import React, {useState, useEffect} from 'react';
import MoviesTable from './moviesTable';
import { getMovies } from './../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from './../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';


const Movies = () => {
  const [movies, setMovies] = useState(getMovies());
  const [genres, setGenres] = useState([{_id: "", name : 'All Genres'}, ...getGenres()]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [selectedGenre, setSelectedGenre] = useState();
  const [sortColumn, setSortColumn] = useState({path: "title", order: "asc"});

  // useEffect(() => {
  //   setMovies(getMovies());
  // }, movies);

  // useEffect(() => {
  //   const genres = [{_id: "", name : 'All Genres'}, ...getGenres()]
  //   setGenres(genres);
  // }, genres);



 const handleDelete = movie => {
    const data = movies.filter(m => m._id !== movie._id);
    setMovies( data );
  };


 const handleLike = movie => {
    const data = [...movies];
    const index = data.indexOf(movie);
    data[index] = { ...data[index] };
    data[index].liked = !data[index].liked;
    setMovies( data );
  };

 const handlePageChange = page => {
  setCurrentPage(page);
  };
 
  const handleGenreSelect = genre => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = sortColumns => {
    setSortColumn(sortColumns);  
  };

  const getPagedData = () => {
    const filtered = selectedGenre && selectedGenre._id ? movies.filter(m=> m.genre._id === selectedGenre._id) : movies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const movie = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movie };
  }

  const { length: count } = movies;

  if (count === 0) return <p>There are no movies in the database.</p>;

  const { totalCount, data: movie } = getPagedData();



  return (
    <>
      <div className="row">
        <div className="col-3">
         <ListGroup 
         items={genres} 
         selectedItem={selectedGenre}
         onItemSelect={handleGenreSelect}  
         />
        </div>  

        <div className="col">

        <p>Showing {totalCount} movies in the database.</p>

        <MoviesTable 
        movie={movie} 
        onLike={handleLike} 
        onDelete={handleDelete} 
        sortColumn={sortColumn}
        onSort={handleSort}
        />
    
        <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
        />

        </div>
        </div>
    </>
  )
}

export default Movies