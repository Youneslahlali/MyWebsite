"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const SPRITES: Record<string, string[]> = {
    dinoRun1: [
        "             XXXXXXX",
        "            XXXXXXXX",
        "            XXXX    ",
        "            XXXXXXX ",
        "            XXXX    ",
        "            XXXX    ",
        "            XXXX    ",
        "   X       XXXXX    ",
        "   X      XXXXXX    ",
        "   XX    XXXXXXX    ",
        "   XXX  XXXXXXXX    ",
        "   XXXXXXXXXXXXX    ",
        "   XXXXXXXXXXXX     ",
        "    XXXXXXXXXX      ",
        "     XXXXXXXX       ",
        "      XXXXXX        ",
        "      X    X        ",
        "      XX   XX       ",
        "      X    X        "
    ],
    dinoRun2: [
        "             XXXXXXX",
        "            XXXXXXXX",
        "            XXXX    ",
        "            XXXXXXX ",
        "            XXXX    ",
        "            XXXX    ",
        "            XXXX    ",
        "   X       XXXXX    ",
        "   X      XXXXXX    ",
        "   XX    XXXXXXX    ",
        "   XXX  XXXXXXXX    ",
        "   XXXXXXXXXXXXX    ",
        "   XXXXXXXXXXXX     ",
        "    XXXXXXXXXX      ",
        "     XXXXXXXX       ",
        "      XXXXXX        ",
        "      X    X        ",
        "           XX       ",
        "           X        "
    ],
    dinoDuck1: [
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "              XXXXXX",
        "   X         XXXXXXX",
        "   XX       XXXX    ",
        "   XXX     XXXXXXX  ",
        "   XXXXXXXXXXXXXXXX ",
        "   XXXXXXXXXXXXXXXX ",
        "    XXXXXXXXXXXX    ",
        "     XXXXXXXXXX     ",
        "      XXXXXXXX      ",
        "      XXXXXX        ",
        "      X    X        ",
        "      XX   XX       "
    ],
    dinoDuck2: [
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "              XXXXXX",
        "   X         XXXXXXX",
        "   XX       XXXX    ",
        "   XXX     XXXXXXX  ",
        "   XXXXXXXXXXXXXXXX ",
        "   XXXXXXXXXXXXXXXX ",
        "    XXXXXXXXXXXX    ",
        "     XXXXXXXXXX     ",
        "      XXXXXXXX      ",
        "      XXXXXX        ",
        "      X             ",
        "      XX            "
    ],
    cactusSmall: [
        "  XX  ",
        "  XX  ",
        "X XX  ",
        "X XX X",
        "XXXX X",
        "  XX X",
        "  XXXX",
        "  XX  ",
        "  XX  ",
        "  XX  "
    ],
    cactusLarge: [
        "   XX   ",
        "   XX   ",
        "   XX   ",
        " X XX   ",
        " X XX X ",
        " X XX X ",
        " X XX X ",
        " XXXX X ",
        "   XX X ",
        "   XXXX ",
        "   XX   ",
        "   XX   ",
        "   XX   ",
        "   XX   "
    ],
    bird1: [
        "        X       ",
        "        XX      ",
        "    XXXXXXX     ",
        " XXXXXXXXXXX    ",
        "  XXXXXXXXXXX   ",
        "       XXXXX    ",
        "       XXX      ",
        "      XX        "
    ],
    bird2: [
        "       XXX      ",
        "      XX        ",
        "    XXXXXXX     ",
        " XXXXXXXXXXX    ",
        "  XXXXXXXXXXX   ",
        "        XXXX    ",
        "        XX      ",
        "        X       "
    ]
};

const drawSprite = (ctx: CanvasRenderingContext2D, sprite: string[], startX: number, startY: number, scale: number, color: string) => {
    ctx.fillStyle = color;
    for(let r=0; r<sprite.length; r++) {
        for(let c=0; c<sprite[r].length; c++) {
            if(sprite[r][c] === 'X') {
                ctx.fillRect(startX + c*scale, startY + r*scale, scale, scale);
            }
        }
    }
};

