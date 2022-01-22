import React, { useState, useEffect } from "react";
import InvestmentDataService from "../services/investment"

const Investment = props => {
  const initialInvestmentState = {
    id: null,
    name: "",
    ticker: "",
    quantity: 0.0,
    type: ""
  };
  const [investment, setInvestment] = useState(initialInvestmentState);

  useEffect(() => {
    getInvestment(props.match.params.id);
  }, [props.match.params.id]);

  const getInvestment = id => {
    InvestmentDataService.get(id).then(response => {
      setInvestment(response.data);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  };


  return (
    <div>
      {investment ? (
        <div>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/investments">Investments</a></li>
              <li class="breadcrumb-item active" aria-current="page">{investment.ticker}</li>
            </ol>
          </nav>
          <h2>{investment.name}</h2>
          <p>
            <strong>Ticker: </strong>{investment.ticker}<br />
            <strong>Type: </strong>{investment.type}<br />
            <strong>Quantity: </strong>{investment.quantity}<br />
            <strong>Rationale: </strong>Cause I want to<br />
          </p>
          <h3>Investment Details</h3>

        </div>
      ) : (
          <div>
            <br />
            <pr>No investment found, stop messing around with the url :)</pr>
          </div>
        )}
    </div>
  );
};



export default Investment;
