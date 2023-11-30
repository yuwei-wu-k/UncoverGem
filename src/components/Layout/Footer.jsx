import Facebook from "../Helpers/icons/Facebook";
import Youtube from "../Helpers/icons/Youtube";

export default function Footer() {
  return (
    <footer className="footer-section-wrapper bg-white print:hidden">
      <div className="container-x block mx-auto pt-[56px]">
        <div className="w-full flex flex-col items-center mb-[50px]">
          {/* logo area */}
          <div className="mb-[40px]">
            {/* <a href="/">
                            <img
                                width="152"
                                height="36"
                                src={`${process.env.PUBLIC_URL}/assets/images/Logo.jpg`}
                                alt="IpserLabStartup4"
                            />
                        </a> */}
          </div>
          <div className="w-full h-[1px] bg-[#E9E9E9]"></div>
        </div>
        <div className="lg:flex justify-between mb-[50px]">
          <div className="lg:w-[424px]  ml-0 w-full mb-10 lg:mb-0">
            <a href="/about">
              <h1 className="text-[18] font-500 text-[#2F2F2F] mb-5">
                About Us
              </h1>
            </a>
            <p className="text-[#9A9A9A] text-[15px] w-[247px] leading-[28px]">
              IpserLabStartup3 is an{" "}
              <a href="http://www.ipserlab.com">IpserLab</a> startup. S
            </p>
          </div>
          <div className="flex-1 lg:flex">
            <div className="lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0">
              <div>
                <div className="mb-5">
                  <h6 className="text-[18] font-500 text-[#2F2F2F]">Join</h6>
                </div>
                <div>
                  <ul className="flex flex-col space-y-4 ">
                    <li>
                      <a href="/chapter">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Join a chapter
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/forum">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Join the conversation
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/about">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Start a chapter
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0 ">
              <div>
                <div className="mb-5">
                  <h6 className="text-[18] font-500 text-[#2F2F2F]">
                    Resources
                  </h6>
                </div>
                <div>
                  <ul className="flex flex-col space-y-4 ">
                    <li>
                      <a href="/newsletter">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Articles
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/announcement">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Announcements
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/reference">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          References
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 w-full mb-10 lg:mb-0">
              <div className="mb-5">
                <h6 className="text-[18] font-500 text-[#2F2F2F]">
                  Information
                </h6>
              </div>
              <div>
                <ul className="flex flex-col space-y-4 ">
                  <li>
                    <a href="/faq">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        FAQ
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/terms">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Terms and Conditions
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/privacy">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Privacy Policy
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-bar border-t border-qgray-border lg:h-[82px] lg:flex justify-between items-center">
          <div className="flex lg:space-x-5 justify-between items-center mb-3">
            <div className="flex space-x-5 items-center">
              <a href="http://www.facebook.com" target="new">
                <Facebook className="fill-current text-qgray hover:text-qblack" />
              </a>
              <a href="http://www.youtube.com" target="new">
                <Youtube className="fill-current text-qgray hover:text-qblack" />
              </a>
            </div>
            <span className="sm:text-base text-[10px] text-qgray font-300">
              &copy; 2023 IpserLab LLC. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
