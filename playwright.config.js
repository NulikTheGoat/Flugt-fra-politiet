// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    testMatch: '**/*.spec.js',
    
    // PARALLEL EXECUTION - drastically speeds up tests
    fullyParallel: true,
    workers: process.env.CI ? 2 : 4, // 4 parallel workers locally
    
    // RETRY ONLY FAILED - automatically retry failed tests
    retries: process.env.CI ? 2 : 1,
    
    forbidOnly: !!process.env.CI,
    
    // FASTER REPORTER - minimal output, HTML only on failure
    reporter: [
        ['list', { printSteps: false }],
        ['html', { open: 'never' }]
    ],
    
    // GLOBAL TIMEOUT - fail fast
    timeout: 30000, // 30s per test max
    expect: {
        timeout: 5000, // 5s for assertions
    },
    
    use: {
        baseURL: 'http://localhost:3000',
        
        // PERFORMANCE OPTIMIZATIONS
        headless: true, // Headless is MUCH faster
        video: 'retain-on-failure', // Only save video if test fails
        trace: 'retain-on-failure', // Only save trace if test fails
        screenshot: 'only-on-failure',
        
        // FASTER PAGE LOADS
        navigationTimeout: 10000,
        actionTimeout: 5000,
    },
    
    // Start server before tests
    webServer: {
        command: 'npm start',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
        timeout: 10000,
    },
    
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
    ],
});
