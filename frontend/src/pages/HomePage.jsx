//import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import PostList from "../components/PostList";
import Header from "../components/Header";

const HomePage = () => {
    return (
        <div className="bg-gray-100">
            <Header />
            <Banner />
            <div className="container mx-auto px-4 py-8">
                <PostList />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
