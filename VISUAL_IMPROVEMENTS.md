# Visual Improvements Documentation

This document describes the visual enhancements made to the Flugt fra Politiet game to improve graphics quality while maintaining performance and compatibility.

## Overview

The game's visual rendering has been upgraded from basic Lambert/Phong materials to Physically-Based Rendering (PBR) materials, along with improved lighting and texture systems. These changes provide a more realistic and modern look without changing gameplay mechanics.

## Technology Stack

### Rendering Engine
- **Three.js r128**: Maintained for compatibility, now bundled locally
- **Material System**: Upgraded to MeshStandardMaterial (PBR)
- **Lighting**: Enhanced with hemisphere light and improved shadows
- **Tone Mapping**: ACES Filmic for cinematic look

### Why These Technologies?

**MeshStandardMaterial (PBR)**
- Industry-standard physically-based rendering
- More realistic light interaction
- Better material definition with roughness and metalness
- Compatible with Three.js r128

**Improved Lighting System**
- PCFSoft shadow mapping for softer, more realistic shadows
- Hemisphere light simulates natural sky/ground ambient lighting
- Higher shadow map resolution (2048x2048) for sharper shadows
- Reduced ambient light for better contrast and depth

## Visual Enhancements

### 1. Building Facades

#### Before
- Basic 64x64 pixel window textures
- Simple on/off window lighting
- Flat appearance
- Limited variety

#### After
- **Higher Resolution**: 128x128 pixel textures
- **Varied Lighting**: Three types of window lights (warm white, yellow, orange)
- **Architectural Details**: 
  - Window frames
  - Twin window design with dividers
  - Window reflections
  - Blinds/curtains in some windows
  - Subtle concrete texture on building walls
- **Variety**: Some windows dark or missing for realism
- **Better Materials**: MeshStandardMaterial with roughness 0.7-0.8

### 2. Vehicles

#### Cars (Standard, Sport, Muscle, Super, Hyper)
- **Body**: MeshStandardMaterial with roughness 0.4, metalness 0.6
- **Roof**: Slightly darker with roughness 0.5, metalness 0.4
- **Windows**: Enhanced transparency and reflectivity
- **Paint Effect**: Metallic finish that reflects environment

#### UFO
- **Saucer**: High metalness (0.9) for alien metal look
- **Dome**: Improved transparency with subtle glow
- **Emissive Glow**: Subtle emissive effect for sci-fi appearance

#### Tank
- Maintained rugged appearance with appropriate materials

### 3. Character Models

#### On-Foot Character
- **Clothing**: Roughness 0.8 for fabric appearance
- **Skin**: Roughness 0.7 for realistic skin texture
- **Shoes**: Slight metalness (0.1) for leather/rubber look

#### Bicycle
- **Frame**: Metalness 0.6 for metal tubing
- **Rubber Parts**: High roughness (0.9) for matte rubber
- **Metal Components**: Roughness 0.4, metalness 0.8

#### Scooter/Moped
- **Body**: Roughness 0.6, metalness 0.5 for painted metal
- **Chrome Parts**: Roughness 0.4, metalness 0.8
- **Trim**: Appropriate roughness for plastic/rubber parts

### 4. Lighting & Rendering

#### Shadow System
- **Type**: Upgraded from BasicShadowMap to PCFSoftShadowMap
- **Resolution**: Increased from 1024x1024 to 2048x2048
- **Bias**: Reduced shadow acne with bias -0.0001
- **Result**: Softer, more realistic shadows

#### Ambient Lighting
- **Ambient Light**: Reduced from 0.6 to 0.4 intensity for better contrast
- **Directional Light**: Increased from 0.8 to 1.0 for stronger sunlight
- **Hemisphere Light**: Added (intensity 0.3) for sky/ground ambient

#### Post-Processing
- **Antialiasing**: Enabled for smoother edges
- **Tone Mapping**: ACES Filmic for cinematic look
- **Color Space**: Proper sRGB encoding (when supported)
- **Exposure**: 1.0 for balanced brightness

### 5. Special Effects

#### Coins
- **Emissive Glow**: Added slight glow effect
- **Metallic**: High metalness (0.8) for gold appearance
- **Roughness**: 0.3 for polished metal look

#### Police Vehicles
- Enhanced materials matching player vehicle improvements
- Better metallic/painted appearance

## Performance Considerations

### Optimization Strategies
1. **Shared Geometries**: All vehicles use shared geometry instances
2. **Material Instances**: Materials created once and reused
3. **Selective Updates**: Only dynamic objects update per frame
4. **LOD Ready**: System supports future Level of Detail additions

### Performance Impact
- **Shadow Maps**: Higher resolution has minimal impact on modern GPUs
- **PBR Materials**: Slight increase in shader complexity, negligible on target hardware
- **Antialiasing**: Built-in MSAA with minimal overhead
- **Overall**: Frame rate remains stable with visual improvements

## Browser Compatibility

### Tested Browsers
- ✅ Chrome/Edge (Chromium-based)
- ✅ Firefox
- ✅ Safari (WebKit)

### WebGL Support
- Requires WebGL 1.0 minimum
- Automatically falls back to software rendering if needed
- All features compatible with Three.js r128

## Future Enhancement Possibilities

### Additional Improvements (Not Yet Implemented)
1. **Environment Maps**: Add reflections of sky/city in metallic surfaces
2. **Normal Maps**: Add surface detail without extra geometry
3. **Bloom Effect**: Glow effect for lights and bright objects
4. **SSAO**: Screen-space ambient occlusion for depth
5. **Particle System**: Enhanced smoke, spark, and explosion effects
6. **Weather Effects**: Rain, fog variations
7. **Day/Night Cycle**: Dynamic lighting changes

### Why Not Implement These Now?
- Maintain simplicity and performance
- Preserve Three.js r128 compatibility
- Avoid scope creep
- These can be added incrementally

## Technical Notes

### Material Properties Explained

**Roughness** (0.0 - 1.0)
- 0.0 = Mirror-smooth (perfect reflection)
- 0.5 = Moderate surface texture
- 1.0 = Completely diffuse (matte)

**Metalness** (0.0 - 1.0)
- 0.0 = Dielectric (non-metal) like plastic, wood, fabric
- 1.0 = Metal (conductor) like steel, gold, aluminum
- Affects how material reflects light and color

**Emissive**
- Allows materials to appear self-lit
- Doesn't actually emit light (use for effect only)
- Good for glowing elements, screens, lights

### Color Space Handling

The renderer uses sRGB encoding when supported:
```javascript
if (renderer.outputEncoding !== undefined) {
    renderer.outputEncoding = THREE.sRGBEncoding;
}
```

This ensures colors appear correctly across different displays.

## References

### Three.js Documentation
- [MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)
- [PBR Theory](https://threejs.org/examples/#webgl_materials_physical_reflectivity)
- [Shadow Mapping](https://threejs.org/docs/#api/en/lights/shadows/LightShadow)

### PBR Resources
- [PBR Guide by Google](https://google.github.io/filament/Filament.md.html)
- [Marmoset PBR Theory](https://marmoset.co/posts/basic-theory-of-physically-based-rendering/)

## Changelog

### 2026-01-25 - Initial Visual Upgrade
- ✅ Upgraded materials to MeshStandardMaterial
- ✅ Enhanced building window textures
- ✅ Improved lighting system
- ✅ Added tone mapping and antialiasing
- ✅ Bundled Three.js locally
- ✅ Enhanced character and vehicle materials
- ✅ Improved shadow quality

## Credits

Visual improvements maintain the original game's aesthetic while bringing modern rendering techniques. All changes respect the existing codebase structure and game design philosophy.
