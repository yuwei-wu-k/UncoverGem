import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {ProfileComponent} from "../Bandung" ;
import Breadcrumbs from "../Breadcrumbs";
import Layout from "../Layout";
import GeneralTab from "./tabs/GeneralTab";
import SettingsTab from "./tabs/SettingsTab";
import PasswordTab from "./tabs/PasswordTab";
import ContactTab from "./tabs/ContactTab";
import BioTab from "./tabs/BioTab";
import EmailTab from "./tabs/EmailTab";
import SocialTab from "./tabs/SocialTab";
import ImageTab from "./tabs/ImageTab";
import QuitTab from "./tabs/QuitTab";

export default function Profile () {
  const [switchProfile, setSwitchProfile] = useState(false);
  const location = useLocation();
  const getHashContent = location.hash.split("#");
  const [active, setActive] = useState("general");
  useEffect(() => {
    setActive(
      getHashContent && getHashContent.length > 1
        ? getHashContent[1]
        : "general"
    );
  }, [getHashContent]);
  return (
    <Layout>
      <div className="page-wrapper w-full">
        <div className="container-x mx-auto">
          <div className="w-full my-10">
            <Breadcrumbs
              paths={[
                { name: "home", path: "/" },
                { name: "profile", path: "/profile" },
              ]}
            />
            <div className="w-full bg-white px-10 py-9">
              <div className="title-area w-full flex justify-between items-center">
                <h1 className="text-[22px] font-bold text-qblack">
                  Profile
                </h1>
              </div>


              <div className="profile-wrapper w-full mt-8 flex space-x-10">
                <div className="w-[236px] min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)]">
                  <div className="flex flex-col space-y-10">
                    <div className="item group">
                      <Link to="/profile#general">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span className=" font-normal text-base">
                            General
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/profile#settings">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span className=" font-normal text-base">
                            Settings
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/profile#password">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span className=" font-normal text-base">
                            Change Password
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/profile#contact">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span className=" font-normal text-base">
                            Contact
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/profile#bio">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span className=" font-normal text-base">
                            Bio
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/profile#email">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span className=" font-normal text-base">
                            Emails
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/profile#social">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span className=" font-normal text-base">
                            Socials
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/profile#image">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span className=" font-normal text-base">
                            Image
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/profile#quit">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span className=" font-normal text-base">
                            Quit
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="item-body profile-wrapper w-full">
                    {active === "general" ? (
                      <GeneralTab />
                    ) : active === "settings" ? (
                      <>
                        <SettingsTab />
                      </>
                    ) : active === "password" ? (
                      <>
                        <PasswordTab />
                      </>
                    ) : active === "contact" ? (
                      <>
                        <ContactTab />
                      </>
                    ) : active === "bio" ? (
                      <>
                        <BioTab />
                      </>
                    ) : active === "email" ? (
                      <>
                        <EmailTab />
                      </>
                    ) : active === "social" ? (
                      <>
                        <SocialTab />
                      </>
                    ) : active === "image" ? (
                      <>
                        <ImageTab />
                      </>
                    ) : active === "quit" ? (
                      <>
                        <QuitTab />
                      </>
                    ) : (
                      <GeneralTab />
                    )}
                  </div>
                </div>
              </div>

                <ProfileComponent id='profile'/>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
