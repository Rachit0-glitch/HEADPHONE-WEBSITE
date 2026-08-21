import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import ProductStage from "@/components/ProductStage";
import ProductSectionBlue from "@/components/ProductSectionBlue";
import ProductSectionBlack from "@/components/ProductSectionBlack";
import ProductSectionGreen from "@/components/ProductSectionGreen";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <ProductStage from={<ProductSectionBlue role="from" />} to={<ProductSectionBlack role="to" />} />
      <ProductStage from={<ProductSectionBlack role="from" />} to={<ProductSectionGreen role="to" />} />
    </main>
  );
}
