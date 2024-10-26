import "./App.css";
import Viewer from "./components/Viewer/Viewer";

function App() {
  return (
    <>
      <Viewer
        showClock={false}
        countUp={true}
        previousTimer={0}
        remainingTimer={0}
        startTime={new Date(new Date().setHours(14, 0, 0, 0))}
        state="Ticking"
        headerText={""}
        followTimer={false}
        endTime={new Date(new Date().setHours(18, 0, 0, 0))}
      />
    </>
  );
}

export default App;
