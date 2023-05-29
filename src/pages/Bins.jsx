import { Fragment, useContext, useEffect, useState } from "react";
import BinCard from "../components/BinCard";
import { Link } from "react-router-dom";
// import Filter from "../components/Filter";
import { AuthContext } from "../auth";

function Bins() {
  const [bins, setBins] = useState([]);
  // const [filtered, setFiltered] = useState([]);
  // const [activeCategory, setActiveCategory] = useState("default");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const tempArr = [
          {
            address: "heartbeat@bedok",
            capacity_filled: 75,
            opening_hours: "10am to 10pm",
          },

          {
            address: "NTU (The Hive at B5, Near Lift Lobby)",
            capacity_filled: 25,
            opening_hours: "830am to 5pm",
          },

          {
            address: "Marina Bay Link Mall, (B2 Besides 7-Eleven)",
            capacity_filled: 60,
            opening_hours: "10am to 10pm",
          },

          {
            address: "Wisteria Mall, Basement 1 Information Counter",
            capacity_filled: 43,
            opening_hours: "10am to 10pm",
          },
        ];

        console.log(tempArr)
        setBins(tempArr);
      } catch {}
    }

    fetchData();
  }, []);

  const binCards = bins.map((bin) => (
    <Fragment key={bin.address}>
      <BinCard
        address={bin.address}
        capacity_filled={bin.capacity_filled}
        opening_hours={bin.opening_hours}
      ></BinCard>
    </Fragment>
  ));

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row mt-3">{binCards}</div>
      </div>
    </>
  );
}

export default Bins;
