import {Link} from "react-router-dom";
import Layout from "./Layout";

export default function FourZeroFour() {
    return (
        <Layout>
            <div className="cart-page-wrapper w-full">
                <div className="container-x mx-auto">
                    <div className="empty-card-wrapper w-full">
                        <div className="flex justify-center items-center w-full">
                            <Link to="/">
                                <div className="sm:mb-10 mb-0 transform sm:scale-100 scale-50">
                                    <img src='/assets/images/Ooops.png'/>
                                </div>
                                <div data-aos="fade-up" className="empty-content w-full">
                                    <h1 className="sm:text-xl text-base font-semibold text-center mb-5">
                                        Sorry! We cant’t Find that page!
                                    </h1>
                                    <div className="flex justify-center w-full ">
                                        <div className="w-[180px] h-[50px] ">
                                            <span type="button" className="yellow-btn">Go Home</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
