// import React, {useState} from 'react';
// import Schloss_Charlottenburg from "..//images/Schloss_Charlottenburg_(233558373).jpeg";
// import shutterstock from "../images/shutterstock_112137761 (1).jpg"
// import Tower_Bridge from "../images/Tower_Bridge_from_Shad_Thames.jpg"

const Gallery = () => {
    // const img=[Schloss_Charlottenburg, shutterstock, Tower_Bridge];
    // const[src,setSrc]=useState("https://upload.wikimedia.org/wikipedia/commons/1/12/Schloss_Charlottenburg_%28233558373%29.jpeg");
    // const[a,setA]=useState(1);
    //
    // const nextImg=()=>{
    //     if (a === 2) {
    //         setA(0);
    //     } else {
    //         setA(a + 1);
    //     }
    //     setSrc(`${img[a]}`);
    // }
    // const prevImg=()=>{
    //     if (a === 0) {
    //         setA(2);
    //     } else {
    //         setA(a - 1);
    //     }
    //     setSrc(`${img[a]}`);
    // }

    return (
        <div className={"gallery"}>
            <div id={"mpCities"}>The most popular cities</div>
            <div id={"explore"}>Explore the most popular cities
                around the world and experience their
                unique charm and attractions!</div>
            {/*<div className={"navGallery"}>*/}
            {/*    <button className={"galBut"} onClick={prevImg}>Prev</button>*/}
            {/*    <img className={"image"}*/}
            {/*         src={src} alt={"town"}/>*/}
            {/*    <button className={"galBut"} onClick={nextImg}>Next</button>*/}
            {/*</div>*/}
        </div>
    );
};
export default Gallery;