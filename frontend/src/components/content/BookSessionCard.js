import {
    Card,
    Button,
    Typography,
    CardContent,
    CardActions,
} from '@mui/material';
import { Link } from "react-router-dom";

export default function BookSessionCard({sessionType, vanity}) {
    return (
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {sessionType.title}
            </Typography>
            <Typography sx={{ mt: 1.5 }} variant="body2" color="text.secondary">
              {sessionType.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to={sessionType.slug} size="small">Book Now</Button>
          </CardActions>
        </Card>
    )
}