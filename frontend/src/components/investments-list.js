import React, { useState, useEffect } from "react";
import InvestmentDataService from "../services/investment";
import Chart from "react-apexcharts";


const InvestmentsList = props => {
    const [investments, setInvestments] = useState([]);
    const [searchType, setSearchType] = useState("");
    const [types, setTypes] = useState(["All Types"]);
    const [typeAllocation, setTypeAllocation] = useState([100]);

    useEffect(() => {
        retrieveInvestments();
        retrieveTypes();
    }, []);

    const onChangeSearchType = e => {
        const searchType = e.target.value;
        setSearchType(searchType);
    };

    const retrieveInvestments = () => {
        InvestmentDataService.getAll().then(response => {
            setInvestments(response.data.investments);
        }).catch(e => {
            console.log(e);
        })
    };

    const retrieveTypes = () => {
        InvestmentDataService.getTypes().then(response => {
            const typesList = []
            const typeAlloc = []
            typesList.push("All Types")
            typeAlloc.push(100)
            for (let i in response.data.typeList) {
                typesList.push(response.data.typeList[i]["_id"])
                typeAlloc.push(response.data.typeList[i]["total"])
            }
            setTypes(typesList)
            setTypeAllocation(typeAlloc)
        }).catch(e => {
            console.log(e);
        });
    };

    const find = (query, by) => {
        InvestmentDataService.find(query, by).then(response => {
            setInvestments(response.data.investments);
        }).catch(e => {
            console.log(e);
        })
    };

    const refreshList = () => {
        retrieveInvestments();
    };

    const findByType = () => {
        if (searchType == "All Types") {
            refreshList();
        } else {
            find(searchType, "type");
        }
    };
    const options = { labels: types.slice(1) };
    const series = typeAllocation.slice(1); //our data


    return (
        <div>
            <div className="jumbotron pb-4 pt-5">
                <h1 className="display-2 fw-normal mb-3">Portfolio</h1>
                <blockquote className="blockquote">
                    <p className="">Be fearful when others are greedy and greedy when others are fearful.</p>
                    <footer className="blockquote-footer"><cite title="Source Title">Warren Buffet</cite></footer>
                </blockquote>
            </div>
            <div className="donut pb-5 d-flex justify-content-center">
                <Chart options={options} series={series} type="donut" width="380" />
            </div>
            <div className="alert alert-primary mb-5" role="alert">
                <h4 class="alert-heading">👋</h4>
                <p>Above, you can see my overall allocation strategy. Below, you can learn which specific assets make up the asset class.</p>
                <hr></hr>
                <p class="mb-0"><small>This portfolio excludes certain assets like tax-advantaged accounts, retirement accounts, restricted stock units, & experimental investment vehicles.</small></p>
                <p class="mb-0"><small>This is not financial advice.</small></p>
            </div>
            <div className="row pb-1 px-2">
                <div className="input-group">
                    <select onChange={onChangeSearchType}>
                        {types.map(type => {
                            return (
                                <option value={type}> {type.substr(0, 20)} </option>
                            )
                        })}
                    </select>
                    <div className="input-group-append">
                        <button className="btn btn-dark"
                            type="button"
                            onClick={findByType}
                        >Search</button>
                    </div>
                </div>
            </div>
            <div class="mt-1 px-2">
                <table class="table">
                    <thead class="table-secondary">
                        <tr>
                            <th scope="col">Symbol</th>
                            <th scope="col">Description</th>
                            <th scope="col">Asset Class</th>
                            <th scope="col">Allocation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investments.map((investment) => {
                            return (
                                <tr href="http://tutorialsplane.com">
                                    <td>{investment.ticker}</td>
                                    <td>{investment.name}</td>
                                    <td>{investment.type}</td>
                                    <td>{investment.quantity}%</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default InvestmentsList;

