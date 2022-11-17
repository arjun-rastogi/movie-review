import React, {useState, useEffect} from "react";
import Joi from 'joi-browser';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Input from "./common/input";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import Select from './common/select';

const MovieForm = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });

  const [genres, setGenres] = useState([]);

  const [errors, setErrors] = useState({});

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
  };

  useEffect(() => {
    const genres = getGenres();
    setGenres(genres);
  }, []);


  const mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }


  useEffect(()=>{
    const movieId = params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return navigate("/not-found");

    setAccount(mapToViewModel(movie))
  },[]);



  const validate = () => {
   const options = { abortEarly: false };
   const { error } = Joi.validate(account, schema, options);
   if(!error) return null;

   const errors = {};
   for (let item of error.details) errors[item.path[0]] = item.message;
   return errors;
  };  

  const validateProperty = ({name, value}) => {
    const obj = { [name] : value};
    const schemas = { [name] : schema[name]};
    const {error} = Joi.validate(obj, schemas);
    return error ? error.details[0].message :  null;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();
    console.log(errors);
    setErrors(errors || {});
    if (errors) return;
    console.log("Submitted data");
    saveMovie(account);
    navigate("/movies");
  };  

  const handleChange= ({ currentTarget : input}) => {

    const error = {...errors};
    const errorMessage = validateProperty(input);
    if(errorMessage) error[input.name]= errorMessage;
    else delete error[input.name];

    const accounts = {...account};
    accounts[input.name] = input.value;
    setAccount(accounts);
    setErrors(error);
	};



  const { title, genreId, numberInStock, dailyRentalRate} = account;


  return (
    <>
    <div>
       <h1>Movie Form </h1>
        <form onSubmit={handleSubmit}>
            <Input 
            name="title"
            label="Title"
            value={title}
            error={errors.title}
            onChange={handleChange} 
            />
            <Select 
            name="genreId"
            label="Genre"
            value={genreId}
            options={genres}
            error={errors.genreId}
            onChange={handleChange} 
            />
            <Input 
            name="numberInStock"
            label="Number In Stock"
            value={numberInStock}
            error={errors.numberInStock}
            onChange={handleChange} 
            type="Number"
            />
            <Input 
            name="dailyRentalRate"
            label="Rate"
            value={dailyRentalRate}
            error={errors.dailyRentalRate}
            onChange={handleChange} 
            />
            <div style={{margin: "14px 0px 0px"}}>
            <button
            disabled={validate()} 
            className="btn btn-primary">
              Save
            </button>
            </div>
        </form>
    </div>

    </>
  );
};

export default MovieForm;
