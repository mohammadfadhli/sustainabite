function PostCard(props) {
    return (
        <>
            <div class="card col-4 ms-3" id={props.id}>
                <img src={props.itemphoto} class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">{props.itemname}</h5>
                    <p class="card-text">{props.desc}</p>
                    <p class="card-text">{props.expirydate}</p>
                    <span class="badge text-bg-primary">{props.category}</span>
                </div>
            </div>
        </>
    );
}

export default PostCard;
