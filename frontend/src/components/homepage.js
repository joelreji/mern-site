import React from 'react';

function Homepage() {
    return (
        <div>
            <div class="position-relative overflow-hidden pt-5 p-3 p-md-5 m-md-3 text-center ">
                <div class="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 class="display-4 fw-normal">Hi, I'm Joel.</h1>
                    <p class="lead fw-lighter">I love to learn new things</p>
                    <a class="btn btn-outline-secondary btn-outline-secondary" href={"/about"}>About</a>
                </div>
            </div>
            <div class="container my-md-3 ps-md-3">
                <div class="row">
                    <div class="col-md-6 bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5  text-white text-center overflow-hidden">
                        <div class="my-3 p-3">
                            <h2 class="display-5">Code.</h2>
                            <p class="lead">I enjoy solving problems with code. My favorite language is Python.</p>
                            <a class="btn btn-outline-light" href={"/portfolio"}>Repository</a>
                        </div>
                    </div>
                    <div class="col bg-secondary me-md-3 pt-3 px-3 pt-md-5 px-md-5  text-center text-white overflow-hidden">
                        <div class="my-3 py-3">
                            <h2 class="display-5">Invest.</h2>
                            <p class="lead">I enjoy investing in growth and innovation. I believe in financial freedom.</p>
                            <a class="btn btn-outline-light" href={"/investments"}>Portfolio</a>
                        </div>
                    </div>
                </div>
                </div>
            <div class="container my-md-3 ps-md-3 pb-3">
                <div class="row">
                    <div class="col-md-6 bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5  text-center overflow-hidden">
                        <div class="my-3 p-3">
                            <h2 class="display-5">Learn.</h2>
                            <p class="lead">I enjoy learning new ideas. My favorite author is Malcolm Gladwell. </p>
                            <a class="btn btn-outline-dark" href={"/learn"}>Library</a>
                        </div>
                    </div>
                    <div class="col bg-primary me-md-3 pt-3 px-3 pt-md-5 px-md-5  text-center text-white overflow-hidden">
                        <div class="my-3 py-3">
                            <h2 class="display-5">Heimdall.</h2>
                            <p class="lead">Currently under development. Stay tuned for further updates.</p>
                            <a class="btn btn-outline-light" href="https://www.britannica.com/topic/Heimdall">Heimdall</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Homepage;
