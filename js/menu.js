// MENU.JS - Handles Main Menu, Lobby, and UI Interaction logic
import { gameState } from './state.js';
import * as Network from './network.js';
import { DOM, goToShop, setMultiplayerShopCallback } from './ui.js';
import { gameConfig } from './config.js';

// DOM Elements
const multiplayerLobby = document.getElementById('multiplayerLobby');
const lobbyCloseBtn = document.getElementById('lobbyCloseBtn');
const joinGameBtn = document.getElementById('joinGameBtn');
const playerNameInput = document.getElementById('playerNameInput');
const lobbyError = document.getElementById('lobbyError');
const lobbyConnect = document.getElementById('lobbyConnect');
const lobbyRoom = document.getElementById('lobbyRoom');
const displayRoomCode = document.getElementById('displayRoomCode');
const playersList = document.getElementById('playersList');
const playerCount = document.getElementById('playerCount');
const hostControls = document.getElementById('hostControls');
const waitingMessage = document.getElementById('waitingMessage');
const startMultiplayerBtn = document.getElementById('startMultiplayerBtn');
const hostTouchArrest = document.getElementById('hostTouchArrest');
const hostDropInEnabled = document.getElementById('hostDropInEnabled');
const gameOverRejoinBtn = document.getElementById('gameOverRejoinBtn');
const gameOverMpShopBtn = document.getElementById('gameOverMpShopBtn');

// Game Mode Modal elements
const gameModeModal = document.getElementById('gameModeModal');
const soloModeBtn = document.getElementById('soloModeBtn');
const multiplayerModeBtn = document.getElementById('multiplayerModeBtn');
const menuShopBtn = document.getElementById('menuShopBtn');

// Server Discovery Elements
const serverDiscovery = document.getElementById('serverDiscovery');
const scanningStatus = document.getElementById('scanningStatus');
const discoveredServers = document.getElementById('discoveredServers');
const noServersFound = document.getElementById('noServersFound');
const serverList = document.getElementById('serverList');
const selectedServerInfo = document.getElementById('selectedServerInfo');
const backToServersBtn = document.getElementById('backToServersBtn');
const rescanBtn = document.getElementById('rescanBtn');
const rescanBtnEmpty = document.getElementById('rescanBtnEmpty');
const hostOwnServerBtn = document.getElementById('hostOwnServerBtn');


// === Helper Functions ===

async function showServerDiscovery() {
    // Show only server discovery
    if (serverDiscovery) serverDiscovery.style.display = 'block';
    if (lobbyConnect) lobbyConnect.style.display = 'none';
    if (lobbyRoom) lobbyRoom.style.display = 'none';
    if (scanningStatus) scanningStatus.style.display = 'block';
    if (discoveredServers) discoveredServers.style.display = 'none';
    if (noServersFound) noServersFound.style.display = 'none';
    
    // Scan for servers
    const servers = await Network.scanForServers();
    
    if (scanningStatus) scanningStatus.style.display = 'none';
    
    if (servers.length > 0) {
        if (discoveredServers) discoveredServers.style.display = 'block';
        if (serverList) {
            serverList.innerHTML = servers.map(server => `
                <div class="server-card ${server.gameStarted ? 'in-game' : ''}" data-ip="${server.ip}" data-players="${server.players}">
                    <div class="server-name">🖥️ ${server.ip === 'localhost' ? 'Lokal Server' : server.ip}</div>
                    <span class="server-players">
                        ${server.gameStarted ? '🎮 I gang - ' : '⏳ Venter - '}${server.players}/${server.maxPlayers} spillere
                    </span>
                </div>
            `).join('');
            
            // Click handler for server cards
            serverList.querySelectorAll('.server-card').forEach(card => {
                card.addEventListener('click', () => {
                    selectServer(card.dataset.ip, card.dataset.players);
                });
            });
        }
    } else {
        if (noServersFound) noServersFound.style.display = 'block';
    }
}

function selectServer(ip, playerCount) {
    Network.setServerHost(ip);
    
    // Hide discovery, show connect form
    if (serverDiscovery) serverDiscovery.style.display = 'none';
    if (lobbyConnect) lobbyConnect.style.display = 'block';
    
    // Show which server we're connecting to
    if (selectedServerInfo) {
        selectedServerInfo.textContent = `🖥️ Server: ${ip} (${playerCount} spillere online)`;
    }
    
    // Focus name input
    const nameInput = document.getElementById('playerNameInput');
    if (nameInput) nameInput.focus();
}

