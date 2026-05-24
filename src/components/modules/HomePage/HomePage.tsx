import HeroPage from "./HeroPage";
import ProblemSection from "./ProblemSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import PreviewSection from "./PreviewSection";
import CTASection from "./CTASection";
import TrustSection from "./TrustSection";
import WhySplitPaySection from "./WhySplitPaySection";

const Home = () => {
    return (
        <main className="overflow-hidden bg-background">
           <HeroPage />
           <ProblemSection />
           <HowItWorks />
           <FeaturesSection />
           <PreviewSection />
           <TrustSection />
           <WhySplitPaySection />
           <CTASection />
        </main>
    );
};

export default Home;
