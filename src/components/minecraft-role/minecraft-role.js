import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import Figure from './figure';
import './minecraft-role.css';

const MinecraftRole = () => {
    const canvasRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const [, forceUpdate] = useState();

    const setupScene = useCallback(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const sizes = {
            width: window.innerWidth * 0.3,
            height: window.innerHeight * 0.3
        };

        const renderer = new THREE.WebGLRenderer({ 
            canvas,
            alpha: true
        });
        rendererRef.current = renderer;

        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
        camera.position.z = 20;
        scene.add(camera);
        cameraRef.current = camera;

        const lightAmbient = new THREE.AmbientLight(0x9eaeff, 0.5);
        scene.add(lightAmbient);

        const lightDirectional = new THREE.DirectionalLight(0xffffff, 0.8);
        scene.add(lightDirectional);
        lightDirectional.position.set(5, 5, 5);

        const handleResize = () => {
            sizes.width = window.innerWidth * 0.3;
            sizes.height = window.innerHeight * 0.3;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.render(scene, camera);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const createFigure = useCallback(() => {
        if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;

        // 清除現有的 Figure
        sceneRef.current.children = sceneRef.current.children.filter(child => !(child instanceof THREE.Group));

        const figure = new Figure(sceneRef.current, {
            ry: (30 * Math.PI) / 180
        });
        figure.init();
        figure.group.scale.set(1.2, 1.2, 1.2);

        const center = (group) => {
            new THREE.Box3().setFromObject(group).getCenter(group.position).multiplyScalar(-1);
            sceneRef.current.add(group);
        };

        center(figure.group);

        rendererRef.current.render(sceneRef.current, cameraRef.current);
    }, []);

    useEffect(() => {
        const cleanup = setupScene();
        createFigure();
        return cleanup;
    }, [setupScene, createFigure]);

    const handleRegenerate = () => {
        createFigure();
        forceUpdate({});
    };

    return (
        <div>
            <canvas ref={canvasRef} className="webgl" />
            <button onClick={handleRegenerate} className="regenerateButton">Edit Character</button>
        </div>
    );
};

export default MinecraftRole;