import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchResultItem from './SearchResultItem';
import { Box } from '@material-ui/core';
import { resultStyle } from './style';
import RideSharing from '../../assets/car-sharing.png';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function SearchResultView({ city, cityFrom, cityTo, data }) {
	const style = useMediaQuery('(max-width:650px)')
		? resultStyle.sm
		: resultStyle.lg;

	const timeTravel = `${Math.floor(data[0][0].duration / 60)} h ${
		data[0][0].duration - Math.floor(data[0][0].duration / 60) * 60
	} m`;

	const priceTravel = `€ ${data[0][0].price}`;

	const defineIconOfTransport = (transport) => {
		let resultIcon;
		switch (transport) {
			case 4:
				resultIcon = (
					<Typography>
						<img src={RideSharing} alt='car-shearing' fontSize='large' />
					</Typography>
				);
				break;
			case 3:
				resultIcon = (
					<Typography>
						<TrainIcon fontSize='large' />
					</Typography>
				);
				break;
			case 2:
				resultIcon = (
					<Typography>
						<DirectionsBusIcon fontSize='large' />
					</Typography>
				);
				break;
			case 10:
				resultIcon = (
					<Typography>
						<DirectionsBoatIcon fontSize='large' />
					</Typography>
				);
				break;
			default:
				resultIcon = (
					<Typography>
						<AirplanemodeActiveIcon fontSize='large' />
					</Typography>
				);
		}
		return resultIcon;
	};
	return (
		<div style={{ marginTop: '20px' }}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Box style={style.box}>
						<Box style={style.inline}>
							{/* {defineIconOfTransport(data[0][0].transportation_type)} */}
						</Box>
						<Typography>
							{cityFrom[0].properties.display_name}
							<ArrowForwardIcon
								fontSize='small'
								sx={{ verticalAlign: 'text-bottom' }}
							/>
							{cityTo[0].properties.display_name}
						</Typography>
						<Box style={style.bottomContainer}>
							<Typography style={style.time}>{timeTravel}</Typography>
							<Box style={style.priceContainer}>
								<Typography style={style.price}>{priceTravel}</Typography>
							</Box>
						</Box>
					</Box>
				</AccordionSummary>
				<AccordionDetails>
					{[data[0].length].map((item) => (
						<SearchResultItem
							key={item.id}
							item={item}
							from={cityFrom[0].properties.display_name}
							to={cityTo[0].properties.display_name}
							data={data[0][0]}
							time={timeTravel}
							price={priceTravel}
						/>
					))}
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
