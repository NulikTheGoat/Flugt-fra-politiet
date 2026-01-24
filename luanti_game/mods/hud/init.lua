-- HUD Mod
-- Display speed, health, money, heat level, and other game info

local modname = minetest.get_current_modname()

-- HUD IDs storage
local player_huds = {}

-- Initialize HUD for player
local function init_hud(player)
    local player_name = player:get_player_name()
    
    player_huds[player_name] = {
        money = player:hud_add({
            hud_elem_type = "text",
            position = {x = 0.02, y = 0.02},
            text = "Penge: 0 kr",
            number = 0xFFD700,
            alignment = {x = 1, y = 1},
            offset = {x = 0, y = 0},
        }),
        health = player:hud_add({
            hud_elem_type = "text",
            position = {x = 0.02, y = 0.06},
            text = "Helbred: 100/100",
            number = 0x00FF00,
            alignment = {x = 1, y = 1},
            offset = {x = 0, y = 0},
        }),
        heat = player:hud_add({
            hud_elem_type = "text",
            position = {x = 0.02, y = 0.10},
            text = "Efterlysningsniveau: 0",
            number = 0xFFFFFF,
            alignment = {x = 1, y = 1},
            offset = {x = 0, y = 0},
        }),
        vehicle = player:hud_add({
            hud_elem_type = "text",
            position = {x = 0.02, y = 0.14},
            text = "Køretøj: Til Fods",
            number = 0x00FFFF,
            alignment = {x = 1, y = 1},
            offset = {x = 0, y = 0},
        }),
        speed = player:hud_add({
            hud_elem_type = "text",
            position = {x = 0.02, y = 0.18},
            text = "Hastighed: 0 km/h",
            number = 0xFFFFFF,
            alignment = {x = 1, y = 1},
            offset = {x = 0, y = 0},
        }),
        time = player:hud_add({
            hud_elem_type = "text",
            position = {x = 0.98, y = 0.02},
            text = "Overlevelsestid: 0s",
            number = 0xFFFFFF,
            alignment = {x = -1, y = 1},
            offset = {x = 0, y = 0},
        }),
    }
end

-- Update HUD for player
local function update_hud(player)
    local player_name = player:get_player_name()
    local data = flugt.get_player_data(player_name)
    local huds = player_huds[player_name]
    
    if not huds then return end
    
    -- Money
    player:hud_change(huds.money, "text", "Penge: " .. flugt.utils.format_money(data.money))
    
    -- Health with color coding
    local health_color = 0x00FF00
    if data.health < data.max_health * 0.3 then
        health_color = 0xFF0000
    elseif data.health < data.max_health * 0.6 then
        health_color = 0xFFFF00
    end
    player:hud_change(huds.health, "text", string.format("Helbred: %d/%d", math.floor(data.health), data.max_health))
    player:hud_change(huds.health, "number", health_color)
    
    -- Heat level with color
    local heat_color = 0xFFFFFF
    if data.heat_level >= 4 then
        heat_color = 0xFF0000
    elseif data.heat_level >= 3 then
        heat_color = 0xFF6600
    elseif data.heat_level >= 2 then
        heat_color = 0xFFAA00
    elseif data.heat_level >= 1 then
        heat_color = 0xFFFF00
    end
    player:hud_change(huds.heat, "text", "Efterlysningsniveau: " .. data.heat_level)
    player:hud_change(huds.heat, "number", heat_color)
    
    -- Vehicle
    local vehicle_name = flugt.vehicles[data.current_vehicle] and flugt.vehicles[data.current_vehicle].name or "Ukendt"
    player:hud_change(huds.vehicle, "text", "Køretøj: " .. vehicle_name)
    
    -- Speed (calculate from player velocity)
    local vel = player:get_velocity()
    local speed = math.sqrt(vel.x^2 + vel.z^2) * 10 -- Approximate km/h conversion
    player:hud_change(huds.speed, "text", string.format("Hastighed: %d km/h", math.floor(speed)))
    
    -- Survival time
    local minutes = math.floor(data.survival_time / 60)
    local seconds = math.floor(data.survival_time % 60)
    player:hud_change(huds.time, "text", string.format("Overlevelsestid: %d:%02d", minutes, seconds))
end

-- Player join
minetest.register_on_joinplayer(function(player)
    init_hud(player)
end)

-- Player leave
minetest.register_on_leaveplayer(function(player)
    local player_name = player:get_player_name()
    player_huds[player_name] = nil
end)

-- Update HUD periodically
local hud_update_timer = 0
local hud_update_interval = 0.1 -- Update 10 times per second
minetest.register_globalstep(function(dtime)
    hud_update_timer = hud_update_timer + dtime
    if hud_update_timer >= hud_update_interval then
        hud_update_timer = 0
        
        for _, player in ipairs(minetest.get_connected_players()) do
            local player_name = player:get_player_name()
            local data = flugt.get_player_data(player_name)
            
            -- Update survival time
            if not data.is_arrested then
                data.survival_time = data.survival_time + hud_update_interval
            end
            
            update_hud(player)
        end
    end
end)

-- Passive income based on heat level
local passive_income_timer = 0

-- Efficient power of 2 calculation
local function pow2(n)
    if n <= 0 then return 1 end
    return bit and bit.lshift(1, n) or (2 ^ n)
end

minetest.register_globalstep(function(dtime)
    passive_income_timer = passive_income_timer + dtime
    if passive_income_timer >= flugt.config.passive_income_interval then
        passive_income_timer = 0
        
        for _, player in ipairs(minetest.get_connected_players()) do
            local player_name = player:get_player_name()
            local data = flugt.get_player_data(player_name)
            
            if data.heat_level > 0 and not data.is_arrested then
                -- Exponential passive income: 2^(heat_level - 1) kr/s
                local income = pow2(data.heat_level - 1)
                data.money = data.money + income
            end
        end
    end
end)

minetest.log("action", "[Flugt fra Politiet] HUD mod loaded")
