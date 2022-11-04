// import Spinner from "react-spinner-material";
import "../Spinner.css";
function SpinnerMain() {
  return (
    <div className="spinner-content">
      <div className="spinner-back"> </div>
      <div className="sk-fading-circle">
        <div className="sk-circle1 sk-circle"></div>
        <div className="sk-circle2 sk-circle"></div>
        <div className="sk-circle3 sk-circle"></div>
        <div className="sk-circle4 sk-circle"></div>
        <div className="sk-circle5 sk-circle"></div>
        <div className="sk-circle6 sk-circle"></div>
        <div className="sk-circle7 sk-circle"></div>
        <div className="sk-circle8 sk-circle"></div>
        <div className="sk-circle9 sk-circle"></div>
        <div className="sk-circle10 sk-circle"></div>
        <div className="sk-circle11 sk-circle"></div>
        <div className="sk-circle12 sk-circle"></div>
      </div>
    </div>

    // <div>
    //   <div className="spinner-content">
    //     <div className="spinner-back"></div>
    //     <Spinner radius={120} color={"#ffffff"} visible={true} />
    //   </div>
    // </div>
  );
}

export default SpinnerMain;
