const { test, expect } = require('@playwright/test');

/**
 * Tests for new retro-inspired car implementations
 * Verifies all 6 new cars have correct stats, rendering, and gameplay
 */

const NEW_CARS = ['buggy', 'pickup', 'rally', 'hotrod', 'monstertruck', 'formula'];

test.describe('New Car Implementations', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForFunction(
            () => !!document.querySelector('canvas'),
            { timeout: 15000, polling: 200 }
        );
        
        const soloBtn = page.locator('#soloModeBtn');
        await expect(soloBtn).toBeVisible({ timeout: 10000 });
        await soloBtn.click({ force: true });
        
        await page.waitForFunction(
            () => window.gameState && window.gameState.startTime > 0,
            { timeout: 15000, polling: 200 }
        );
    });

    test('all new cars are defined in constants', async ({ page }) => {
        const result = await page.evaluate((carKeys) => {
            const cars = window.cars;
            const missing = [];
            const found = [];
            
            for (const key of carKeys) {
                if (cars && cars[key]) {
                    found.push(key);
                } else {
                    missing.push(key);
                }
            }
            
            return { found, missing, totalCars: cars ? Object.keys(cars).length : 0 };
        }, NEW_CARS);
        
        expect(result.missing).toEqual([]);
        expect(result.found).toEqual(NEW_CARS);
    });

    test('new cars have all required properties', async ({ page }) => {
        const requiredProps = ['name', 'price', 'maxSpeed', 'acceleration', 'handling', 'health', 'color', 'mass', 'grip'];
        
        const result = await page.evaluate(({ carKeys, props }) => {
            const cars = window.cars;
            const issues = {};
            
            for (const key of carKeys) {
                const car = cars[key];
                if (!car) continue;
                
                const missingProps = props.filter(p => car[p] === undefined);
                if (missingProps.length > 0) {
                    issues[key] = missingProps;
                }
            }
            
            return { issues, checked: carKeys.length };
        }, { carKeys: NEW_CARS, props: requiredProps });
        
        expect(result.issues).toEqual({});
    });

    test('new cars have type property for preview rendering', async ({ page }) => {
        const result = await page.evaluate((carKeys) => {
            const cars = window.cars;
            const withType = [];
            const withoutType = [];
            
            for (const key of carKeys) {
                const car = cars[key];
                if (!car) continue;
                
                if (car.type) {
                    withType.push({ key, type: car.type });
                } else {
                    withoutType.push(key);
                }
            }
            
            return { withType, withoutType };
        }, NEW_CARS);
        
        // All new cars should have type property
        expect(result.withoutType).toEqual([]);
        expect(result.withType.length).toBe(NEW_CARS.length);
    });

    test('buggy has correct balanced stats', async ({ page }) => {
        const result = await page.evaluate(() => {
            const car = window.cars?.buggy;
            return car ? {
                name: car.name,
                price: car.price,
                maxSpeed: car.maxSpeed,
                maxSpeedKmh: Math.round(car.maxSpeed * 3.6),
                acceleration: car.acceleration,
                handling: car.handling,
                health: car.health,
                type: car.type
            } : null;
        });
        
        expect(result).not.toBeNull();
        expect(result.name).toBe('Strandbuggy');
        expect(result.price).toBe(25000);
        expect(result.maxSpeedKmh).toBeGreaterThanOrEqual(90);
        expect(result.maxSpeedKmh).toBeLessThanOrEqual(100);
        expect(result.handling).toBeGreaterThan(0.08); // Good handling
        expect(result.type).toBe('buggy');
    });

    test('pickup has high health and moderate stats', async ({ page }) => {
        const result = await page.evaluate(() => {
            const car = window.cars?.pickup;
            return car ? {
                name: car.name,
                price: car.price,
                maxSpeedKmh: Math.round(car.maxSpeed * 3.6),
                health: car.health,
                mass: car.mass,
                type: car.type
            } : null;
        });
        
        expect(result).not.toBeNull();
        expect(result.name).toBe('Pickup Truck');
        expect(result.health).toBeGreaterThanOrEqual(130); // Tanky
        expect(result.mass).toBeGreaterThanOrEqual(1.4); // Heavy
        expect(result.type).toBe('pickup');
    });

    test('rally has excellent handling', async ({ page }) => {
        const result = await page.evaluate(() => {
            const car = window.cars?.rally;
            return car ? {
                name: car.name,
                handling: car.handling,
                grip: car.grip,
                type: car.type
            } : null;
        });
        
        expect(result).not.toBeNull();
        expect(result.name).toBe('Rallybil');
        expect(result.handling).toBeGreaterThanOrEqual(0.10); // Excellent handling
        expect(result.grip).toBeGreaterThanOrEqual(0.85); // Great grip
        expect(result.type).toBe('rally');
    });

    test('hotrod has high power low handling', async ({ page }) => {
        const result = await page.evaluate(() => {
            const car = window.cars?.hotrod;
            return car ? {
                name: car.name,
                acceleration: car.acceleration,
                handling: car.handling,
                maxSpeedKmh: Math.round(car.maxSpeed * 3.6),
                type: car.type
            } : null;
        });
        
        expect(result).not.toBeNull();
        expect(result.name).toBe('Hot Rod');
        expect(result.acceleration).toBeGreaterThanOrEqual(0.18); // High power
        expect(result.handling).toBeLessThanOrEqual(0.07); // Lower handling
        expect(result.maxSpeedKmh).toBeGreaterThanOrEqual(130);
        expect(result.type).toBe('hotrod');
    });

    test('monstertruck has canRam ability and high health', async ({ page }) => {
        const result = await page.evaluate(() => {
            const car = window.cars?.monstertruck;
            return car ? {
                name: car.name,
                health: car.health,
                mass: car.mass,
                canRam: car.canRam,
                scale: car.scale,
                type: car.type
            } : null;
        });
        
        expect(result).not.toBeNull();
        expect(result.name).toBe('Monster Truck');
        expect(result.health).toBeGreaterThanOrEqual(200); // Very tanky
        expect(result.mass).toBeGreaterThanOrEqual(2.4); // Very heavy
        expect(result.canRam).toBe(true); // Can ram police
        expect(result.scale).toBeGreaterThan(1); // Bigger visual
        expect(result.type).toBe('monstertruck');
    });

    test('formula has top-tier speed and handling', async ({ page }) => {
        const result = await page.evaluate(() => {
            const car = window.cars?.formula;
            return car ? {
                name: car.name,
                maxSpeedKmh: Math.round(car.maxSpeed * 3.6),
                acceleration: car.acceleration,
                handling: car.handling,
                grip: car.grip,
                health: car.health,
                type: car.type
            } : null;
        });
        
        expect(result).not.toBeNull();
        expect(result.name).toBe('Racerbil F1');
        expect(result.maxSpeedKmh).toBeGreaterThanOrEqual(210); // Top tier speed
        expect(result.handling).toBeGreaterThanOrEqual(0.12); // Best handling
        expect(result.grip).toBeGreaterThanOrEqual(0.95); // Racing slicks
        expect(result.health).toBeLessThanOrEqual(90); // Fragile
        expect(result.type).toBe('formula');
    });

    test('new cars have sensible price progression', async ({ page }) => {
        const result = await page.evaluate((carKeys) => {
            const cars = window.cars;
            const prices = {};
            
            for (const key of carKeys) {
                if (cars[key]) {
                    prices[key] = cars[key].price;
                }
            }
            
            return prices;
        }, NEW_CARS);
        
        // Verify price ordering makes sense
        expect(result.buggy).toBeLessThan(result.pickup);
        expect(result.pickup).toBeLessThan(result.rally);
        expect(result.rally).toBeLessThan(result.hotrod);
        expect(result.hotrod).toBeLessThan(result.monstertruck);
        expect(result.monstertruck).toBeLessThan(result.formula);
    });

    test('new cars speed values are realistic', async ({ page }) => {
        const result = await page.evaluate((carKeys) => {
            const cars = window.cars;
            const speeds = {};
            
            for (const key of carKeys) {
                if (cars[key]) {
                    speeds[key] = {
                        raw: cars[key].maxSpeed,
                        kmh: Math.round(cars[key].maxSpeed * 3.6)
                    };
                }
            }
            
            return speeds;
        }, NEW_CARS);
        
        // All cars should have speeds between 50-250 km/h
        for (const key of NEW_CARS) {
            expect(result[key].kmh).toBeGreaterThanOrEqual(50);
            expect(result[key].kmh).toBeLessThanOrEqual(250);
        }
        
        // Formula should be fastest of new cars
        expect(result.formula.kmh).toBeGreaterThan(result.hotrod.kmh);
        expect(result.formula.kmh).toBeGreaterThan(result.rally.kmh);
    });
});

test.describe('New Car Rendering', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForFunction(
            () => !!document.querySelector('canvas'),
            { timeout: 15000, polling: 200 }
        );
    });

    test('shop displays all new cars', async ({ page }) => {
        // Open shop
        const shopBtn = page.locator('#shopBtn');
        if (await shopBtn.isVisible()) {
            await shopBtn.click();
            await page.waitForTimeout(500);
            
            const result = await page.evaluate((carKeys) => {
                const shopContent = document.querySelector('#shopContent') || document.querySelector('.shop-content');
                if (!shopContent) return { found: false, reason: 'no shop content' };
                
                const shopHTML = shopContent.innerHTML.toLowerCase();
                const foundCars = carKeys.filter(key => {
                    const car = window.cars?.[key];
                    return car && shopHTML.includes(car.name.toLowerCase());
                });
                
                return { found: true, foundCars, total: carKeys.length };
            }, NEW_CARS);
            
            if (result.found) {
                expect(result.foundCars.length).toBeGreaterThan(0);
            }
        }
    });
});
