import HeroPage from "./HeroPage";
import ProblemSection from "./ProblemSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import PreviewSection from "./PreviewSection";
import CTASection from "./CTASection"; 

const Home = () => {
    return (
        <div>
           <HeroPage />
           <ProblemSection />
           <FeaturesSection />
           <HowItWorks />
           <PreviewSection />
           <CTASection />
        </div>
    );
};

export default Home;