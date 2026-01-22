# Small Improvements Checklist

## Completed
- [x] Buying cars should match the color when driving
- [x] Buildings should fall down with physics on chunks
- [x] Shop: cars should look more 3D
- [x] Driving fast should give sparks from behind the car
- [x] Make cars feel fast (FOV changes, screen shake, drift mechanics, tire marks, body lean, speed particles)

## To Do
- [x] Make the map bigger
- [x] Tanks can shoot at you - if hit, you get arrested
- [x] Add gravity to falling objects
- [x] Rebirth system: new world with new cars and challenges
- [x] More heat levels (expand beyond 4) - now 6 levels
- [x] Rebirth requirements: complete X heat levels + earn X money
- [x] Make cars more expensive
- [x] Reset progress when page refreshes (no persistence)
- [x] Rebirth resets everything: new world, new cars, new challenges

## Tech / Engine Suggestions
- [x] Make all movement fully delta-time based (police, projectiles, chunk gravity)
- [x] Clamp speed bar width to 0–100% (avoid negative UI while reversing)
- [x] Fix police turning near ±π (normalize angle difference)
- [ ] Reuse geometries/materials for police cars (reduce allocations)
- [ ] Particle optimization: pool meshes or switch to `THREE.Points`/`InstancedMesh`
- [ ] Building chunk optimization: only update/check nearby chunks (simple spatial grid)
- [x] Police proximity is too big, the police car should crash to you in order to catch you, currently it catches you when its near (Reduced distance to 30)
- [x] add possiblity to switch to 2d mode, high up in the air, to be able to controll the car watching whole map
- - [x] by pressing 'C'
- [x] add a tank in the shop, that is able to shoot and crash heat level 1 police cars (Press 'F' to shoot when driving Tank)
- [x] crashed deactivated cars should smoke
- [x] the road is still flikering, maybe elevate it a bit, and make thiker
- [x] make wheels move a bit up and down
- [x] implement car health
- [ ] every time money increse - make it flash a bit, and animate ( "bigger and then the same size again") to create awareness of earning money, that should add to the retention and gamification feeling
- - [ ] search couple of articles about this and implement best practices
