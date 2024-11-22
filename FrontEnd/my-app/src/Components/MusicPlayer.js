"use client";

import React, { useEffect, useState } from 'react';
import styles from './MusicPlayer.module.css';
import Icon from './Icon';
import clsx from 'clsx';

export default function MusicPlayer({ variant }) {
    const [isPlaying, setIsPlaying] = useState(false); // Estado para manejar la reproducción
    const [audio] = useState(new Audio('/music/HeatWaves.mp3')); // Crear el objeto Audio

    const [position, setPosition] = useState({ x: 1470, y: 580 });
    const [isDragging, setIsDragging] = useState(false);
    const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

    const togglePlayPause = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleDragStart = (e) => {
        setIsDragging(true);
        setStartDrag({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const handleDrag = (e) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - startDrag.x,
            y: e.clientY - startDrag.y,
        });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleDrag);
        window.addEventListener('mouseup', handleDragEnd);
        return () => {
            window.removeEventListener('mousemove', handleDrag);
            window.removeEventListener('mouseup', handleDragEnd);
        };
    }, [isDragging, startDrag]);

    return (
        <div
            className={styles.divFlotante}
            style={{ top: position.y, left: position.x }}
            onMouseDown={handleDragStart}
        >
            <button className={clsx(styles.button, variant)} onClick={togglePlayPause}>
                {isPlaying ? (<Icon srcImg="/images/Off.svg" variant="Nav"></Icon>) : (<Icon srcImg="/images/On.svg" variant="Nav"></Icon>)}
            </button>
            <audio src="/music/HeatWaves.mp3" style={{ display: 'none' }} />
        </div>
    );
}
