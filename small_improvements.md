# Small Improvements Checklist

## Completed
- [x] Buying cars should match the color when driving
- [x] Buildings should fall down with physics on chunks
- [x] Shop: cars should look more 3D
- [x] Driving fast should give sparks from behind the car
- [x] Make cars feel fast (FOV changes, screen shake, drift mechanics, tire marks, body lean, speed particles)

## To Do
- [ ] Make the map bigger
- [ ] Tanks can shoot at you - if hit, you get arrested
- [ ] Add gravity to falling objects
- [ ] Rebirth system: new world with new cars and challenges
- [ ] More heat levels (expand beyond 4)
- [ ] Rebirth requirements: complete X heat levels + earn X money
- [ ] Make cars more expensive
- [ ] Reset progress when page refreshes (no persistence)
- [ ] Rebirth resets everything: new world, new cars, new challenges

## Tech / Engine Suggestions
- [ ] Make all movement fully delta-time based (police, projectiles, chunk gravity)
- [ ] Clamp speed bar width to 0–100% (avoid negative UI while reversing)
- [ ] Fix police turning near ±π (normalize angle difference)
- [ ] Reuse geometries/materials for police cars (reduce allocations)
- [ ] Particle optimization: pool meshes or switch to `THREE.Points`/`InstancedMesh`
- [ ] Building chunk optimization: only update/check nearby chunks (simple spatial grid)
