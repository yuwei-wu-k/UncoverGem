import {useState} from "react";
import {Link} from "react-router-dom";
import {JoinComponent} from "../lib/Bandung" ;
import Layout from "./Layout";

export default function Join () {
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
