"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const SPRITES: Record<string, string[]> = {
    dinoRun1: [
        "           XXXXXXXX ",
        "           XXXXXXXXX",
        "           XXXX     ",
        "           XXXXXXX  ",
        "           XXXXX    ",
        "           XXXX     ",
        " X        XXXXX     ",
        " XX      XXXXXX     ",
        " XXX    XXXXXXX     ",
        " XXX   XXXXXXXX     ",
        " XXXXXXXXXXXXXX     ",
        " XXXXXXXXXXXXXX     ",
        "  XXXXXXXXXXXX      ",
        "   XXXXXXXXXX       ",
        "    XXXXXXXX        ",
        "     XXXXXX         ",
        "     X    X         ",
        "     XX   XX        ",
        "     X    X         "
    ],
    dinoRun2: [
        "           XXXXXXXX ",
        "           XXXXXXXXX",
        "           XXXX     ",
        "           XXXXXXX  ",
        "           XXXXX    ",
        "           XXXX     ",
        " X        XXXXX     ",
        " XX      XXXXXX     ",
        " XXX    XXXXXXX     ",
        " XXX   XXXXXXXX     ",
        " XXXXXXXXXXXXXX     ",
        " XXXXXXXXXXXXXX     ",
        "  XXXXXXXXXXXX      ",
        "   XXXXXXXXXX       ",
        "    XXXXXXXX        ",
        "     XXXXXX         ",
        "     X    X         ",
        "          XX        ",
        "          X         "
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
        " X                  ",
        " XX      XXXXXXXX   ",
        " XXX    XXXXXXXXX   ",
        " XXX   XXXXXX       ",
        " XXXXXXXXXXXXXXXX   ",
        " XXXXXXXXXXXXXXXX   ",
        "  XXXXXXXXXXXX      ",
        "   XXXXXXXXXX       ",
        "    XXXXXXXX        ",
        "     XXXXXX         ",
        "     X    X         ",
        "     XX   XX        "
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
        " X                  ",
        " XX      XXXXXXXX   ",
        " XXX    XXXXXXXXX   ",
        " XXX   XXXXXX       ",
        " XXXXXXXXXXXXXXXX   ",
        " XXXXXXXXXXXXXXXX   ",
        "  XXXXXXXXXXXX      ",
        "   XXXXXXXXXX       ",
        "    XXXXXXXX        ",
        "     XXXXXX         ",
        "     X              ",
        "     XX             "
    ],
    cactusSmall: [
        "  X  ",
        "  X  ",
        "X X  ",
        "X X X",
        "XXX X",
        "  X X",
        "  XXX",
        "  X  ",
        "  X  ",
        "  X  "
    ],
    cactusLarge: [
        "   X   ",
        "   X   ",
        "   X   ",
        " X X   ",
        " X X X ",
        " X X X ",
        " X X X ",
        " XXX X ",
        "   X X ",
        "   XXX ",
        "   X   ",
        "   X   ",
        "   X   ",
        "   X   "
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
    birdHeightOffset?: number; // 0, 1, or 2 for high, medium, low
};

