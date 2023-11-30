import {useState} from "react";
import {Link} from "react-router-dom";
import {JoinComponent} from "./Bandung" ;
import Layout from "./Layout";

export default function Signup() {
    return (
        <Layout>
            <div className="login-page-wrapper w-full py-10">
                <div className="container-x mx-auto">
                    <JoinComponent/>
                </div>
            </div>
        </Layout>
    );
}
