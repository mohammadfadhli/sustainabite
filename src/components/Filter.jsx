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
            <button class={activeCategory === "default" ? "btn active filterbtn" : "btn filterbtn"} onClick={() => setActiveCategory("default")}>All</button>
            <button class={activeCategory === "Bakery" ? "btn active filterbtn" : "btn filterbtn"} onClick={() => setActiveCategory("Bakery")}>Bakery</button>
            <button class={activeCategory === "Dairy, Chilled & Eggs" ? "btn active filterbtn" : "btn filterbtn"} onClick={() => setActiveCategory("Dairy, Chilled & Eggs")}>Dairy, Chilled & Eggs</button>
            <button class={activeCategory === "Frozen" ? "btn active filterbtn" : "btn filterbtn"} onClick={() => setActiveCategory("Frozen")}>Frozen</button>
            <button class={activeCategory === "Fruits & Vegetables" ? "btn active filterbtn" : "btn filterbtn"} onClick={() => setActiveCategory("Fruits & Vegetables")}>Fruits & Vegetables</button>
            <button class={activeCategory === "Meat & Seafood" ? "btn active filterbtn" : "btn"} onClick={() => setActiveCategory("Meat & Seafood")}>Meat & Seafood</button>
            <button class={activeCategory === "Rice, Noodles & Cooking Ingredients" ? "btn active filterbtn" : "btn filterbtn"} onClick={() => setActiveCategory("Rice, Noodles & Cooking Ingredients")}>Rice, Noodles & Cooking Ingredients</button>
            <button class={activeCategory === "Snacks & Confectionery" ? "btn active filterbtn" : "btn filterbtn"} onClick={() => setActiveCategory("Snacks & Confectionery")}>Snacks & Confectionery</button>
        </div>
    )
}

export default Filter;