const getSpriteDimensions = (sprite: string[], scale: number) => {
    return {
        width: Math.max(...sprite.map(r => r.length)) * scale,
        height: sprite.length * scale
    };
};

type Obstacle = {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    type: 'cactusSmall' | 'cactusLarge' | 'bird';
    birdHeightOffset?: number;
};

export default function DinoGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);
    
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [_, forceRender] = useState(0);

    const PIXEL_SCALE = 3;
    const GROUND_Y = 220;
    const GRAVITY = 0.8;
    const JUMP_STRENGTH = -14;

    const gameState = useRef({
        dino: { x: 50, y: GROUND_Y - 57, dy: 0, isJumping: false, isDucking: false },
        obstacles: [] as Obstacle[],
        frameCount: 0,
        score: 0,
        speed: 6.5,
        isGameOver: false,
        isStarted: false,
        isDarkMode: false
    });

    const resetGame = () => {
        gameState.current = {
            ...gameState.current,
            dino: { x: 50, y: GROUND_Y - 57, dy: 0, isJumping: false, isDucking: false },
            obstacles: [],
            frameCount: 0,
            score: 0,
            speed: 6.5,
            isGameOver: false,
            isStarted: true
        };
        setScore(0);
        setGameOver(false);
        setGameStarted(true);
    };

    const jump = () => {
        const state = gameState.current;
        if (!state.isStarted || state.isGameOver) {
            resetGame();
            return;
        }
        if (!state.dino.isJumping && !state.dino.isDucking) {
            state.dino.dy = JUMP_STRENGTH;
            state.dino.isJumping = true;
        }
    };

    useEffect(() => {
        // Detect dark mode to switch colors natively
        if (typeof window !== 'undefined') {
            gameState.current.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                jump();
            }
            if (e.code === 'ArrowDown') {
                e.preventDefault();
                if (gameState.current.isStarted && !gameState.current.isGameOver && !gameState.current.dino.isJumping) {
                    gameState.current.dino.isDucking = true;
                }
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'ArrowDown') {
                e.preventDefault();
                gameState.current.dino.isDucking = false;
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            jump();
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('touchstart', handleTouchStart);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Ground bump generator
        const groundBumps: {x: number, y: number, w: number}[] = [];
        for(let i=0; i<100; i++) {
            groundBumps.push({ x: i * 30 + Math.random() * 20, y: GROUND_Y + Math.random() * 5, w: PIXEL_SCALE * (1 + Math.random() * 2) });
        }

        const loop = () => {
            const state = gameState.current;
            const isDark = state.isDarkMode;
            
            // Authentic colors
            const bgColor = isDark ? '#202124' : '#ffffff';
            const spriteColor = isDark ? '#acacac' : '#535353';
            const skyObjColor = isDark ? '#444444' : '#e0e0e0';

            // Clear canvas
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw Ground Line
            ctx.fillStyle = spriteColor;
            ctx.fillRect(0, GROUND_Y, canvas.width, 1);

            // Draw Ground Bumps (moving)
            if (state.isStarted && !state.isGameOver) {
                groundBumps.forEach(b => {
                    b.x -= state.speed;
                    if (b.x < -10) b.x += 3000; 
                });
            }
            groundBumps.forEach(b => {
                ctx.fillRect(b.x % canvas.width, b.y, b.w, 1);
            });

            // Night sky logic for dark mode
            if (isDark) {
                ctx.fillStyle = skyObjColor;
                // Stars
                for (let i = 0; i < 8; i++) {
                    const starX = ((state.frameCount * 0.5 + i * 150) % (canvas.width + 100)) - 50;
                    ctx.fillRect(canvas.width - starX, 30 + (i * 40) % 100, 2, 2);
                }
                // Moon (simple pixel arc)
                const moonX = ((state.frameCount * 0.2 + 500) % (canvas.width + 200)) - 100;
                ctx.beginPath();
                ctx.arc(canvas.width - moonX, 60, 15, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Clouds
                ctx.fillStyle = skyObjColor;
                for (let i = 0; i < 4; i++) {
                    const cloudX = ((state.frameCount * 1 + i * 250) % (canvas.width + 150)) - 100;
                    ctx.fillRect(canvas.width - cloudX, 50 + (i * 20) % 50, 40, 10);
                }
            }

            if (!state.isStarted) {
                drawSprite(ctx, SPRITES.dinoRun1, state.dino.x, GROUND_Y - getSpriteDimensions(SPRITES.dinoRun1, PIXEL_SCALE).height, PIXEL_SCALE, spriteColor);
                requestRef.current = requestAnimationFrame(loop);
                return;
            }

            if (state.isGameOver) {
                const spriteStr = state.dino.isDucking ? SPRITES.dinoDuck1 : Math.round(state.dino.y) < GROUND_Y - 57 ? SPRITES.dinoRun1 : SPRITES.dinoRun2;
                drawSprite(ctx, spriteStr, state.dino.x, state.dino.y, PIXEL_SCALE, spriteColor);
                
                state.obstacles.forEach(obs => {
                    const objSprite = obs.type === 'bird' ? SPRITES.bird1 : (obs.type === 'cactusLarge' ? SPRITES.cactusLarge : SPRITES.cactusSmall);
                    drawSprite(ctx, objSprite, obs.x, obs.y, PIXEL_SCALE, spriteColor);
                });

                // Draw Authentic Game Over Text
                ctx.fillStyle = spriteColor;
                ctx.font = 'bold 24px "Courier New", Courier, monospace';
                ctx.textAlign = 'center';
                ctx.fillText('G A M E  O V E R', canvas.width / 2, canvas.height / 2 - 20);
                
                // Draw Restart Icon (Circle arrow)
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2 + 30, 20, 0, Math.PI * 2);
                ctx.strokeStyle = spriteColor;
                ctx.lineWidth = 4;
                ctx.stroke();
                
                requestRef.current = requestAnimationFrame(loop);
                return; 
            }

            state.frameCount++;

            // Physics
            state.dino.dy += GRAVITY;
            state.dino.y += state.dino.dy;

            const standingHeight = getSpriteDimensions(SPRITES.dinoRun1, PIXEL_SCALE).height;
            const duckingHeight = getSpriteDimensions(SPRITES.dinoDuck1, PIXEL_SCALE).height;
            const currentHeight = state.dino.isDucking ? duckingHeight : standingHeight;

            if (state.dino.y >= GROUND_Y - currentHeight) {
                state.dino.y = GROUND_Y - currentHeight;
                state.dino.dy = 0;
                state.dino.isJumping = false;
            }

            if (state.frameCount % Math.floor(Math.random() * 50 + 60) === 0) {
                const types: Array<'cactusSmall' | 'cactusLarge' | 'bird'> = ['cactusSmall', 'cactusLarge'];
                if (state.score > 300) types.push('bird');
                
                const type = types[Math.floor(Math.random() * types.length)];
                const spriteDim = getSpriteDimensions(
                    type === 'bird' ? SPRITES.bird1 : (type === 'cactusLarge' ? SPRITES.cactusLarge : SPRITES.cactusSmall), 
                    PIXEL_SCALE
                );

                let yPos = GROUND_Y - spriteDim.height + 2; // +2 sinks cactus roots slightly into ground line
                let birdHeightOffset = 0;

                if (type === 'bird') {
                    birdHeightOffset = Math.floor(Math.random() * 3); 
                    if (birdHeightOffset === 0) yPos = GROUND_Y - 95;
                    if (birdHeightOffset === 1) yPos = GROUND_Y - 65;
                    if (birdHeightOffset === 2) yPos = GROUND_Y - 35;
                }

                const lastObstacle = state.obstacles[state.obstacles.length - 1];
                if (!lastObstacle || lastObstacle.x < canvas.width - 250) {
                    state.obstacles.push({
                        x: canvas.width,
                        y: yPos,
                        width: spriteDim.width,
                        height: spriteDim.height,
                        speed: state.speed,
                        type,
                        birdHeightOffset
                    });
                }
            }

            for (let i = 0; i < state.obstacles.length; i++) {
                const obs = state.obstacles[i];
                obs.x -= obs.speed;

                const dinoHitbox = {
                    x: state.dino.x + 10,
                    y: state.dino.y + 10,
                    width: getSpriteDimensions(SPRITES.dinoRun1, PIXEL_SCALE).width - 20,
                    height: currentHeight - 15
                };

                const obsHitbox = {
                    x: obs.x + 5,
                    y: obs.y + 5,
                    width: obs.width - 10,
                    height: obs.height - 10
                };

                if (
                    dinoHitbox.x < obsHitbox.x + obsHitbox.width &&
                    dinoHitbox.x + dinoHitbox.width > obsHitbox.x &&
                    dinoHitbox.y < obsHitbox.y + obsHitbox.height &&
                    dinoHitbox.y + dinoHitbox.height > obsHitbox.y
                ) {
                    state.isGameOver = true;
                    setGameOver(true);
                    setHighScore(prev => Math.max(prev, state.score));
                    forceRender(Math.random());
                }
            }

            state.obstacles = state.obstacles.filter(obs => obs.x + obs.width > -50);

            if (state.frameCount % 500 === 0) {
                state.speed += 0.5;
            }

            let dinoSprite;
            if (state.dino.isJumping) {
                dinoSprite = SPRITES.dinoRun1;
            } else if (state.dino.isDucking) {
                dinoSprite = Math.floor(state.frameCount / 6) % 2 === 0 ? SPRITES.dinoDuck1 : SPRITES.dinoDuck2;
            } else {
                dinoSprite = Math.floor(state.frameCount / 6) % 2 === 0 ? SPRITES.dinoRun1 : SPRITES.dinoRun2;
            }
            drawSprite(ctx, dinoSprite, state.dino.x, state.dino.y, PIXEL_SCALE, spriteColor);
            
            state.obstacles.forEach(obs => {
                let obsSprite;
                if (obs.type === 'bird') {
                    obsSprite = Math.floor(state.frameCount / 10) % 2 === 0 ? SPRITES.bird1 : SPRITES.bird2;
                } else if (obs.type === 'cactusLarge') {
                    obsSprite = SPRITES.cactusLarge;
                } else {
                    obsSprite = SPRITES.cactusSmall;
                }
                drawSprite(ctx, obsSprite, obs.x, obs.y, PIXEL_SCALE, spriteColor);
            });

            if (state.frameCount % 5 === 0) {
                state.score++;
                setScore(state.score);
            }

            requestRef.current = requestAnimationFrame(loop);
        };

        requestRef.current = requestAnimationFrame(loop);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    // Helper for authentic score padding logic
    const formatScore = (val: number) => val.toString().padStart(5, '0');

    return (
        <div className="min-h-screen bg-[#ffffff] dark:bg-[#202124] flex flex-col items-center justify-center font-mono selection:bg-[#535353] selection:text-white">
            <Link href="/#projects" className="absolute top-8 left-8 flex items-center gap-2 font-bold opacity-50 hover:opacity-100 transition-opacity z-10 text-[#535353] dark:text-[#acacac]">
                <ArrowLeft strokeWidth={2} size={20} /> Back
            </Link>

            <div className="w-full max-w-3xl flex flex-col items-center relative">
                
                {/* Score UI - Clean, borderless, matching aesthetic */}
                <div className="flex justify-end w-full px-8 absolute top-[10px] right-0 font-bold text-xl tracking-widest text-[#535353] dark:text-[#acacac] z-10">
                    <span className="opacity-70 mr-4">HI {formatScore(highScore)}</span>
                    <span>{formatScore(score)}</span>
                </div>

                <div className="w-full relative mt-16 mb-6">
                    <canvas 
                        ref={canvasRef}
                        width={800} 
                        height={300} 
                        className="w-full h-auto cursor-pointer"
                        onClick={jump}
                    />

                    {/* Minimalist instructions below canvas */}
                    {!gameStarted && !gameOver && (
                        <div className="absolute -bottom-8 left-8 text-[#535353] dark:text-[#acacac] opacity-80 text-lg">
                            Press space to play
                        </div>
                    )}
                </div>
                
                {/* Minimalist toggle copy (aesthetic only) */}
                <div className="mt-4 flex items-center gap-4 text-[#535353] dark:text-[#acacac] opacity-80 font-sans text-sm pb-10">
                    <span>Start slower</span>
                    <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center px-1">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
