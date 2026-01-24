-- Vehicle System Mod
-- Handles vehicle physics and movement

local modname = minetest.get_current_modname()

-- Apply vehicle physics to player
local function apply_vehicle_physics(player, dtime)
    local player_name = player:get_player_name()
    local data = flugt.get_player_data(player_name)
    
    local vehicle = flugt.vehicles[data.current_vehicle]
    if not vehicle then return end
    
    -- Get player controls
    local ctrl = player:get_player_control()
    local vel = player:get_velocity()
    
    -- Vehicle speed multiplier
    local speed_mult = vehicle.speed / 4.0
    
    -- Apply speed boost based on vehicle
    if ctrl.up then
        local dir = player:get_look_dir()
        local accel = vector.multiply(dir, speed_mult)
        vel.x = vel.x + accel.x * dtime * 10
        vel.z = vel.z + accel.z * dtime * 10
    end
    
    if ctrl.down then
        local dir = player:get_look_dir()
        local brake = vector.multiply(dir, -speed_mult * 0.5)
        vel.x = vel.x + brake.x * dtime * 10
        vel.z = vel.z + brake.z * dtime * 10
    end
    
    -- Apply friction
    vel.x = vel.x * (1 - dtime * 2)
    vel.z = vel.z * (1 - dtime * 2)
    
    -- Limit max speed
    local max_speed = speed_mult * 3
    local horizontal_speed = math.sqrt(vel.x^2 + vel.z^2)
    if horizontal_speed > max_speed then
        local ratio = max_speed / horizontal_speed
        vel.x = vel.x * ratio
        vel.z = vel.z * ratio
    end
    
    player:set_velocity(vel)
end

-- Update vehicle physics for all players
minetest.register_globalstep(function(dtime)
    for _, player in ipairs(minetest.get_connected_players()) do
        apply_vehicle_physics(player, dtime)
    end
end)

-- Override player physics based on vehicle
minetest.register_on_joinplayer(function(player)
    local player_name = player:get_player_name()
    local data = flugt.get_player_data(player_name)
    
    -- Set physics overrides based on current vehicle
    local vehicle = flugt.vehicles[data.current_vehicle]
    if vehicle then
        player:set_physics_override({
            speed = vehicle.speed / 4,
            jump = 1.0,
            gravity = 1.0,
        })
    end
end)

-- Command to spawn vehicles (for testing)
minetest.register_chatcommand("spawnvehicle", {
    params = "<vehicle_id>",
    description = "Spawn og skift til et køretøj",
    privs = {server = true},
    func = function(name, param)
        if param == "" then
            return false, "Brug: /spawnvehicle <vehicle_id>"
        end
        
        local vehicle = flugt.vehicles[param]
        if not vehicle then
            return false, "Ukendt køretøj: " .. param
        end
        
        local data = flugt.get_player_data(name)
        
        -- Add to owned vehicles if not already
        local owned = false
        for _, v in ipairs(data.vehicles_owned) do
            if v == param then
                owned = true
                break
            end
        end
        if not owned then
            table.insert(data.vehicles_owned, param)
        end
        
        -- Switch to vehicle
        data.current_vehicle = param
        data.max_health = vehicle.health
        data.health = math.min(data.health, data.max_health)
        
        local player = minetest.get_player_by_name(name)
        if player then
            player:set_physics_override({
                speed = vehicle.speed / 4,
                jump = 1.0,
                gravity = 1.0,
            })
        end
        
        return true, "Skiftet til " .. vehicle.name
    end,
})

minetest.log("action", "[Flugt fra Politiet] Vehicle system mod loaded")
