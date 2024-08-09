import Form from "./Form"
import ShowProducts from "./ShowProducts"

const StockList = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6"><ShowProducts/></div>
                    <div className="col-md-1">hi</div>
                    <div className="col-md-5">
                        <Form/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StockList