import React from 'react';
import Like from './common/like';
import Table from './common/table';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';
import { Link } from 'react-router-dom';

const MoviesTable = props => {

  const columns = [
    {path: "title", label: "Title", content : movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
    {path: "genre.name", label: "Genre"},
    {path: "numberInStock", label: "Stock"},
    {path: "dailyRentalRate", label: "Rate"},
    {key: "Like", content : movie => <Like liked={movie.liked} onClick={() => onLike(movie)} />},
    {key: "Delete", content : movie => <button onClick={() => onDelete(movie)} className="btn btn-danger btn-sm"> Delete </button>},
  ]; 

  const { movie, onDelete, onLike, onSort, sortColumn } = props;


  return (
    <>
      <Table
        columns={columns}
        data={movie}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </>
  )
}

export default MoviesTable