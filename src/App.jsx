import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, 
  Hero, Navbar, Tech, Works, StarsCanvas } from './components';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <div className="relative z-0">
              <Hero />
              <StarsCanvas />
            </div>
          </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
