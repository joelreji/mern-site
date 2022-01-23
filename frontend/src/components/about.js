import React from "react";

function Homepage() {
    return (
        <div class="container">
            <div class="jumbotron pb-4 pt-5">
                <h1 class="display-2 fw-normal mb-3">Hi, I'm Joel!<br />
                    <a class="social" href="https://github.com/joelreji"><img class="mr-2" src="./GitHub-Mark-32px.png"></img></a>
                    <a class="social" href="https://twitter.com/Joel_Reji"><img src="./Twitter social icons - circle - blue.png" width="35" height="35"></img></a>
                    <a class="social" href="mailto: joelrejiblog@gmail.com"><img src="./gmail.png" width="35" height="35"></img></a><br />
                </h1>
                <p>Thanks for visiting my site, I put a lot of time into curating this resource.
                Last year, I built a blog using Django and was able to write weekly blog posts to my
                56 subscribers. I learned many new things by working on my 2021 project and I hope to learn more in this year's project.
                </p>
                <p>
                    This year, I wanted to modernize my stack so I built this site using the <mark>MERN</mark> stack:
                </p>
                <ul>
                    <li><strong>M</strong>ongo - Database</li>
                    <li><strong>E</strong>xpress - Backend</li>
                    <li><strong>R</strong>eact - Frontend</li>
                    <li><strong>N</strong>ode - Javascipt</li>
                </ul>
                <p><strong>A litte bit about myself</strong></p>
                <p>I am a United States immigrant born in Dubai. My family is original from Kerala, India.
                    Kerala is a southern state of India, known as <em>God's Own Country. </em>
                    I am a Software Engineer by trade and I am also in graduate school for my Masters in Data Science.
                </p>
                <p><strong>In my free time, I like to</strong></p>
                <ul>
                    <li>Listen and learn about music</li>
                    <li>Learn about emerging trends and technologies</li>
                    <li>Spend time with family & friends</li>
                </ul>
                <p>I hope you find some value in this site. My goal has always been to provide value. If you love or hate something, send me an email!</p>
                <a class="btn btn-dark text-white mt-3 mb-3" href="mailto: joelrejiblog@gmail.com">Send me an email</a><br />
            </div>
        </div>
    )
}

export default Homepage;
