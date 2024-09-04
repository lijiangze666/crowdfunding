import "@/styles/globals.css";
import {Footer, NavBar, Logo} from '../components';
import {CrowdFundingProvider} from '../context/CrowdFunding'

export default function App({Component, pageProps}) {
    return (
        <>
            <CrowdFundingProvider>
                <NavBar/>
                <Component {...pageProps} />
                <Footer/>
            </CrowdFundingProvider>
        </>

    )
}