/**
 * Initialize Menu Event Listeners
 * @param {Object} callbacks
 * @param {Function} callbacks.startGame - Function to start single player game
 * @param {Function} callbacks.cleanupGame - Function to stop/cleanup current game (for Escape key)
 */
export function initMenu({ startGame, cleanupGame }) {
    
    // UI Event Listeners - Show game mode selection when clicking Play
    if (DOM.playBtn) {
        DOM.playBtn.addEventListener('click', () => {
            // If already in multiplayer, respawn with selected car
            if (gameState.isMultiplayer && Network.isConnectedToServer()) {
                DOM.shop.style.display = 'none';
                Network.requestRespawnWithCar(gameState.selectedCar);
                return;
            }
            
            // Otherwise show game mode selection
            if(gameModeModal) gameModeModal.style.display = 'flex';
        });
    }

    // Solo mode - just start the game
    if (soloModeBtn) {
        soloModeBtn.addEventListener('click', () => {
            if(gameModeModal) gameModeModal.style.display = 'none';
            startGame();
        });
    }

    // Shop button from menu
    if (menuShopBtn) {
        menuShopBtn.addEventListener('click', () => {
            if(gameModeModal) gameModeModal.style.display = 'none';
            goToShop(false); // Not multiplayer respawn mode
        });
    }

    // Multiplayer - scan for servers then show lobby
    if (multiplayerModeBtn) {
        multiplayerModeBtn.addEventListener('click', async () => {
            if(gameModeModal) gameModeModal.style.display = 'none';
            if(multiplayerLobby) multiplayerLobby.style.display = 'flex';
            if(lobbyError) lobbyError.textContent = '';
            
            // Reset to server discovery view
            showServerDiscovery();
        });
    }

    // Back to server list button & Rescan buttons
    if (backToServersBtn) {
        backToServersBtn.addEventListener('click', () => {
            Network.disconnect();
            showServerDiscovery();
        });
    }
    if (rescanBtn) rescanBtn.addEventListener('click', showServerDiscovery);
    if (rescanBtnEmpty) rescanBtnEmpty.addEventListener('click', showServerDiscovery);
    
    if (hostOwnServerBtn) {
        hostOwnServerBtn.addEventListener('click', () => {
            selectServer('localhost', '?');
        });
    }

    // Load saved player name
    const savedName = localStorage.getItem('playerName');
    if (savedName && playerNameInput) {
        playerNameInput.value = savedName;
    }

    if (DOM.gameOverShopBtn) {
        DOM.gameOverShopBtn.addEventListener('click', () => {
            // If in multiplayer, disconnect first
            if (gameState.isMultiplayer) {
                Network.disconnect();
                gameState.isMultiplayer = false;
            }
            goToShop();
            // Show game mode selection after going to shop
            if(gameModeModal) gameModeModal.style.display = 'flex';
        });
    }

    // Rejoin button for multiplayer
    if (gameOverRejoinBtn) {
        gameOverRejoinBtn.addEventListener('click', () => {
            Network.requestRespawn();
        });
    }

    // Multiplayer shop button - buy car and drop back in
    if (gameOverMpShopBtn) {
        gameOverMpShopBtn.addEventListener('click', () => {
            DOM.gameOver.style.display = 'none';
            goToShop(true); // true = multiplayer respawn mode
        });
    }

    // Set up multiplayer shop callback - when a car is selected in MP shop mode
    setMultiplayerShopCallback((carKey) => {
        console.log('Multiplayer shop: selected car', carKey);
        
        // Hide shop
        DOM.shop.style.display = 'none';
        
        // Request respawn with new car
        Network.requestRespawnWithCar(carKey);
    });

    // Close game mode modal when clicking outside
    if (gameModeModal) {
        gameModeModal.addEventListener('click', (e) => {
            if (e.target === gameModeModal) {
                gameModeModal.style.display = 'none';
            }
        });
    }

    // Escape key - return to menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // If game mode modal is open, close it
            if (gameModeModal && gameModeModal.style.display === 'flex') {
                gameModeModal.style.display = 'none';
                return;
            }
            
            // If multiplayer lobby is open, close it
            if (multiplayerLobby && multiplayerLobby.style.display === 'flex') {
                multiplayerLobby.style.display = 'none';
                Network.disconnect();
                return;
            }
            
            // If shop is open, close it and show menu
            if (DOM.shop && DOM.shop.style.display === 'flex') {
                DOM.shop.style.display = 'none';
                if(gameModeModal) gameModeModal.style.display = 'flex';
                return;
            }
            
            // If game over screen is showing, go to menu
            if (DOM.gameOver && DOM.gameOver.style.display === 'block') {
                DOM.gameOver.style.display = 'none';
                if (gameState.isMultiplayer) {
                    Network.disconnect();
                    gameState.isMultiplayer = false;
                }
                if(gameModeModal) gameModeModal.style.display = 'flex';
                return;
            }
            
            // If actively playing, return to menu
            if (!gameState.arrested && gameState.startTime > 0) {
                cleanupGame(); // Call cleanup from main.js
                
                // Hide game over and show menu
                if(DOM.gameOver) DOM.gameOver.style.display = 'none';
                if(gameModeModal) gameModeModal.style.display = 'flex';
            }
        }
    });

    // Multiplayer UI Listeners
    if (lobbyCloseBtn) {
        lobbyCloseBtn.addEventListener('click', () => {
            if(multiplayerLobby) multiplayerLobby.style.display = 'none';
            Network.disconnect();
        });
    }

    // Single JOIN button - connect then join
    if (joinGameBtn) {
        joinGameBtn.addEventListener('click', async () => {
            const name = playerNameInput.value.trim() || 'Spiller';
            const car = gameState.selectedCar || 'standard';
            
            // Save player name for next time
            localStorage.setItem('playerName', name);
            
            joinGameBtn.disabled = true;
            if(lobbyError) {
                lobbyError.textContent = 'Forbinder...';
                lobbyError.style.color = '#888';
            }
            
            try {
                await Network.connect();
                if(lobbyError) lobbyError.textContent = 'Joiner spil...';
                Network.joinGame(name, car);
            } catch (e) {
                if(lobbyError) {
                    lobbyError.textContent = 'Kunne ikke forbinde til server';
                    lobbyError.style.color = '#ff4444';
                }
                joinGameBtn.disabled = false;
            }
        });
    }

    if (startMultiplayerBtn) {
        startMultiplayerBtn.addEventListener('click', () => {
            // Get host config settings
            const hostConfig = {
                ...gameConfig,
                touchArrest: hostTouchArrest?.checked || false,
                dropInEnabled: hostDropInEnabled?.checked !== false
            };
            Network.startGame(hostConfig);
        });
    }

    // === Keyboard Navigation ===
    document.addEventListener('keydown', (e) => {
        // Toggle checks - checking style.display is safer than offsetParent for fixed position elements
        const isGameModeVisible = gameModeModal && gameModeModal.style.display === 'flex';
        const isGameOverVisible = DOM.gameOver && DOM.gameOver.style.display === 'block';
        const isShopVisible = DOM.shop && DOM.shop.style.display === 'flex';
        
        if (!isGameModeVisible && !isGameOverVisible && !isShopVisible) return;
        
        // Allowed keys
        const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'];
        if (!keys.includes(e.key) && e.key !== 'Enter') return;

        // --- SHOP NAVIGATION LOGIC ---
        if (isShopVisible) {
            handleShopNavigation(e);
            return;
        }
        
        // --- SIMPLE MENU NAVIGATION LOGIC (Game Mode & Game Over) ---
        let contextButtons = [];
        
        if (isGameModeVisible) {
            // Select visible buttons in modal - check inline style as offsetParent can be tricky in fixed containers
            contextButtons = Array.from(gameModeModal.querySelectorAll('button:not([disabled])'))
                .filter(b => b.style.display !== 'none');
        } else if (isGameOverVisible) {
            // Select visible buttons in game over screen
            contextButtons = Array.from(DOM.gameOver.querySelectorAll('button:not([disabled])'))
                .filter(b => b.style.display !== 'none');
        }
        
        if (contextButtons.length === 0) return;
        
        // Find currently focused or selected button
        let currentIndex = contextButtons.findIndex(b => b === document.activeElement || b.classList.contains('keyboard-selected'));
        
        if (e.key === 'Enter') {
            if (currentIndex >= 0 && currentIndex < contextButtons.length) {
                // Simulate click
                contextButtons[currentIndex].click(); 
                // Don't remove class immediately as visual feedback might be needed, 
                // but usually the menu closes or changes, so it's fine.
                e.preventDefault();
            }
            return;
        }
        
        // Navigation (Directional keys)
        e.preventDefault(); // Prevent page scrolling
        
        // Clear previous visual selection
        contextButtons.forEach(b => b.classList.remove('keyboard-selected'));
        
        if (currentIndex === -1) {
            currentIndex = 0;
        } else {
            // Treat as a list (Up/Left = prev, Down/Right = next)
            if (['ArrowDown', 'ArrowRight', 's', 'd', 'S', 'D'].includes(e.key)) {
                currentIndex = (currentIndex + 1) % contextButtons.length;
            } else {
                currentIndex = (currentIndex - 1 + contextButtons.length) % contextButtons.length;
            }
        }
        
        const btn = contextButtons[currentIndex];
        btn.focus(); // Set native focus
        btn.classList.add('keyboard-selected'); // Add custom visual focus
    });
}

