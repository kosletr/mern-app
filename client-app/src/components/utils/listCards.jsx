import React, { Component } from "react";
import _ from "lodash";

export class ListCards extends Component {
  render() {
    const { data, Component, cardDetails, extraProps } = this.props;
    if (!data || data.length === 0) return null;

    return (
      <ol className="list-group list-group-horizontal align-items-stretch flex-wrap">
        {data.map((entry) => {
          const properties = _.pick(entry, cardDetails);
          return (
            <div
              style={{ overflow: "hidden" }}
              className="list-group-item border-0"
              key={data.indexOf(entry)}
            >
              <Component {...properties} {...extraProps} />
            </div>
          );
        })}
      </ol>
    );
  }
}

export default ListCards;
