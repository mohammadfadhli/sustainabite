import { useEffect } from "react";

function Filter({setActiveCategory, activeCategory, setFiltered, posts}) {

    useEffect(() => {
        if(activeCategory == "default")
        {
            setFiltered(posts)
            return
        }

        const filtered = posts.filter((post) => post.data().category.includes(activeCategory))
        setFiltered(filtered)
    }, [activeCategory])

    return (
        <div className="filter-container">
            <button onClick={() => setActiveCategory("default")}>All</button>
            <button onClick={() => setActiveCategory("Bakery")}>Bakery</button>
            <button onClick={() => setActiveCategory("Dairy, Chilled & Eggs")}>Dairy, Chilled & Eggs</button>
            <button onClick={() => setActiveCategory("Frozen")}>Frozen</button>
            <button onClick={() => setActiveCategory("Fruits & Vegetables")}>Fruits & Vegetables</button>
            <button onClick={() => setActiveCategory("Meat & Seafood")}>Meat & Seafood</button>
            <button onClick={() => setActiveCategory("Rice, Noodles & Cooking Ingredients")}>Rice, Noodles & Cooking Ingredients</button>
            <button onClick={() => setActiveCategory("Snacks & Confectionery")}>Snacks & Confectionery</button>
        </div>
    )
}

export default Filter;