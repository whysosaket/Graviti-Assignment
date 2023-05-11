import { useContext } from "react";
import Navbar from "./components/Navbar";
import Selector from "./components/Selector";
import GlobalContext from "./context/globalContext.jsx";
import MapView from "./components/MapView";
import { useMediaQuery } from "react-responsive";

function App() {
  const context = useContext(GlobalContext);
  const { isLoaded } = context;

  if(!isLoaded) {
    return <>Loading...</>
  }

  const isMobile = useMediaQuery({
    query: "(max-width: 767px)" // assuming 767px is the breakpoint for mobile view
  });

  return (
    <>
      <Navbar />
      <h1 className="text-center my-8 text-[#1b31a8] font-primary">
        Let's calculate <span className="font-bold">distance</span> from Google
        maps
      </h1>
      <div className="md:flex">
      {isMobile &&
        <div className="md:w-1/2 mx-2">
          <MapView />
        </div>
        }
        <div className="md:w-1/2">
          <Selector />
        </div>
        {!isMobile &&
        <div className="md:w-1/2">
          <MapView />
        </div>
        }
      </div>
    </>
  );
}

export default App;
