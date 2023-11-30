import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AccountMenuComponent } from "../../lib/Bandung";

export default function Navbar({ className }) {
  return (
    <div
      className={`nav-widget-wrapper w-full bg-qyellow h-[60px] relative z-30  ${
        className || ""
      }`}
    >
      <div className="container-x mx-auto h-full">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center">
            <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">
              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-10 space-x-5">
                  <li>
                    <Link to="/">
                      <span className="flex items-center text-sm text-qblacktext font-600 cursor-pointer ">
                        Home
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <span className="flex items-center text-sm text-qblacktext font-600 cursor-pointer ">
                        About
                      </span>
                    </Link>
                  </li>
                  {/* <li className="relative">
                    <span className="flex items-center text-sm text-qblacktext font-600 cursor-pointer ">
                      <Link to="/event">
                        <span className="flex items-center text-sm text-qblacktext font-600 cursor-pointer ">
                          Events
                        </span>
                      </Link>
                      <span className="ml-1.5 ">&#9660;</span>
                    </span>
                    <div className="sub-menu w-[220px] absolute left-0 top-[60px]">
                      <div
                        className="w-full bg-white flex justify-between items-center "
                        style={{
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper w-full h-full p-5">
                          <div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <Link to="/event">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      Upcoming events
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/event?previous=true">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      Previous events
                                    </span>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li> */}
                  {/* <li className="relative">
                    <span className="flex items-center text-sm text-qblacktext font-600 cursor-pointer ">
                      <span>Conversations</span>
                      <span className="ml-1.5 ">&#9660;</span>
                    </span>
                    <div className="sub-menu w-[220px] absolute left-0 top-[60px]">
                      <div
                        className="w-full bg-white flex justify-between items-center "
                        style={{
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper w-full h-full p-5">
                          <div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <Link to="/conversation">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      List
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/start">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      Start
                                    </span>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li> */}
                  {/* <li>
                    <span className="flex items-center text-sm text-qblacktext font-600 cursor-pointer ">
                      Topics
                      <span className="ml-1.5 ">&#9660;</span>
                    </span>
                    <div className="sub-menu w-full absolute left-0 top-[60px]">
                      <div
                        className="mega-menu-wrapper w-full bg-white p-[30px] flex justify-between items-center "
                        style={{
                          minHeight: "295px",
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper flex-1 h-full flex justify-around -ml-[70px]">
                          <div>
                            <div className="category">
                              <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">
                                ABC
                              </h1>
                            </div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <a href="/all-products">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      123
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      456
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      789
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <div className="category">
                              <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">
                                DEF
                              </h1>
                            </div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <a href="/all-products">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      123
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      456
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      789
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <div className="category">
                              <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">
                                GHI
                              </h1>
                            </div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <a href="/all-products">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      123
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      456
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                      789
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="thumbnil w-[348px] h-full">
                          <div className="w-full h-[235px]">
                            <img
                              width=""
                              src={`${process.env.PUBLIC_URL}/assets/images/mega-menu-thumb.jpg`}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li> */}
                  <li>
                    <Link to="/contact">
                      <span className="flex items-center text-sm text-qblacktext font-600 cursor-pointer ">
                        <span>Contact</span>
                      </span>
                    </Link>
                  </li>

                  {/* <li>
                    <Link to="/quiz">
                      <span className="flex items-center text-sm text-qblacktext font-600 cursor-pointer ">
                        <span>Take a Quiz</span>
                      </span>
                    </Link>
                  </li> */}

                  <li>
                    <Link
                      to="/quiz-create"
                      onClick={(e) => {
                        const sessionObject = JSON.parse(
                          localStorage.getItem("bandung")
                        );
                        if (!sessionObject) {
                          e.preventDefault();
                          toast.error(
                            "You must be logged in to create a quiz!"
                          );
                          // console.log(
                          //   "You must be logged in to create a quiz!"
                          // );
                        }
                      }}
                    >
                      <span className="flex items-center text-sm text-qblacktext font-600 cursor-pointer ">
                        <span>Create New Quiz</span>
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/quiz-taker-quiz-list"
                      onClick={(e) => {
                        const sessionObject = JSON.parse(
                          localStorage.getItem("bandung")
                        );
                        if (!sessionObject) {
                          e.preventDefault();
                          toast.error(
                            "You must be logged in to take a quiz!"
                          );
                          // console.log(
                          //   "You must be logged in to create a quiz!"
                          // );
                        }
                      }}
                    >
                      <span className="flex items-center text-sm text-qblacktext font-600 cursor-pointer ">
                        <span>Take a Quiz</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <AccountMenuComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
