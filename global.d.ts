export {};

declare module 'cannon-es';

declare global {
  interface Window {
    gameState: any;
    playerCar: any;
    cars?: any;
    sheriffState?: any;
    spawnPoliceCar?: () => any;
    spawnReinforcementUnits?: (...args: any[]) => any;
    requestReinforcements?: (...args: any[]) => Promise<any> | any;
    resetSheriffState?: () => void;
    SHERIFF_COMMANDS?: Record<string, string>;
    __game?: any;
    // UI functions exposed globally
    switchShopView?: (view: string) => void;
    closeCarDetail?: () => void;
    openCarDetail?: (key: string, car?: any) => void;
    onMultiplayerCarSelected?: (key: string) => void;
  }

  const THREE: typeof import('three');

  namespace THREE {
    class Vector3 {}
    class Color {}
    class Mesh {}
    class Group {}
  }
}
