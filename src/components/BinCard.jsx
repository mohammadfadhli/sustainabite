import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth";

function BinCard(props) {
  return (
    <>
      <div
        class="card col-xl-3 col-lg-4 col-md-6 col-12 ms-3"
        id={props.address}
        style={{ padding: 0 }}
      >
        <div class="card-body">
          <h5 class="card-title">{props.address}</h5>
          <p class="card-text">{props.capacity_filled}</p>
          <p class="card-text mb-2">{props.opening_hours}</p>
        </div>
      </div>
    </>
  );
}

export default BinCard;
