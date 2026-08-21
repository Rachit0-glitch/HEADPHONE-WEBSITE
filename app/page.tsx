import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import ProductSequence from "@/components/ProductSequence";
import ProductSectionBlue from "@/components/ProductSectionBlue";
import ProductSectionBlack from "@/components/ProductSectionBlack";
import ProductSectionGreen from "@/components/ProductSectionGreen";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <ProductSequence states={[<ProductSectionBlue key="blue" />, <ProductSectionBlack key="black" />, <ProductSectionGreen key="green" />]} />
    </main>
  );
}
