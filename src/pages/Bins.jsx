import { Fragment, useContext, useEffect, useState } from "react";
import BinCard from "../components/BinCard";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

function Bins() {
  const [bins, setBins] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {

        //assume parties that accept food donations have API that updates bin locations and statuses
        const tempArr = [
          {
            address: "Heartbeat@Bedok",
            geocode: [1.3271898178327022, 103.93208492205508],
            region: "East",
            capacity_filled: 75,
            opening_hours: "10am to 10pm",
          },

          {
            address: "NTU (The Hive at B5, Near Lift Lobby)",
            geocode: [1.3527028918286417, 103.6874579474174],
            region: "West",
            capacity_filled: 25,
            opening_hours: "830am to 5pm",
          },

          {
            address: "Marina Bay Link Mall, (B2 Besides 7-Eleven)",
            geocode: [1.2797555480818923, 103.85430690856326],
            region: "South",
            capacity_filled: 60,
            opening_hours: "10am to 10pm",
          },

          {
            address: "Wisteria Mall, Basement 1 Information Counter",
            geocode: [1.4184225095556175, 103.841148152743],
            region: "North",
            capacity_filled: 43,
            opening_hours: "10am to 10pm",
          },
        ];

        console.log(tempArr);
        setBins(tempArr);
      } catch {}
    }

    fetchData();
  }, []);

  const customIcon = new Icon({
    iconUrl: "https://www.svgrepo.com/show/302636/map-marker.svg",
    iconSize: [40, 40],
  });

  const binCards = bins.map((bin) => (
    <Fragment key={bin.address}>
      <BinCard
        address={bin.address}
        capacity_filled={bin.capacity_filled}
        opening_hours={bin.opening_hours}
        region={bin.region}
      ></BinCard>
    </Fragment>
  ));

  return (
    <>
      <MapContainer
        center={[1.3521, 103.8198]}
        zoom={11}
        style={{ height: "50vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {bins.map((bin) => (
          <Marker position={bin.geocode} icon={customIcon}>
            <Popup>
              <p>
                <strong>Address:</strong> {bin.address}
              </p>
              <p>
                <strong>Capacity filled:</strong> {bin.capacity_filled}%
              </p>
              <p>
                <strong>Opening hours:</strong> {bin.opening_hours}
              </p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="container mt-5 mb-5">
        <h4 className="text-center">
          Want to donate to a food bank instead? Drop off your excess food in
          any of the bins below!
        </h4>
        <div className="row g-3 mt-3">{binCards}</div>
      </div>
    </>
  );
}

export default Bins;