function handleShopNavigation(e) {
    const activeEl = document.activeElement;
    
    // Define sections
    const tabs = Array.from(document.querySelectorAll('.shop-tab'));
    const cards = Array.from(document.querySelectorAll('.carCard'));
    const playBtn = document.getElementById('playBtn');
    
    // Determine current section
    let currentSection = 'none';
    let index = -1;
    
    if (tabs.includes(activeEl)) {
        currentSection = 'tabs';
        index = tabs.indexOf(activeEl);
    } else if (cards.includes(activeEl) || cards.some(c => c.contains(activeEl))) {
        currentSection = 'cards';
        // Find which card is active or contains the active element
        index = cards.findIndex(c => c === activeEl || c.contains(activeEl));
    } else if (activeEl === playBtn) {
        currentSection = 'play';
    } else {
        // Default start: Select first available card or first tab
        if (cards.length > 0) {
            cards[0].focus(); cards[0].classList.add('keyboard-selected');
        } else {
            tabs[0].focus(); tabs[0].classList.add('keyboard-selected');
        }
        return;
    }
    
    // Handle Enter
    if (e.key === 'Enter') {
        if (currentSection === 'tabs') {
            tabs[index].click();
        } else if (currentSection === 'cards') {
            cards[index].click();
        } else if (currentSection === 'play') {
            playBtn.click();
        }
        return;
    }
    
    e.preventDefault();
    
    // Helper to focus
    const focus = (el) => {
        // Remove old highlights
        document.querySelectorAll('.keyboard-selected').forEach(el => el.classList.remove('keyboard-selected'));
        el.focus();
        el.classList.add('keyboard-selected');
        // Scroll into view if needed
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const isRight = ['ArrowRight', 'd', 'D'].includes(e.key);
    const isLeft = ['ArrowLeft', 'a', 'A'].includes(e.key);
    const isDown = ['ArrowDown', 's', 'S'].includes(e.key);
    const isUp = ['ArrowUp', 'w', 'W'].includes(e.key);

    if (currentSection === 'tabs') {
        if (isRight) focus(tabs[(index + 1) % tabs.length]);
        if (isLeft) focus(tabs[(index - 1 + tabs.length) % tabs.length]);
        if (isDown) {
            // Move to first card if exists, else play button
            if (cards.length > 0) focus(cards[0]);
            else if (playBtn) focus(playBtn);
        }
    } else if (currentSection === 'cards') {
        // Grid navigation logic (assuming ~3 cards per row)
        const cardsPerRow = window.innerWidth > 1200 ? 4 : (window.innerWidth > 900 ? 3 : (window.innerWidth > 600 ? 2 : 1));
        
        if (isRight) {
            if (index < cards.length - 1) focus(cards[index + 1]);
        }
        if (isLeft) {
            if (index > 0) focus(cards[index - 1]);
        }
        if (isDown) {
             if (index + cardsPerRow < cards.length) {
                 focus(cards[index + cardsPerRow]);
             } else {
                 // Bottom of grid -> Play Button
                 focus(playBtn);
             }
        }
        if (isUp) {
            if (index - cardsPerRow >= 0) {
                 focus(cards[index - cardsPerRow]);
            } else {
                // Top of grid -> Tabs (closest one)
                const tabIndex = Math.min(Math.floor((index / cardsPerRow) * tabs.length), tabs.length - 1);
                focus(tabs[0]); // Just go to first tab for simplicity
            }
        }
    } else if (currentSection === 'play') {
        if (isUp) {
            if (cards.length > 0) focus(cards[cards.length - 1]);
            else focus(tabs[0]);
        }
    }
}
