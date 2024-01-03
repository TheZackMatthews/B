import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RSVP from "./components/RSVP";
import Location from "./components/Location";
import NoMatch from "./components/NoMatch";
import Playlist from "./components/Playlist";
import Registry from "./components/Registry";
import FAQ from "./components/FAQ";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="rsvp" element={<RSVP />} />
        <Route path="location" element={<Location />} />
        <Route path="playlist" element={<Playlist />} />
        <Route path="registry" element={<Registry />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
