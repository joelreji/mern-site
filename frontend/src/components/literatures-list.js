import React, { useState, useEffect } from "react";
import LiteratureDataService from "../services/literature";
import {Link} from "react-router-dom"

const Literatureslist = props => {
    const [literatures, setLiteratures] = useState([]);
    const [searchRating, setSearchRating] = useState("");
    const [searchGenre, setSearchGenre] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);
    const [genres, setGenres] = useState(["All Genres"]);

    useEffect(() => {
        retrieveLiteratures();
        retrieveRatings();
        retrieveGenres();
    }, []);

    const onChangeSearchRating = e => {
        const searchRating = e.target.value;
        setSearchRating(searchRating);
    };

    const onChangeSearchGenre = e => {
        const searchGenre = e.target.value;
        setSearchGenre(searchGenre);
    };

    const retrieveLiteratures = () => {
        LiteratureDataService.getAll().then(response => {
            console.log(response.data);
            setLiteratures(response.data.literatures);
        }).catch(e => {
            console.log(e);
        })
    };

    const retrieveRatings = () => {
        LiteratureDataService.getRatings().then(response => {
            console.log(response.data);
            setRatings(["All Ratings"].concat(response.data));
        }).catch(e => {
            console.log(e);
        });
    };

    const retrieveGenres = () => {
        LiteratureDataService.getGenres().then(response => {
            console.log(response.data);
            setGenres(["All Genres"].concat(response.data));
        }).catch(e => {
            console.log(e);
        })
    }

    const find = (query, by) => {
        LiteratureDataService.find(query, by).then(response => {
            console.log(response.data);
            setLiteratures(response.data.literatures);
        }).catch(e => {
            console.log(e);
        });
    };

    const refreshList = () => {
        retrieveLiteratures();
    };

    const findByRating = () => {
        if (searchRating == "All Ratings") {
            refreshList();
        } else {
            find(searchRating, "rating");
        }
    };

    const findByGenre = () => {
        if (searchGenre == "All Genres") {
            refreshList();
        } else {
            find(searchGenre, "genre");
        }
    };

    return (
        <div>
            <div class="jumbotron pb-4 pt-5">
                <h1 class="display-2 fw-normal mb-3">Library</h1>
                <blockquote class="blockquote">
                    <p class="">Live as if you were to die tomorrow. Learn as if you were to live forever.</p>
                    <footer class="blockquote-footer"><cite title="Source Title">Mahatma Gandhi</cite></footer>
                </blockquote>
            </div>
            <div className="row pb-1 px-2">
                <div className="input-group col-lg-4">
                    <select onChange={onChangeSearchGenre}>
                        {genres.map(genre => {
                            return (
                                <option value={genre}> {genre.substr(0, 20)} </option>
                            )
                        })}
                    </select>
                    <div className="input-group-append">
                        <button className="btn btn-dark"
                            type="button"
                            onClick={findByGenre}
                        >Search</button>
                    </div>
                </div>
            </div>
            <div class="container my-md-3 ps-md-3 ">
                {literatures.map((literature) => {
                    return (
                        <div class="row">
                            <div class="col bg-light me-md-3 px-3 pt-md-5 px-md-5 mb-3  overflow-hidden">
                                <div class="my-5 py-3">
                                    <h2 class="display-5">{literature.title}</h2>
                                    <p class="mt-2"><em>{literature.author}</em></p>
                                    {literature.description}<br />
                                    <Link to={"/literature/" + literature._id} className="btn btn-outline-dark mt-3">
                                        Read
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div >
        </div >
    );
};
export default Literatureslist;