import "@/styles/globals.css";
import {Footer, NavBar,Logo} from '../components';

export default function App({Component, pageProps}) {
    return (
        <>
            <NavBar/>
            <Component {...pageProps} />
            <Footer/>
        </>

    )
}
