import Navbar     from '@/components/layout/Navbar';
import Hero       from '@/components/sections/Hero';
import About      from '@/components/sections/About';
import Skills     from '@/components/sections/Skills';
import Projects   from '@/components/sections/Projects';
import Contact    from '@/components/sections/Contact';
import Footer     from '@/components/layout/Footer';

import SectionMotion from '@/components/SectionMotion';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionMotion id="about"><About/></SectionMotion>
      <SectionMotion id="skills"><Skills/></SectionMotion>
      <SectionMotion id="projects"><Projects/></SectionMotion>
      <SectionMotion id="contact"><Contact/></SectionMotion>
      <Footer/>
    </>
  );
}
