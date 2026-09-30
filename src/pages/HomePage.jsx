import { CtaSection, FaqSection, FeatureSection, ServicesSection, StatisticsSection, TestimonialsSection, WhyChooseSection } from '../components/home/HomeSections';
import { HeroSection } from '../components/home/HeroSection';
import { PropertySearch } from '../components/home/PropertySearch';
import { PredictionEstimator } from '../components/home/PredictionEstimator';

export function HomePage() {
  return <><HeroSection /><PropertySearch /><PredictionEstimator /><FeatureSection /><ServicesSection /><WhyChooseSection /><StatisticsSection /><TestimonialsSection /><FaqSection /><CtaSection /></>;
}
