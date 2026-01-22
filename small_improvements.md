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
- [x] Reuse geometries/materials for police cars (reduce allocations)
- [x] Particle optimization: pool meshes or switch to `THREE.Points`/`InstancedMesh`
- [x] Building chunk optimization: only update/check nearby chunks (simple spatial grid)
- [x] Police proximity is too big, the police car should crash to you in order to catch you, currently it catches you when its near (Reduced distance to 30)
- [x] add possiblity to switch to 2d mode, high up in the air, to be able to controll the car watching whole map
- - [x] by pressing 'C'
- [x] add a tank in the shop, that is able to shoot and crash heat level 1 police cars (Press 'F' to shoot when driving Tank)
- [x] crashed deactivated cars should smoke
- [x] the road is still flikering, maybe elevate it a bit, and make thiker
- [x] make wheels move a bit up and down
- [x] implement car health
- [x] every time money increse - make it flash a bit, and animate ( "bigger and then the same size again") to create awareness of earning money, that should add to the retention and gamification feeling
- [x] police catches you if you are driving super slow and its very close to you
- - [x] so the concept is to bring your health down to drive slower to catch you
- [x] various cars should have different level of strength
- [x] police should have HP health - small indicator on top, ofcourse diff heat levels with different HP levels
- [x] police should be able to crash into the player, and that will decrease player health
- [x] police car will stop and smoke if health level is on 0
- [x] police vihechle body is rigid body
- [x] police cars should also stop after game over
- [x] money: player should not get money after game over, antil respawn
- [x] time should stop after game over
- [x] Police should be able to crash into each other
- [x] Player car should be slower and slower according to health
- [x] When police crashes into the player, and if player have slow speed eg under 10% there should start a countdown of the arrest "3 seconds"
- [x] Police should also crash into buildings
- [ ] Enhace the physics and elements to have a rigid body and density
- [x] Car should no be able to drive when HP is below 1
- [x] Car randomly drives left/right when HP is below 30
