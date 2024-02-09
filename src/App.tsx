import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Posts from "./Containers/Posts/Posts";
import NewPost from "./Containers/NewPost/NewPost";
import AboutUs from "./Containers/AboutUs/AboutUs";
import Contacts from "./Containers/Contacts/Contacts";
import Post from "./Containers/Post/Post"

const App = () => {

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/posts/:id/edit" element={<NewPost />}/>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
