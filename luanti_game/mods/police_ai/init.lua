-- Police AI Mod
-- Police entities that chase the player

local modname = minetest.get_current_modname()

-- Police types (from original game)
flugt.police_types = {
    {
        name = "Almindelig Politi",
        speed = 20,
        health = 100,
        damage = 10,
        color = "blue",
        min_heat = 0,
    },
    {
        name = "Interceptor",
        speed = 30,
        health = 120,
        damage = 15,
        color = "darkblue",
        min_heat = 2,
    },
    {
        name = "SWAT Truck",
        speed = 18,
        health = 200,
        damage = 20,
        color = "black",
        min_heat = 3,
    },
    {
        name = "Militær Køretøj",
        speed = 25,
        health = 150,
        damage = 30,
        color = "darkgreen",
        min_heat = 4,
    },
}

-- Register police entity
minetest.register_entity("police_ai:police_car", {
    initial_properties = {
        physical = true,
        collide_with_objects = true,
        collisionbox = {-1, -0.5, -1, 1, 1, 1},
        visual = "cube",
        visual_size = {x = 2, y = 1, z = 3},
        textures = {
            "police_top.png", "police_bottom.png",
            "police_side.png", "police_side.png",
            "police_front.png", "police_back.png"
        },
        makes_footstep_sound = false,
    },
    
    hp = 100,
    type_id = 1,
    target_player = nil,
    state = "patrol",
    timer = 0,
    
    on_activate = function(self, staticdata)
        if staticdata ~= "" then
            local data = minetest.deserialize(staticdata)
            if data then
                self.hp = data.hp or 100
                self.type_id = data.type_id or 1
            end
        end
    end,
    
    get_staticdata = function(self)
        return minetest.serialize({
            hp = self.hp,
            type_id = self.type_id,
        })
    end,
    
    on_step = function(self, dtime)
        self.timer = self.timer + dtime
        
        local pos = self.object:get_pos()
        if not pos then return end
        
        -- Find nearest player
        local nearest_player = nil
        local nearest_dist = 100
        
        for _, player in ipairs(minetest.get_connected_players()) do
            local player_pos = player:get_pos()
            local dist = flugt.utils.distance(pos, player_pos)
            
            if dist < nearest_dist then
                nearest_dist = dist
                nearest_player = player
            end
        end
        
        if nearest_player and nearest_dist < 80 then
            -- Chase player
            local player_pos = nearest_player:get_pos()
            local dir = vector.direction(pos, player_pos)
            
            local police_type = flugt.police_types[self.type_id]
            local speed = police_type.speed or 20
            
            local vel = vector.multiply(dir, speed * dtime * 10)
            vel.y = self.object:get_velocity().y -- Preserve vertical velocity
            
            self.object:set_velocity(vel)
            
            -- Face the player
            local yaw = math.atan2(dir.z, dir.x) - math.pi/2
            self.object:set_rotation({x = 0, y = yaw, z = 0})
            
            -- Check collision with player
            if nearest_dist < 3 then
                local player_name = nearest_player:get_player_name()
                local data = flugt.get_player_data(player_name)
                
                -- Damage player
                if self.timer > 1 then
                    data.health = data.health - police_type.damage
                    self.timer = 0
                    
                    if data.health <= 0 then
                        minetest.chat_send_player(player_name, "DU BLEV ANHOLDT!")
                        data.is_arrested = true
                        data.health = data.max_health
                        data.heat_level = 0
                        nearest_player:set_pos({x = 0, y = 2, z = 0})
                    end
                end
            end
        else
            -- Patrol (slow random movement)
            if self.timer > 5 then
                self.timer = 0
                local random_dir = {
                    x = (math.random() - 0.5) * 2,
                    y = 0,
                    z = (math.random() - 0.5) * 2,
                }
                -- Check for zero vector before normalizing
                local dir_length = math.sqrt(random_dir.x^2 + random_dir.z^2)
                if dir_length > 0.001 then
                    random_dir = vector.normalize(random_dir)
                    local vel = vector.multiply(random_dir, 5)
                    self.object:set_velocity(vel)
                end
            end
        end
    end,
    
    on_punch = function(self, puncher, time_from_last_punch, tool_capabilities, dir)
        if not puncher or not puncher:is_player() then return end
        
        local damage = 20
        self.hp = self.hp - damage
        
        if self.hp <= 0 then
            -- Police destroyed
            local player_name = puncher:get_player_name()
            local data = flugt.get_player_data(player_name)
            
            -- Reward
            local reward = 150 + (self.type_id * 200)
            data.money = data.money + reward
            data.enemies_killed = data.enemies_killed + 1
            
            minetest.chat_send_player(player_name, "+ " .. flugt.utils.format_money(reward) .. " (Politi ødelagt!)")
            
            -- Spawn money drop
            local pos = self.object:get_pos()
            for i = 1, 3 do
                local drop_pos = {
                    x = pos.x + (math.random() - 0.5) * 4,
                    y = pos.y + 1,
                    z = pos.z + (math.random() - 0.5) * 4,
                }
                minetest.add_entity(drop_pos, "economy:coin")
            end
            
            self.object:remove()
        end
    end,
})

-- Spawn police based on heat level
local police_spawn_timer = 0
local police_spawn_interval = 10.0
minetest.register_globalstep(function(dtime)
    police_spawn_timer = police_spawn_timer + dtime
    if police_spawn_timer >= police_spawn_interval then
        police_spawn_timer = 0
        
        for _, player in ipairs(minetest.get_connected_players()) do
            local player_name = player:get_player_name()
            local data = flugt.get_player_data(player_name)
            
            if data.heat_level > 0 and not data.is_arrested then
                -- Spawn police near player
                local num_police = math.min(data.heat_level, 5)
                
                for i = 1, num_police do
                    local pos = player:get_pos()
                    local spawn_pos = flugt.utils.random_pos_in_radius(pos, 60)
                    spawn_pos.y = pos.y + 2
                    
                    -- Choose police type based on heat level
                    local available_types = {}
                    for idx, ptype in ipairs(flugt.police_types) do
                        if data.heat_level >= ptype.min_heat then
                            table.insert(available_types, idx)
                        end
                    end
                    
                    local type_id = available_types[math.random(#available_types)] or 1
                    
                    local entity = minetest.add_entity(spawn_pos, "police_ai:police_car")
                    if entity then
                        local luaentity = entity:get_luaentity()
                        if luaentity then
                            luaentity.type_id = type_id
                            luaentity.hp = flugt.police_types[type_id].health
                        end
                    end
                end
            end
        end
    end
end)

-- Increase heat level based on player actions
local heat_increase_timer = 0
minetest.register_globalstep(function(dtime)
    heat_increase_timer = heat_increase_timer + dtime
    if heat_increase_timer >= 30 then
        heat_increase_timer = 0
        
        for _, player in ipairs(minetest.get_connected_players()) do
            local player_name = player:get_player_name()
            local data = flugt.get_player_data(player_name)
            
            -- Increase heat over time if moving
            local vel = player:get_velocity()
            local speed = math.sqrt(vel.x^2 + vel.z^2)
            
            if speed > 1 and not data.is_arrested then
                data.heat_level = math.min(data.heat_level + 1, flugt.config.max_heat_level)
                minetest.chat_send_player(player_name, "Efterlysningsniveau øget til " .. data.heat_level)
            end
        end
    end
end)

minetest.log("action", "[Flugt fra Politiet] Police AI mod loaded")
