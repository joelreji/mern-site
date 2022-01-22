import React, { useState, useEffect } from "react";
import LiteratureDataService from "../services/literature";

const Literature = props => {
    const initialState = {
        id: null,
        title: "",
        author: "",
        description: "",
        link: "",
        rating: "",
        genre: ""
    };

    const [literature, setLiterature] = useState(initialState);

    const getLiterature = id => {
        LiteratureDataService.get(id).then(response => {
            setLiterature(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {
        getLiterature(props.match.params.id);
    }, [props.match.params.id]);

    return (
        <div>
            {literature ? (
                <div class="pt-5">
                    <h1 >{literature.title}</h1>
                    <p class="mt-2">
                        <em>{literature.author}</em><br/>
                        <small><strong>{literature.genre}</strong></small>
                    </p>
                    <p> {literature.description}</p>
                    <br></br>
                    <div class="container">
                        <iframe class="responsive-iframe" type="text/html" width="100%" height="550" frameborder="0" allowFullScreen src={literature.link} ></iframe>
                    </div>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>No literautre selected. You shouldn't be here.</p>
                    </div>
                )}
        </div>
    )
}

export default Literature;