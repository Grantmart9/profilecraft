"use client"

import {
    animate,
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
} from "motion/react"
import { useRef, useEffect, useState } from "react"
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import DonateImage from "../images/DonatOption.png"
import DeliverImage from "../images/DeliverOption.png"
import ConnectImage from "../images/ConnectOption.png"
import Image from "next/image";

// Card data structure
const cardData = [
    {
        id: 1,
        icon: 'donate',
        title: 'Donate',
        image: DonateImage,
        description: 'Choose from a variety of causes and donate goods, cash or services.'
    },
    {
        id: 2,
        icon: 'deliver',
        title: 'Deliver',
        image: DeliverImage,
        description: 'Choose to deliver the goods or pick a date for us to pick them up.'
    },
    {
        id: 3,
        icon: 'connect',
        title: 'Connect',
        image: ConnectImage,
        description: "Join our community and see how your donations change other's lives."
    }
];

// Icon component mapping
const IconComponent = ({ icon }) => {
    switch (icon) {
        case 'donate':
            return <VolunteerActivismOutlinedIcon sx={{ color: 'white' }} />;
        case 'deliver':
            return <LocalShippingOutlinedIcon sx={{ color: 'white' }} />;
        case 'connect':
            return <Diversity3OutlinedIcon sx={{ color: 'white' }} />;
        default:
            return null;
    }
};

export default function HowItWorksAnimation() {
    const ref = useRef(null)
    const { scrollXProgress } = useScroll({ container: ref })
    const maskImageValue = useScrollOverflowMask(scrollXProgress)
    const [, setCurrentIndex] = useState(0)
    const autoScrollTimer = useRef(null)

    // Scroll to specific index
    const scrollToIndex = (index) => {
        if (ref.current) {
            const clientWidth = ref.current.clientWidth
            const itemWidth = clientWidth / 3
            const scrollPosition = index * itemWidth
            ref.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            })
        }
    }

    // Auto-scroll
    useEffect(() => {
        const startAutoScroll = () => {
            autoScrollTimer.current = setInterval(() => {
                setCurrentIndex(prevIndex => {
                    const nextIndex = (prevIndex + 1) % 3
                    scrollToIndex(nextIndex)
                    return nextIndex
                })
            }, 4000)
        }
        startAutoScroll()
        return () => clearInterval(autoScrollTimer.current)
    }, [])

    // Reset auto-scroll on manual scroll
    useEffect(() => {
        const handleScroll = () => {
            if (autoScrollTimer.current) clearInterval(autoScrollTimer.current)
            autoScrollTimer.current = setTimeout(() => {
                setCurrentIndex(prevIndex => {
                    const nextIndex = (prevIndex + 1) % 3
                    scrollToIndex(nextIndex)
                    return nextIndex
                })
            }, 10000)
        }
        const refCurrent = ref.current
        if (refCurrent) refCurrent.addEventListener('scroll', handleScroll)
        return () => {
            if (refCurrent) refCurrent.removeEventListener('scroll', handleScroll)
            if (autoScrollTimer.current) clearTimeout(autoScrollTimer.current)
        }
    }, [])

    return (
        <div className="mx-auto px-2 max-w-7xl py-12">
            <motion.ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cardData.map((card, index) => (
                    <motion.li
                        key={card.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                        className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 
                                 rounded-3xl shadow-xl shadow-purple-900/20 p-8 
                                 flex flex-col justify-between w-full h-72 
                                 backdrop-blur-sm border border-white/10"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="flex mx-auto mb-4"
                        >
                            <Image
                                src={card.image}
                                alt={`${card.title} image`}
                                width={150}
                                height={150}
                                className="object-cover rounded-xl 
                                             shadow-lg transform"
                            />
                        </motion.div>
                        <motion.p
                            className="text-gray-200 text-lg leading-relaxed mt-4"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                        >
                            {card.description}
                        </motion.p>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    )
}

const left = `0%`
const right = `100%`
const leftInset = `20%`
const rightInset = `80%`
const transparent = `#0000`
const opaque = `#000`

function useScrollOverflowMask(scrollXProgress) {
    const maskImage = useMotionValue(
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
    )

    useMotionValueEvent(scrollXProgress, "change", (value) => {
        if (value === 0) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
            )
        } else if (value === 1) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
            )
        } else if (
            scrollXProgress.getPrevious() === 0 ||
            scrollXProgress.getPrevious() === 1
        ) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
            )
        }
    })

    return maskImage
}

function StyleSheet() {
    return (
        <style>{`
            #example {
              width: 100vw;
              max-width: 400px;
              position: relative;
            }
            #example ul {
                display: flex;
                list-style: none;
                height: 220px;
                overflow-x: scroll;
                padding: 20px 0;
                margin: 0 auto;
                gap: 20px;
            }
            #example ::-webkit-scrollbar {
                height: 5px;
                width: 5px;
                background: #fff3;
                -webkit-border-radius: 1ex;
            }
            #example ::-webkit-scrollbar-thumb {
                background: var(--accent);
                -webkit-border-radius: 1ex;
            }
            #example ::-webkit-scrollbar-corner {
                background: #fff3;
            }
            #example li {
                flex: 0 0 200px;
                background: var(--accent);
            }
        `}</style>
    )
}
