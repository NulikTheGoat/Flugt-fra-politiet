# Cannon.js Adoption Plan

Based on a review of `pmndrs/cannon-es/examples`, here are the recommended improvements for Flugt Fra Politiet.

## 1. Immediate Performance Upgrade: SAPBroadphase
**Source:** `raycast_vehicle.html`, `worker.html`
**Current State:** Uses `NaiveBroadphase` (checks collision between every single pair of bodies: O(N^2)).
**Recommendation:** Switch to `SAPBroadphase` (Sweep and Prune).
**Benefit:** Drastically reduces collision calculations, especially as we add more debris and static buildings. O(N) performance on average.
**Action:** Enable immediately.

## 2. Advanced Vehicle Physics: RaycastVehicle
**Source:** `raycast_vehicle.html`
**Current State:** `KinematicBody`. The car positions are calculated by game logic (`player.js`), and the physics engine is just updated to match.
**Recommendation:** `RaycastVehicle`. Uses a virtual chassis and suspension system.
**Benefit:** 
- Real suspension physics (car leans in turns, bounces on bumps).
- Proper friction/slip (drifting mechanics).
- Engine force vs. Braking force simulation.
**Implementation:** 
- Requires significant refactoring of `player.js`.
- Controls would change from "Move Mesh -> Sync Physics" to "Apply Engine Force -> Sync Mesh".
- Multiplayer/Network logic would need to sync velocities and inputs rather than just positions.

## 3. Parallel Physics: Web Worker
**Source:** `worker.html`
**Current State:** Physics runs in the main thread (`main.js` loop).
**Recommendation:** Move physics `step()` to a background Worker.
**Benefit:** 
- Decouples Physics FPS from Render FPS.
- Prevents physics lag ("slow motion") from dropping valid frame rates.
**Implementation:** High complexity. Requires message passing buffer management.

## 4. Advanced Interaction: Contact Materials
**Source:** `raycast_vehicle.html`
**Current State:** Basic friction defined.
**Recommendation:** Tune `ContactMaterial` for Debris vs Car.
- **Goal:** Allow the car to "plow" through light debris without losing too much momentum, while stopping dead on heavy obstacles.

---

## Proposal
1. **Apply (1) SAPBroadphase** now (Low operational risk, high performance gain).
2. **Setup (2) RaycastVehicle** as a prototype in a separate test scene or toggle (High gameplay value).
