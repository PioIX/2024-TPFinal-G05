"use client";

import React, { useEffect, useState } from 'react';
import styles from './MusicPlayer.module.css';
import Icon from './Icon';
import clsx from 'clsx';

export default function MusicPlayer({ variant }) {
    const playlist = [
        '/music/HeatWaves.mp3',
        '/music/(FIFA 14) John Newman - Love Me Again.mp3',
        '/music/fifa 14 alive-empire of the sun [ Soundtrack HD ].mp3',
        '/music/Avicii - The Nights (FIFA 15 Soundtrack).mp3',
        '/music/OFFICIAL FIFA 13 Soundtrack - Imagine Dragons - On Top of the World.mp3',
        '/music/Yo x Ti, Tu x Mi - ROSALÍA & Ozuna (FIFA 20 Official Soundtrack).mp3',
        '/music/Que Calor - Major Lazer (ft. J Balvin & El Alfa) (Official FIFA 20 Soundtrack).mp3',
    ];

    const [isPlaying, setIsPlaying] = useState(false); // Estado para manejar la reproducción
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Índice de la canción actual
    const [audio] = useState(new Audio()); // Crear un único objeto Audio

    const [position, setPosition] = useState({ x: 1470, y: 580 });
    const [isDragging, setIsDragging] = useState(false);
    const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

    const getRandomTrackIndex = () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * playlist.length);
        } while (randomIndex === currentTrackIndex); // Evitar la repetición consecutiva
        return randomIndex;
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            const nextIndex = getRandomTrackIndex(); // Seleccionar una nueva canción aleatoria
            setCurrentTrackIndex(nextIndex);
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

    const handleTrackEnd = () => {
        const nextIndex = getRandomTrackIndex(); // Seleccionar el próximo índice de manera aleatoria
        setCurrentTrackIndex(nextIndex);
    };

    useEffect(() => {
        // Configurar el evento 'ended' para cambiar de canción
        audio.addEventListener('ended', handleTrackEnd);

        return () => {
            audio.removeEventListener('ended', handleTrackEnd);
        };
    }, [audio]);

    useEffect(() => {
        // Cambiar la fuente del audio y reproducir si está en modo "play"
        audio.src = playlist[currentTrackIndex];
        audio.load();
        if (isPlaying) {
            audio.play();
        }
    }, [currentTrackIndex, audio, isPlaying]);

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
                {isPlaying ? (
                    <Icon srcImg="/images/Off.svg" variant="Nav"></Icon>
                ) : (
                    <Icon srcImg="/images/On.svg" variant="Nav"></Icon>
                )}
            </button>
        </div>
    );
}
