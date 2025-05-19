import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import PayPalDonation from "./components/Donations/Donation";
import Chatting from "./components/chat/Chatting";
import Events from "./components/Event/Event";
import EventDetails from "./components/Event/EventDetails";
// import Temp from "./components/Weather/temp";
import Weathers from "./components/Weather/Weathers";
import ChatRoom from "./components/Chatroom/ChatRoom";
import RssFeedPage from "./components/Poll/Poll_getdata";
import Poll from "./components/Poll/Poll";
import Point from "./components/FeedPosts/Point";
import News from "./components/News/News";
import FollowUnfollow from "./components/Suggestion/Suggestion";
import Contact from "./components/Contact/Contact";
import AI from "./components/AI/Ai";
import Test from "./components/testing/Test"
// import SinglePost from "./components/FeedPosts/SinglePost";

function App() {
  const [authUser] = useAuthState(auth);

  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!authUser ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route path="/:username" element={<ProfilePage />} />
        {/* <Route path="/:id" element={<SinglePost />} /> */}
        <Route path="/donation" element={<PayPalDonation />} />
        <Route path="/post/:id" element={<HomePage />} />
        <Route path="/chat" element={<Chatting />} />
        <Route path="/event" element={<Events />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/weather" element={<Weathers />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/poll" element={<RssFeedPage />} />
        <Route path="/vote/:pollId" element={<Poll />} />{" "}
        <Route path="/user-points-badge" element={<Point />} />
        <Route path="/news" element={<News />} />
        <Route path="/suggest" element={<FollowUnfollow />} />
        <Route path="/product" element={<Contact />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
