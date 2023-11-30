import { Link } from "react-router-dom";
import SearchBox from "../Helpers/SearchBox";

export default function Middlebar({ className }) {
  return (
    <div className={`w-full bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              <Link to="/">
                <img
                  width="250"
                  height="125"
                  src={`${process.env.PUBLIC_URL}/assets/images/Logo.jpg`}
                  alt="IpserLabStartup4"
                />
              </Link>
            </div>
            <div className="w-[500px] h-[44px]">
              <SearchBox className="search-com" />
            </div>
            {/* <div className="flex space-x-6 items-center">
                {
                    true &&
                      <div className="cart-wrapper group relative py-4">
                        <div className="cart relative cursor-pointer">
                          <Link to="/cart">
                            <span>
                              <ThinBag />
                            </span>
                          </Link>
                          <span className="w-[18px] h-[18px] rounded-full bg-qyellow absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                            15
                          </span>
                        </div>
                        {/* <div className="fixed left-0 top-0 w-full h-full z-40"></div> */}
                        {/* hidden group-hover:block" */}
                        {/* <Cart className="absolute -right-[45px] top-11 z-50 hidden group-hover:block" />
                      </div>
                }
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
