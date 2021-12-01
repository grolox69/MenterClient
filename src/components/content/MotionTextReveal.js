import { motion } from 'framer-motion';
import {
    Typography,
} from '@mui/material';

const sentence = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.01,
            staggerChildren: 0.02,
        },
    },
}
const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
    },
}

const line1 = "Scheduling tutoring sessions made easy with Menter,";
const line2 = "avoiding the back-and-forth emails so you can enjoy";
const line3 = " a more productive day."

export default function MotionTextReveal() {
    return (
        <Typography component={motion.h3} variants={sentence} initial="hidden" animate="visible" variant="h5" color="text.secondary" paragraph>
            {line1.split("").map((char, index) => {
                return (
                    <motion.span key={char + "_" + index} variants={letter}>
                        {char}
                    </motion.span>
                )
            })}
            <br />
            {line2.split("").map((char, index) => {
                return (
                    <motion.span key={char + + index} variants={letter}>
                        {char}
                    </motion.span>
                )
            })}
            <br />
            {line3.split("").map((char, index) => {
                return (
                    <motion.span key={char + + index} variants={letter}>
                        {char}
                    </motion.span>
                )
            })}

        </Typography>
    )
}