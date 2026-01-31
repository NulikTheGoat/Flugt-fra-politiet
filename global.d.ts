export {};

declare module 'cannon-es';
declare module 'three';

declare global {
  interface Window {
    gameState: any;
    camera?: any;
    keys?: any;
    challengerKeys?: any;
    challengerDebug?: {
      position: { x: number; y: number; z: number };
      rotation: { yaw: number; pitch: number };
      isActive: boolean;
      role: string;
      isMultiplayer: boolean;
      testMove: (dir: string) => void;
    };
    playerCar: any;
    cars?: any;
    sheriffState?: any;
    spawnPoliceCar?: () => any;
    spawnReinforcementUnits?: (...args: any[]) => any;
    spawnReinforcementUnitsAt?: (count: number, types: string[], position?: { x: number; z: number }) => any;
    requestReinforcements?: (...args: any[]) => Promise<any> | any;
    resetSheriffState?: () => void;
    SHERIFF_COMMANDS?: Record<string, string>;
    __game?: any;
    // UI functions exposed globally
    switchShopView?: (view: string) => void;
    closeCarDetail?: () => void;
    openCarDetail?: (key: string, car?: any) => void;
    onMultiplayerCarSelected?: (key: string) => void;
    // Vendor-prefixed AudioContext (Safari)
    webkitAudioContext?: typeof AudioContext;
    // Three.js and scene exposure
    scene?: any;
    THREE?: any;
    // Physics initialization flag
    physicsInitialized?: boolean;
    // Debug exposure
    __lastDelta?: number;
  }

  const THREE: typeof import('three');

  namespace THREE {
    class Vector3 {}
    class Color {}
    class Mesh {}
    class Group {}
  }
}
