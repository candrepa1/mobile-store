import { useNavigate } from "react-router-dom";

const Intro = () => {
    const navigate = useNavigate();

    return <>
        <div id="hero">
            <div className="first-div">
                <h4>Trade-in-fair</h4>
                <h2>Super value deals</h2>
                <h1>On all Products</h1>
                <p>Save more with coupons and up to 70% off!</p>
                <button onClick={() => navigate(`/products`)}>Shop Now</button>
            </div>
            <div id="feature" class="section-p1">
                <div className="fe-box">
                    <img src="https://i.postimg.cc/PrN2Y6Cv/f1.png" alt="" />
                    <h6>Free Shipping</h6>
                </div>

                <div className="fe-box">
                    <img src="https://i.postimg.cc/qvycxW4q/f2.png" alt="" />
                    <h6>Online Order</h6>
                </div>

                <div className="fe-box">
                    <img src="https://i.postimg.cc/1Rdphyz4/f3.png" alt="" />
                    <h6>Save Money</h6>
                </div>

                <div className="fe-box">
                    <img src="https://i.postimg.cc/GpYc2JFZ/f4.png" alt="" />
                    <h6>Promotions</h6>
                </div>

                <div className="fe-box">
                    <img src="https://i.postimg.cc/4yFCwmv6/f5.png" alt="" />
                    <h6>Happy Sell</h6>
                </div>

                <div className="fe-box">
                    <img src="https://i.postimg.cc/gJN1knTC/f6.png" alt="" />
                    <h6>F24/7 Support</h6>
                </div>
            </div>
        </div>

    </>
}

export default Intro;