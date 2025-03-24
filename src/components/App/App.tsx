import React, { useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import About from "@/pages/about/About";
import avatarPng from "@/assets/Avatar.png";
import avatarJpg from "@/assets/Avatar.jpg";
import Calendar from "@/assets/Calendar.svg";
//razdeliat na bandly: odin dlia desctopa,drugoi dlia mobile.
//po raznym url mozhno raznye  sborki razdavat
//eta optimizatsia nazyvaetsia TREE SHAKING- mozno poniat kakie vetki coda ne ispolzyiutsia
//TREE SHAKING - mekzhanizm vstriakhivania dereva importov,
//  kakikh to razvletvlenii v code, kakoi-to ne ispolzuemiy code. WEBPACK mozhet vstriakhnyt
// i v itogovuiu sborky etot code ne popadaet
//Lazy loading(lenivue chanki) + Dekompozitsia
function TODO() {
 TODO2()
}
function TODO2() {
  throw new Error()
}
export const App = () => {
  const [count, setCount] = useState<number>(0);
  // const increment = () => setCount((prev) => prev + 1);
  const increment = () =>{
    TODO();
  }
  // TODO('7')
  //sborka v logakh proshla uspeshno nesmotria na oshibku
  // TODO(7)
  // if(__PLATFORM__==='desktop'){
  //   return <div>ISDESKTOPPLATFORM</div>
  // }
  // if(__PLATFORM__==='mobile'){
  //   return <div>ISMOBILEPLATFORM</div>
  // }
  // if(__ENV__==='development'){
  //   //addDevtools()
  // }
  return (
    /// v production code data-testid ne nuzhny
    // <div data-testid={'App.DataTestId'}>
     <div> 
      <div>
        {/* <h1 data-testid={'Platform'}>PLATFORM={__PLATFORM__}</h1> */}
        <img width={100} height={100} src={avatarPng} alt="" />
        {avatarPng}
        <img width={100} height={100} src={avatarJpg} alt="" />
        {avatarJpg}
      </div>
      <div>
        <Calendar style={{ color: "green" }} width={100} height={100} />
        <Calendar width={100} height={100} fill={"yellow"} />
        {/* <Calendar className={classes.icon} width={100} height={100}  fill={'red'}/> */}
      </div>
      <Link to={"/about"}>about</Link>
      <br />
      <Link to={"/shop"}>shop</Link>
      <br />
      <Link to={"/admin"}>admin</Link>
      <h1>WEBPACK</h1>
      <h1 className={classes.value}>{count}</h1>
      <button className={classes.button} onClick={increment}>
        <span>increment</span>
      </button>
      {/* <Outlet /> */}
      <About />
    </div>
  );
};

// export default App;
