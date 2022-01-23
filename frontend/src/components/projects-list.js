import React, { useState, useEffect } from "react";
import ProjectDataService from "../services/project";

const ProjectsList = props => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        retrieveProjects();
    }, []);

    const retrieveProjects = () => {
        ProjectDataService.getAll().then(response => {
            console.log(response.data);
            setProjects(response.data.projects);
        }).catch(e => {
            console.log(e);
        })
    };

    return (
        <div>
            <div class="jumbotron pb-3 pt-5">
                <h1 class="display-2 fw-normal mb-3">Repository</h1>
                <blockquote class="blockquote">
                    <p class="">Everybody should learn to program a computer, because it teaches you how to think.</p>
                    <footer class="blockquote-footer"><cite title="Source Title">Steve Jobs</cite></footer>
                </blockquote>
            </div>
            <div class="container my-md-3 ps-md-3 pb-3">
                <div class="row">
                    {projects.map((project) => {
                        return (
                            <div class="col-md-5 bg-dark me-md-3 pt-3 px-3 px-md-5 mb-3 text-center text-white overflow-hidden">
                                <div class="my-5 py-3">
                                    <h2 class="display-5 pb-3">{project.title}</h2>
                                    <p class="lead">{project.description}</p>
                                    {project.language.map(lang =>
                                            <img height="50" src={lang} />
                                        )}
                                        <br></br>
                                    <a class="btn btn-outline-light mt-4" href={`${project.link}`}>Repository</a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default ProjectsList;
