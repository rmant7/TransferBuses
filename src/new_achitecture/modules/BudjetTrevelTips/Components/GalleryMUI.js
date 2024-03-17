import Schloss_Charlottenburg from "..//images/Schloss_Charlottenburg_(233558373).jpeg";
import shutterstock from "../images/shutterstock_112137761 (1).jpg"
import  New_york    from "../images/New20City_GettyImages-1347979016.webp"
import London from "../images/study-in-london.jpg"
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import css from "../Styles/TrevelTipsCSS.css"
export default function TitlebarImageList() {
    return (
        <ImageList className={css.imageList}
            sx={{ width: 1000, height: 550 }}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        alt={item.title}
                        className={css.image}
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



const itemData = [
    {
        img: shutterstock,
        title: 'Paris',
        featured: true,
    },
    {
        img: Schloss_Charlottenburg,
        title: 'Berlin',
    },
    {
        img: London,
        title: 'London',
    },
    {
        img:New_york,
        title:'New York',
    }
    ,];
