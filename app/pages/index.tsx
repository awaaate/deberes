import { chakra } from "@chakra-ui/react";
import Layout from "../components/layout";
import Board from 'react-trello/src'

import {data} from "../sample.data"
function MainPage() {
    return (
        <Layout>
            <chakra.div>
                <Board data={data}></Board>
            </chakra.div>
        </Layout>
    );
}

export default MainPage;
