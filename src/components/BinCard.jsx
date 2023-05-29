import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth";

function BinCard(props) {
  function GetBadge(props) {
    if (props.region == "North") {
      return <span class="badge text-bg-primary">{props.region}</span>;
    } else if (props.region == "South") {
      return <span class="badge text-bg-secondary">{props.region}</span>;
    } else if (props.region == "East") {
      return <span class="badge text-bg-success">{props.region}</span>;
    } else if (props.region == "West") {
      return <span class="badge text-bg-danger">{props.region}</span>;
    }
  }

  function GetProgressBar(props) {
    if (props.capacity_filled <= 25) {
      return (
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${props.capacity_filled}%` }}
          aria-valuenow={props.capacity_filled}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {props.capacity_filled}%
        </div>
      );
    } else if (props.capacity_filled <= 50) {
      return (
        <div
          className="progress-bar bg-info"
          role="progressbar"
          style={{ width: `${props.capacity_filled}%` }}
          aria-valuenow={props.capacity_filled}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {props.capacity_filled}%
        </div>
      );
    } else if (props.capacity_filled <= 75) {
      return (
        <div
          className="progress-bar bg-warning"
          role="progressbar"
          style={{ width: `${props.capacity_filled}%` }}
          aria-valuenow={props.capacity_filled}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {props.capacity_filled}%
        </div>
      );
    } else if (props.capacity_filled <= 100) {
      return (
        <div
          className="progress-bar bg-danger"
          role="progressbar"
          style={{ width: `${props.capacity_filled}%` }}
          aria-valuenow={props.capacity_filled}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {props.capacity_filled}%
        </div>
      );
    }
  }

  return (
    <>
    <div class="col-lg-4 col-md-6 col-sm-12">
      <div
        class="card h-100"
        id={props.address}
        style={{ padding: 0 }}
      >
        <div class="card-body">
          <h5 class="card-title">{props.address}</h5>
          <GetBadge region={props.region}></GetBadge>

          <p class="card-text mb-2"></p>
          <p class="card-text mb-2">Capacity filled:</p>
          <div class="progress">
            <GetProgressBar
              capacity_filled={props.capacity_filled}
            ></GetProgressBar>
          </div>
          <p class="card-text mb-2">
            <strong>Opening hours: </strong>
            {props.opening_hours}
          </p>
        </div>
      </div>
      </div>
    </>
  );
}

export default BinCard;
