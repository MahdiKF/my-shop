

function ProductItem({image,title,price}) {
  return (
            <div className="shadow-md">
                <img src={image} alt="" />
                <div className="p-2">
                    <h3>{title}</h3>
                    <p>price
                        <span>
                            {price}$
                        </span>
                    </p>
                </div>
                
            </div>
  )
}

export default ProductItem
