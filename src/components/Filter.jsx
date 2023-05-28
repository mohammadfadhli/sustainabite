import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth";
import { collection, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import db from "../firebase";

function Filter({setActiveCategory, activeCategory, setFiltered, posts}) {
    return (
        <div className="filter-container">
            <button onClick={() => setActiveCategory(0)}>All</button>
            <button>Bakery</button>
            <button>Fruits & Vegetables</button>
            <button>Frozen</button>
        </div>
    )
}

export default Filter;