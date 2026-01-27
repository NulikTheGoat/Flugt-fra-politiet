export {};

declare global {
  interface Window {
    gameState: any;
    playerCar: any;
    cars?: any;
    sheriffState?: any;
    spawnPoliceCar?: () => any;
    spawnReinforcementUnits?: (...args: any[]) => any;
  }
}
