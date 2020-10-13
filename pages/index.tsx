import React from "react";
import Questionnaries from "@components/Questionnaires";
import { NextPage } from "next";
import Layout from "@components/Layout";

type IndexPageProps = unknown;
const IndexPage: NextPage<IndexPageProps> = () => {
    return (
        <Layout title="Questionnaries">
            <Questionnaries />
        </Layout>
    );
};

export default IndexPage;
