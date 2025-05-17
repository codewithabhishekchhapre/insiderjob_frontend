import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import JobListing from "../component/JobListing";
import AppDownload from "../component/AppDownload";
import Footer from "../component/Footer";

const Home = () => {
    return(
        <div>
            <Navbar></Navbar>
            <Hero></Hero>
            <JobListing></JobListing>
            <AppDownload></AppDownload>
            <Footer></Footer>
        </div>
    )
}

export default Home