export default function DinoGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);
    
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    // Needed to force a re-render from inside RAF when game over triggers
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
        isStarted: false
    });

    const resetGame = () => {
        gameState.current = {
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

        const loop = () => {
            const state = gameState.current;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Ground
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, GROUND_Y, canvas.width, 3);

            // Cloud dots
            ctx.fillStyle = '#cccccc';
            for (let i = 0; i < 5; i++) {
                const cloudX = ((state.frameCount * 2 + i * 200) % (canvas.width + 100)) - 50;
                ctx.fillRect(canvas.width - cloudX, 50 + (i * 20) % 50, 20, 5);
            }

            if (!state.isStarted) {
                drawSprite(ctx, SPRITES.dinoRun1, state.dino.x, GROUND_Y - getSpriteDimensions(SPRITES.dinoRun1, PIXEL_SCALE).height, PIXEL_SCALE, '#000000');
                ctx.fillStyle = '#000000';
                ctx.font = '24px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('PRESS SPACE TO START', canvas.width / 2, canvas.height / 2 - 20);
                requestRef.current = requestAnimationFrame(loop);
                return;
            }

            if (state.isGameOver) {
                // Determine collision sprite
                const spriteStr = state.dino.isDucking ? SPRITES.dinoDuck1 : Math.round(state.dino.y) < GROUND_Y - 57 ? SPRITES.dinoRun1 : SPRITES.dinoRun2;
                drawSprite(ctx, spriteStr, state.dino.x, state.dino.y, PIXEL_SCALE, '#000000');
                
                state.obstacles.forEach(obs => {
                    const objSprite = obs.type === 'bird' ? SPRITES.bird1 : (obs.type === 'cactusLarge' ? SPRITES.cactusLarge : SPRITES.cactusSmall);
                    drawSprite(ctx, objSprite, obs.x, obs.y, PIXEL_SCALE, '#00e936');
                });
                
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

            // Floor collision
            if (state.dino.y >= GROUND_Y - currentHeight) {
                state.dino.y = GROUND_Y - currentHeight;
                state.dino.dy = 0;
                state.dino.isJumping = false;
            }

            // Spawn obstacles
            if (state.frameCount % Math.floor(Math.random() * 50 + 60) === 0) {
                const types: Array<'cactusSmall' | 'cactusLarge' | 'bird'> = ['cactusSmall', 'cactusLarge'];
                if (state.score > 200) types.push('bird'); // Birds appear later
                
                const type = types[Math.floor(Math.random() * types.length)];
                const spriteDim = getSpriteDimensions(
                    type === 'bird' ? SPRITES.bird1 : (type === 'cactusLarge' ? SPRITES.cactusLarge : SPRITES.cactusSmall), 
                    PIXEL_SCALE
                );

                let yPos = GROUND_Y - spriteDim.height;
                let birdHeightOffset = 0;

                if (type === 'bird') {
                    birdHeightOffset = Math.floor(Math.random() * 3); 
                    // 0: high (can run under), 1: medium (must duck), 2: low (must jump)
                    if (birdHeightOffset === 0) yPos = GROUND_Y - 90;
                    if (birdHeightOffset === 1) yPos = GROUND_Y - 65;
                    if (birdHeightOffset === 2) yPos = GROUND_Y - 30;
                }

                // Make sure we don't spawn them too close together
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

            // Update obstacles
            for (let i = 0; i < state.obstacles.length; i++) {
                const obs = state.obstacles[i];
                obs.x -= obs.speed;

                // Collision Detection (AABB with slightly forgiving hitboxes)
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

            if (state.frameCount % 400 === 0) {
                state.speed += 0.5;
            }

            // Draw Dino
            let dinoSprite;
            if (state.dino.isJumping) {
                dinoSprite = SPRITES.dinoRun1; // Static jump frame
            } else if (state.dino.isDucking) {
                dinoSprite = Math.floor(state.frameCount / 6) % 2 === 0 ? SPRITES.dinoDuck1 : SPRITES.dinoDuck2;
            } else {
                dinoSprite = Math.floor(state.frameCount / 6) % 2 === 0 ? SPRITES.dinoRun1 : SPRITES.dinoRun2;
            }
            drawSprite(ctx, dinoSprite, state.dino.x, state.dino.y, PIXEL_SCALE, '#000000');
            
            // Draw Obstacles
            state.obstacles.forEach(obs => {
                let obsSprite;
                if (obs.type === 'bird') {
                    obsSprite = Math.floor(state.frameCount / 8) % 2 === 0 ? SPRITES.bird1 : SPRITES.bird2;
                } else if (obs.type === 'cactusLarge') {
                    obsSprite = SPRITES.cactusLarge;
                } else {
                    obsSprite = SPRITES.cactusSmall;
                }
                drawSprite(ctx, obsSprite, obs.x, obs.y, PIXEL_SCALE, '#00e936');
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

    return (
        <div className="min-h-screen bg-[#f0f0f0] dark:bg-[#111] flex flex-col items-center justify-center p-4 selection:bg-[#e9ff00] selection:text-black font-mono">
            <Link href="/#projects" className="absolute top-8 left-8 flex items-center gap-2 font-black uppercase text-xl border-[4px] border-black dark:border-white px-4 py-2 bg-white dark:bg-black shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all z-10 text-black dark:text-white">
                <ArrowLeft strokeWidth={3} /> BACK
            </Link>

            <div className="w-full max-w-4xl bg-white dark:bg-black border-[6px] border-black dark:border-white p-8 shadow-[16px_16px_0_0_#00e936] dark:shadow-[16px_16px_0_0_#e9ff00] flex flex-col items-center relative gap-8">
                
                <div className="flex justify-between w-full font-black text-2xl md:text-3xl uppercase tracking-widest text-black dark:text-white">
                    <div>HI-SCORE: <span className="text-[#00e936]">{highScore.toString().padStart(5, '0')}</span></div>
                    <div className="text-[#e9ff00] drop-shadow-[2px_2px_0_#000]">{score.toString().padStart(5, '0')}</div>
                </div>

                <div className="w-full relative shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff]">
                    <canvas 
                        ref={canvasRef}
                        width={800} 
                        height={300} 
                        className="w-full h-auto border-[4px] border-black bg-white cursor-pointer"
                        onClick={jump}
                    />

                    {gameOver && (
                        <div className="absolute inset-0 z-10 bg-black/80 flex flex-col items-center justify-center gap-6">
                            <h2 className="text-5xl md:text-7xl font-black text-[#e9ff00] uppercase tracking-tighter drop-shadow-[4px_4px_0_#000]">
                                GAME OVER
                            </h2>
                            <button 
                                onClick={(e) => { e.stopPropagation(); resetGame(); }}
                                className="bg-[#00e936] text-black font-black uppercase tracking-widest text-2xl px-8 py-4 border-[4px] border-black shadow-[6px_6px_0_0_#e9ff00] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                            >
                                RESTART
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="mt-8 font-bold text-center uppercase tracking-widest opacity-50 dark:text-white leading-relaxed">
                PRESS <span className="text-black bg-[#e9ff00] px-2 py-1 border-[2px] border-black">SPACE</span> TO JUMP <br/>
                PRESS <span className="text-black bg-[#00e936] px-2 py-1 border-[2px] border-black">DOWN</span> TO DUCK
            </div>
        </div>
    );
}
