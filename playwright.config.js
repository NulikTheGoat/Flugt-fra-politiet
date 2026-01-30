// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    testMatch: '**/*.spec.js',
    
    // PARALLEL EXECUTION - drastically speeds up tests
    fullyParallel: true,
    workers: process.env.CI ? 4 : 4, // More workers with sharding
    
    // RETRY ONLY FAILED - automatically retry failed tests
    retries: process.env.CI ? 2 : 1,
    
    forbidOnly: !!process.env.CI,
    
    // FASTER REPORTER - minimal output, HTML only on failure
    reporter: [
        ['list', { printSteps: false }],
        ['html', { open: 'never' }]
    ],
    
    // GLOBAL TIMEOUT - more generous for CI
    timeout: 60000, // 60s per test max (CI can be slow)
    expect: {
        timeout: 10000, // 10s for assertions (WebGL init can be slow)
    },
    
    use: {
        baseURL: 'http://localhost:3000',
        
        // PERFORMANCE OPTIMIZATIONS
        headless: true, // Headless is MUCH faster
        video: 'retain-on-failure', // Only save video if test fails
        trace: 'retain-on-failure', // Only save trace if test fails
        screenshot: 'only-on-failure',
        
        // TOLERANT TIMEOUTS FOR CI
        // WebGL and Three.js initialization can be slow on CI runners
        navigationTimeout: 30000,
        actionTimeout: 15000, // Increased for slow CI button clicks
    },
    
    // Start server before tests
    webServer: {
        command: 'DISABLE_MPS=1 PLAYWRIGHT=1 npm start',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI, // Always start fresh server in CI
        timeout: 60000, // 60s for CI server startup (was 10s - too short)
        stdout: 'pipe',
        stderr: 'pipe',
    },
    
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
    ],
});
