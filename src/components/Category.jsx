import Layout from "./Layout";
import {CategoryEntityComponent} from "../lib/UncoverGemCommand" ;

export default function Category () {
    return (
        <Layout>
            <div className="login-page-wrapper w-full py-10">
                <div className="container-x mx-auto">
                    <CategoryEntityComponent/>
                </div>
            </div>
        </Layout>
    );
}
