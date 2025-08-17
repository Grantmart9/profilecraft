"use client"

import * as motion from "motion/react-client"
import { useEffect, useState } from "react"

export default function LoadingThreeBlocksJumping() {
    const [order, setOrder] = useState(initialOrder)

    useEffect(() => {
        const timeout = setTimeout(() => setOrder(shuffle(order)), 500)
        return () => clearTimeout(timeout)
    }, [order])

    return (
        <div style={fullScreenCenter}>
            <ul style={container}>
                {order.map((backgroundColor) => (
                    <motion.li
                        key={backgroundColor}
                        layout
                        transition={spring}
                        style={{ ...item, backgroundColor }}
                    />
                ))}
            </ul>
        </div>
    )
}

const initialOrder = [
    "rgba(248, 185, 134,0.72)",
    "rgba(235, 92, 92,0.72)",
    "rgba(143, 230, 187,0.72)",
 
]

// ============== Utils ================
function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5)
}

// ============== Styles ================
const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300,
}

const fullScreenCenter = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const container = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: 10,
}

const item = {
    width: 60,
    height: 60,
    borderRadius: "10px", // optional: soften corners slightly
}
