import React, { Component } from "react";

import { fetchHoldingsData } from "../../api";
import { parseData } from "./utils";

import "./styles.css";

class Holdings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      tableData: {}
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true });
    fetchHoldingsData((res, err) => {
      if (res) {
        this.setState({ tableData: parseData(res), loading: false });
      }
    });
  };

  renderLoader = () => {
    return <progress className="progress is-small is-primary" />;
  };

  renderContent = () => {
    let index = 1;

    return (
      <div className="outer-div">
<h3 className="title is-3 networth-title" style={{ textAlign: "center" }}>Assignment</h3> {/* Centered */}        <div className="container">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Name of the Holder</th>
                  <th>Ticker</th>
                  <th>Avg Price</th>
                  <th>Market Price</th>
                  <th>Latest Change Percentage (%)</th>
                  <th>Market Value (Base CCY)</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.state.tableData).map(key => (
                  <React.Fragment key={key}>
                    <tr className="asset-class">
                      <td onClick={() => this.onToggleAssetClass(key)}>
                        {this.state.tableData[key].expand && (
                          <span className="icon">
                            <i className="fas fa-chevron-down" />
                          </span>
                        )}
                        {!this.state.tableData[key].expand && (
                          <span className="icon">
                            <i className="fas fa-chevron-up" />
                          </span>
                        )}
                      </td>
                      <th>
                        {key} ({this.state.tableData[key].data.length}) {/* Modified */}
                      </th>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td /> {/* Empty column for alignment */}
                    </tr>
                    {this.state.tableData[key].expand &&
                      this.state.tableData[key].data.map(data => (
                        <tr key={`${data.name}-${data.market_value_ccy}`}>
                          <td>{`${index++}.`}</td>
                          <td>{data.name}</td>
                          <td>{data.ticker}</td>
                          <td>{data.avg_price}</td>
                          <td>{data.market_price}</td>
                          <td>{data.latest_chg_pct}</td>
                          <td>{data.market_value_ccy}</td>
                          <td /> {/* Empty column for alignment */}
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  onToggleAssetClass = assetClass => {
    let data = { ...this.state.tableData };
    let expand = data[assetClass].expand;
    data[assetClass].expand = !expand;
    this.setState({ tableData: data });
  };

  render() {
    return (
      <div>
        {this.state.loading && this.renderLoader()}
        {!this.state.loading && this.renderContent()}
      </div>
    );
  }
}

export default Holdings;
