// Pure collision resolution logic for World Director objects

export const BONUS1_REWARD = 1000;

export function resolveCollision({ type, config, speed, shieldActive }) {
    const result = {
        despawn: false,
        moneyDelta: 0,
        sfx: null,
        damage: 0,
        breakable: false,
        bonusLabel: null
    };

    if (type === 'ambulance') {
        return {
            ...result,
            despawn: true,
            moneyDelta: BONUS1_REWARD,
            sfx: 'pickup',
            bonusLabel: 'BONUS1'
        };
    }

    if (config?.damage && !shieldActive) {
        result.damage = config.damage;
        result.sfx = 'damage';

        if (config.breakable && speed > 15) {
            result.breakable = true;
        }
    }

    return result;
}