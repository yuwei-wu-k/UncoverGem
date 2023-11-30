import React from "react";
import { QuizEntityComponent } from "../lib/UncoverGemCommand";
import Layout from "./Layout";

export default function QuizCreate() {
    return (
        <Layout>

            <div className="login-page-wrapper w-full py-10">
                <div className="container-x mx-auto">
                    <QuizEntityComponent />
                </div>
            </div>

        </Layout>
    );
}