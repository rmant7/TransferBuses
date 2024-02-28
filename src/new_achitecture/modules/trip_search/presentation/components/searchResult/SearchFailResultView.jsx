import Typography from '@mui/material/Typography';
import { Box } from '@material-ui/core';
import { resultStyle } from './style';

export default function SearchFailResultView() {
	return (
		<div style={{ marginTop: '20px' }}>
			<Box style={resultStyle.box}>
				<Typography>Sorry, we have not found such a route</Typography>
			</Box>
		</div>
	);
}
