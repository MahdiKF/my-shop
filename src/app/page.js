import AboutUs from "@/components/AboutUs";
import Container from "@/components/Container";
import NewProducts from "@/components/NewProducts";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <Container>
      <Slider />
      <NewProducts />
      <AboutUs />
    </Container>
  );
}
