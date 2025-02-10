import Hero from "./_components/Hero/Hero";
import OfferPage from "./_components/Offer/OfferPage";
import PageWithReactModal from "./_components/Modal/ModalPage";
import Services from "./_components/Services/Services";
import { ToastContainer } from "react-toastify";
import InstructorPage from "./instructor/page";
export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <OfferPage />
      <InstructorPage />
      <PageWithReactModal />
      <ToastContainer />
    </div>
  );
}
