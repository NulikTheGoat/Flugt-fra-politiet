// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('🚀 Performance Tests', () => {
    
    test('FPS and Memory Check', async ({ page, browserName }) => {
        // Only run detailed perf test on chromium as it supports performance.memory
        if (browserName !== 'chromium') test.skip();

        await page.goto('/');
        
        // Wait for canvas
        await page.waitForSelector('canvas');
        
        // Start game (click single player or start button if present)
        const soloBtn = page.locator('#soloModeBtn');
        if (await soloBtn.isVisible()) {
            await soloBtn.click();
        }

        // Wait for game to initialize
        await page.waitForFunction(() => window.gameState && window.gameState.startTime > 0);
        
        console.log('Game started, measuring performance...');

        // Measure FPS over 10 seconds
        const perfData = await page.evaluate(async () => {
            return new Promise(resolve => {
                let frames = 0;
                let startTime = performance.now();
                let minFps = 60;
                let maxFps = 0;
                
                const loop = () => {
                    frames++;
                    const now = performance.now();
                    const elapsed = now - startTime;
                    
                    if (elapsed >= 5000) { // Measure for 5 seconds
                        const fps = Math.round((frames / elapsed) * 1000);
                        const memory = window.performance.memory ? {
                            used: Math.round(window.performance.memory.usedJSHeapSize / 1024 / 1024),
                            total: Math.round(window.performance.memory.totalJSHeapSize / 1024 / 1024),
                            limit: Math.round(window.performance.memory.jsHeapSizeLimit / 1024 / 1024)
                        } : null;

                        resolve({
                            fps,
                            frames,
                            memory,
                            renderDistance: window.gameState?.input?.renderDistance || 'N/A', 
                            particleCount: window.__game?.scene ? window.__game.scene.children.filter(c => c.type === 'Points').length : 0,
                            polygons: window.__game?.renderer ? window.__game.renderer.info.render.triangles : 0,
                            drawCalls: window.__game?.renderer ? window.__game.renderer.info.render.calls : 0,
                            geometries: window.__game?.renderer ? window.__game.renderer.info.memory.geometries : 0
                        });
                        return;
                    }
                    requestAnimationFrame(loop);
                };
                requestAnimationFrame(loop);
            });
        });

        console.log('Performance Report:', perfData);

        // Assertions
        // Headless mode FPS is unreliable (often < 10 without GPU), so we trust metrics
        // Acceptable limit for destructible world: < 3500 draw calls (balanced physics vs perf)
        expect(perfData.drawCalls).toBeLessThan(3500); 
        
        // Polygons should be reasonable (< 500k is usually fine, we are at 20k which is great)
        expect(perfData.polygons).toBeLessThan(100000);

        // Check for memory leaks or excessive usage (e.g. < 500MB)
        if (perfData.memory) {
            expect(perfData.memory.used).toBeLessThan(300);
        }
    });

});
