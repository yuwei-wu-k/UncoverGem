import { SigninComponent } from "../lib/Bandung";
// import { SigninComponent } from "../Bandung";
import Layout from "./Layout";

const errorMessage = "" ;

export default function Signin () {
    return (
        <Layout>
            <div className="login-page-wrapper w-full py-10">
                <div className="container-x mx-auto">
                    <SigninComponent/>
                </div>
            </div>
        </Layout>
    );
}
