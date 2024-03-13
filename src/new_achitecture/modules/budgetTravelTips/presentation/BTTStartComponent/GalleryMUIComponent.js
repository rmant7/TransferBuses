// import Schloss_Charlottenburg from "./images/Schloss_Charlottenburg.jpeg";
// import shutterstock from "../images/shutterstock.jpg"
// import Tower_Bridge from "../images/Tower_Bridge.jpg"
// import  New_york    from "../images/New20City_GettyImages-1347979016.webp"
// import London from "../images/study-in-london.jpg"
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import {itemData} from "./itemData";
import style from './GalleryMUIComponent.module.css';

export default function TitlebarImageList() {
    return (
        <ImageList className={style.imageList}
                   sx={{ width: 1000, height: 550 }}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        alt={item.title}
                        className={style.image}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        subtitle={item.author}
                        actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.title}`}
                            >
                                <InfoIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}



// const itemData = [
//     {
//         img: shutterstock,
//         title: 'Paris',
//         featured: true,
//     },
//     {
//         img: Schloss_Charlottenburg,
//         title: 'Berlin',
//     },
//     {
//         img: London,
//         title: 'London',
//     },
//     {
//         img:New_york,
//         title:'New York',
//     }
//     ,];

