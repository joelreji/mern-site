import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

import Homepage from "./components/homepage";
import About from "./components/about";
import Investment from "./components/investment";
import InvestmentList from "./components/investments-list";
import ProjectList from "./components/projects-list";
import LiteratureList from "./components/literatures-list";
import Literature from "./components/literature";

function App() {
  return (
    <div>
      <ul class="nav justify-content-center bg-dark fixed-top">
        <li class="nav-item">
          <Link to={"/about"} className="nav-link text-white">About</Link>
        </li>
        <li class="nav-item">
          <Link to={"/portfolio"} className="nav-link text-white">Code</Link>
        </li>
        <li class="nav-item">
          <Link to={"/"} class="nav-link d-flex align-items-center">
            <img src="logo.png" class="iconos" width="35"></img>
          </Link>
        </li>
        <li class="nav-item">
          <Link to={"/investments"} className="nav-link text-white">Invest</Link>
        </li>
        <li class="nav-item">
          <Link to={"/learn"} className="nav-link text-white">Learn</Link>
        </li>
      </ul>

      <div className="container mt-3">
        <Switch>
          <Route exact path={"/"} component={Homepage} />
          <Route path={"/investments"} component={InvestmentList} />
          <Route path="/investment/:id" render={(props) => (
            <Investment {...props} />
          )} />
          <Route path={"/portfolio"} component={ProjectList} />
          <Route path={"/learn"} component={LiteratureList} />
          <Route
            path="/literature/:id"
            render={(props) => (
              <Literature {...props} />
            )}
          />
          <Route path="/about" component={About} />
        </Switch>
      </div>

      <footer class="page-footer bg-dark text-white font-small blue pt-4">
        <div class="container-fluid text-center">
          <div class="row pb-3">
            <h5 class="text-uppercase text-center">JOEL REJI</h5>
          </div>
              <a class="social"href="https://github.com/joelreji"><img class="mr-2" src="./GitHub-Mark-Light-32px.png"></img></a>
              <a class="social" href="https://twitter.com/Joel_Reji"><img src="./Twitter social icons - circle - blue.png" width="35" height="35"></img></a>
              <a class="social"href="mailto: joelrejiblog@gmail.com"><img src="./gmail.png" width="35" height="35"></img></a><br />
          <div class="footer-copyright text-center py-3">© 2022 Copyright</div>
        </div>
      </footer>
    </div>

  );
}

export default App;
