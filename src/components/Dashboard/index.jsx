import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SigninComponent, validSession } from "../../lib/Bandung";
import Breadcrumbs from "../Breadcrumbs";
import Layout from "../Layout";
import AddressesTab from "./tabs/AddressesTab";
import DashboardTab from "./tabs/DashboardTab";
import OrderTab from "./tabs/OrderTab";
import PasswordTab from "./tabs/PasswordTab";
import Payment from "./tabs/Payment";
// import ReviewTab from "./tabs/ReviewTab";
import { Link } from "react-router-dom";
import SupportTab from "./tabs/SupportTab";
import WishlistTab from "./tabs/WishlistTab";


export default function Dashboard() {
  const [switchDashboard, setSwitchDashboard] = useState(false);
  const location = useLocation();
  const getHashContent = location.hash.split("#");
  const [active, setActive] = useState("dashboard");
  useEffect(() => {
    setActive(
      getHashContent && getHashContent.length > 1
        ? getHashContent[1]
        : "dashboard"
    );
  }, [getHashContent]);
  if (!validSession())
    return (
      <Layout>
        <div className="login-page-wrapper w-full py-10">
          <div className="container-x mx-auto">
            <SigninComponent />
          </div>
        </div>
      </Layout>
    );
  return (
    <Layout>
      <div className="page-wrapper w-full">
        <div className="container-x mx-auto">
          <div className="w-full my-10">
            <Breadcrumbs
              paths={[
                { name: "home", path: "/" },
                { name: "dashboard", path: "/dashboard" },
              ]}
            />
            <div className="w-full bg-white px-10 py-9">
              {!validSession() ? (
                <SigninComponent />
              ) : (
                <>
                  <div className="title-area w-full flex justify-between items-center">
                    <h1 className="text-[22px] font-bold text-qblack">
                      Dashboard
                    </h1>
                    <div className="switch-dashboard flex space-x-3 items-center">
                      {/* <p className="text-qgray text-base">Switch Dashboard</p>
                      <button
                        onClick={() => setSwitchDashboard(!switchDashboard)}
                        type="button"
                        className="w-[73px] h-[31px] border border-[#D9D9D9] rounded-full relative "
                      >
                        <div
                          className={`w-[23px] h-[23px] bg-qblack rounded-full absolute top-[3px] transition-all duration-300 ease-in-out ${
                            switchDashboard ? "left-[44px]" : "left-[4px]"
                          }`}
                        ></div>
                      </button> */}
                    </div>
                  </div>
                  <div className="profile-wrapper w-full mt-8 flex space-x-5">
                    <div className="w-[170px] min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)]">
                      <div className="flex flex-col space-y-7">
                        {/* <div className="item group">
                      <Link to="/dashboard">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span className=" font-normal text-base">
                            Dashbaord
                          </span>
                        </div>
                      </Link>
                    </div> */}
                        {/* <div className="item group">
                          <Link to="/dashboard#payment">
                            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                              <span className=" font-normal text-base">
                                Payment Method
                              </span>
                            </div>
                          </Link>
                        </div> */}
                        {/* <div className="item group">
                          <Link to="/dashboard#order">
                            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                              <span className=" font-normal text-base">
                                Order
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="item group">
                          <Link to="/dashboard#wishlist">
                            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                              <span className=" font-normal text-base">
                                Wishlist
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="item group">
                          <Link to="/dashboard#address">
                            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                              <span className=" font-normal text-base">
                                Address
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="item group">
                          <Link to="/dashboard#review">
                            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                              <span className=" font-normal text-base">
                                Reviews
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="item group">
                          <Link to="/dashboard#password">
                            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                              <span className=" font-normal text-base">
                                Change Password
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="item group">
                          <Link to="/dashboard#support">
                            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                              <span className=" font-normal text-base">
                                Support Ticket
                              </span>
                            </div>
                          </Link>
                        </div> */}
                        <div className="item group">
                          <Link to="">
                            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                              <span className=" font-normal text-base">
                                Reviews
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="item group">
                          <Link to="">
                            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                              <span className=" font-normal text-base">
                                Support
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="item-body dashboard-wrapper w-full">
                        {active === "dashboard" ? (
                          <DashboardTab />
                        ) : active === "payment" ? (
                          <>
                            <Payment />
                          </>
                        ) : active === "order" ? (
                          <>
                            <OrderTab />
                          </>
                        ) : active === "wishlist" ? (
                          <>
                            <WishlistTab />
                          </>
                        ) : active === "address" ? (
                          <>
                            <AddressesTab />
                          </>
                        ) : active === "password" ? (
                          <>
                            <PasswordTab />
                          </>
                        ) : active === "support" ? (
                          <>
                            <SupportTab />
                          </>
                        ) : active === "review" ? (
                          <>
                            <ReviewTab products={datas.products} />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
