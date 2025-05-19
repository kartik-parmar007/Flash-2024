// import CreatePost from "./CreatePost";
import Home from "./Home";
// import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import News from "./NewsPage";
import Donate from "./DonateTag";
import Chat from "./Chat";
import Event from "./Event";
import Weathers from "./Weather";
import PollSection from "./PollSection";
import Suggestion from "./Sujjestion";
import Contact from "./Product";
import AI from "./AI";

const SidebarItems = () => {
	return (
    <>
      <Home />
      <Suggestion />
      {/* <Notifications /> */}
      {/* <CreatePost /> */}
      <News />
      <Weathers	 />
      <AI />
      <PollSection />
      <Event />
      <Chat />
      <Donate />
      <Contact />
      {/* <SocialMedia /> */}
      <ProfileLink />
    </>
  );
};

export default SidebarItems;
