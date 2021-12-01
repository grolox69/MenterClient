import { motion } from 'framer-motion';
import { Box } from '@mui/material';

const svgVariants = {
    initial: {
        x: '100vw'
    },
    final: {
        x: 0,
        scale: 0.7,
        transition: {
            type: "spring", 
            stiffness: 50,
        }
    }
}


export default function MotionSVG({figure}) {
    return (
        <Box component={motion.img} src={figure} variants={svgVariants} initial="initial" animate="final" m={2} sx={{ width: 600 }} /> 
    )
}