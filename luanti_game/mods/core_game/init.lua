-- Core Game Mod
-- Main game initialization and configuration

-- Mod metadata
local modname = minetest.get_current_modname()
local modpath = minetest.get_modpath(modname)

-- Global game state
flugt = {
    -- Version info
    version = "1.0.0",
    
    -- Game configuration
    config = {
        max_heat_level = 5,
        coin_value_base = 10,
        arrest_time = 3.0, -- seconds
        passive_income_interval = 1.0,
    },
    
    -- Player data storage
    players = {},
    
    -- Utility functions
    utils = {},
}

-- Player data structure
function flugt.get_player_data(player_name)
    if not flugt.players[player_name] then
        flugt.players[player_name] = {
            money = 0,
            health = 100,
            max_health = 100,
            heat_level = 0,
            current_vehicle = "on_foot",
            vehicles_owned = {"on_foot"},
            survival_time = 0,
            coins_collected = 0,
            enemies_killed = 0,
            is_arrested = false,
            arrest_timer = 0,
        }
    end
    return flugt.players[player_name]
end

-- Save player data
function flugt.save_player_data(player_name)
    local data = flugt.players[player_name]
    if not data then return end
    
    local player = minetest.get_player_by_name(player_name)
    if not player then return end
    
    -- Save to player metadata
    local meta = player:get_meta()
    meta:set_string("flugt_data", minetest.serialize(data))
end

-- Load player data
function flugt.load_player_data(player_name)
    local player = minetest.get_player_by_name(player_name)
    if not player then return end
    
    local meta = player:get_meta()
    local data_str = meta:get_string("flugt_data")
    
    if data_str ~= "" then
        flugt.players[player_name] = minetest.deserialize(data_str) or flugt.get_player_data(player_name)
    else
        flugt.get_player_data(player_name)
    end
end

-- Player join handler
minetest.register_on_joinplayer(function(player)
    local player_name = player:get_player_name()
    flugt.load_player_data(player_name)
    
    minetest.chat_send_player(player_name, "Velkommen til Flugt fra Politiet!")
    minetest.chat_send_player(player_name, "Undslip politiet, saml mønter og køb bedre køretøjer!")
end)

-- Player leave handler
minetest.register_on_leaveplayer(function(player)
    local player_name = player:get_player_name()
    flugt.save_player_data(player_name)
end)

-- Periodic save
local save_interval = 30 -- Save every 30 seconds
local timer = 0
minetest.register_globalstep(function(dtime)
    timer = timer + dtime
    if timer >= save_interval then
        timer = 0
        for player_name, _ in pairs(flugt.players) do
            flugt.save_player_data(player_name)
        end
    end
end)

-- Utility: Distance between points
function flugt.utils.distance(pos1, pos2)
    return math.sqrt(
        (pos1.x - pos2.x)^2 +
        (pos1.y - pos2.y)^2 +
        (pos1.z - pos2.z)^2
    )
end

-- Utility: Format money
function flugt.utils.format_money(amount)
    return string.format("%d kr", math.floor(amount))
end

-- Utility: Random position in radius
function flugt.utils.random_pos_in_radius(center, radius)
    local angle = math.random() * 2 * math.pi
    local distance = math.random() * radius
    return {
        x = center.x + math.cos(angle) * distance,
        y = center.y,
        z = center.z + math.sin(angle) * distance,
    }
end

minetest.log("action", "[Flugt fra Politiet] Core game mod loaded v" .. flugt.version)
