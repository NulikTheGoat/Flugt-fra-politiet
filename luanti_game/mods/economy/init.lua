-- Economy Mod
-- Money system, coins, and shop

-- Depends on core_game
local modname = minetest.get_current_modname()

-- Vehicle prices (from original game)
flugt.vehicles = {
    on_foot = {
        name = "Til Fods",
        price = 0,
        speed = 4,
        health = 20,
        description = "På dine egne ben"
    },
    bike = {
        name = "Cykel",
        price = 100,
        speed = 8,
        health = 30,
        description = "Din første opdatering"
    },
    escooter = {
        name = "El-løbehjul",
        price = 300,
        speed = 12,
        health = 25,
        description = "Hurtig men skrøbelig"
    },
    moped = {
        name = "Knallert",
        price = 700,
        speed = 16,
        health = 35,
        description = "God balance"
    },
    standard = {
        name = "Standard Bil",
        price = 2000,
        speed = 24,
        health = 100,
        description = "Din første bil"
    },
    sport = {
        name = "Sportsvogn",
        price = 8000,
        speed = 35,
        health = 70,
        description = "Hurtig acceleration"
    },
    muscle = {
        name = "Muscle Car",
        price = 15000,
        speed = 30,
        health = 150,
        description = "Stærk og kraftfuld"
    },
    super = {
        name = "Superbil",
        price = 50000,
        speed = 43,
        health = 100,
        description = "Meget hurtig"
    },
    hyper = {
        name = "Hyperbil",
        price = 100000,
        speed = 48,
        health = 120,
        description = "Tophastighed"
    },
    tank = {
        name = "Tank",
        price = 75000,
        speed = 19,
        health = 300,
        description = "Kan skyde! (Højreklik)"
    },
    ufo = {
        name = "UFO",
        price = 200000,
        speed = 54,
        health = 100,
        description = "Alien teknologi"
    },
}

-- Register coin entity
minetest.register_entity("economy:coin", {
    initial_properties = {
        physical = true,
        collide_with_objects = false,
        collisionbox = {-0.3, -0.3, -0.3, 0.3, 0.3, 0.3},
        visual = "cube",
        visual_size = {x = 0.6, y = 0.6},
        textures = {
            "economy_coin.png", "economy_coin.png",
            "economy_coin.png", "economy_coin.png",
            "economy_coin.png", "economy_coin.png"
        },
        makes_footstep_sound = false,
        static_save = false,
    },
    
    timer = 0,
    rotation = 0,
    
    on_step = function(self, dtime)
        -- Rotate the coin
        self.timer = self.timer + dtime
        self.rotation = self.rotation + dtime * 3
        self.object:set_rotation({x = 0, y = self.rotation, z = 0})
        
        -- Bob up and down
        local pos = self.object:get_pos()
        if pos then
            pos.y = pos.y + math.sin(self.timer * 3) * 0.02
            self.object:set_pos(pos)
        end
        
        -- Check for player collision
        local objects = minetest.get_objects_inside_radius(pos, 1.5)
        for _, obj in ipairs(objects) do
            if obj:is_player() then
                local player_name = obj:get_player_name()
                local data = flugt.get_player_data(player_name)
                
                -- Calculate coin value based on heat level
                local coin_value = flugt.config.coin_value_base * (1 + data.heat_level * 0.5)
                data.money = data.money + coin_value
                data.coins_collected = data.coins_collected + 1
                
                -- Notification
                minetest.chat_send_player(player_name, "+ " .. flugt.utils.format_money(coin_value))
                
                -- Remove coin
                self.object:remove()
                return
            end
        end
        
        -- Remove after 60 seconds
        if self.timer > 60 then
            self.object:remove()
        end
    end,
})

-- Spawn coins periodically
local coin_spawn_timer = 0
local coin_spawn_interval = 5.0
minetest.register_globalstep(function(dtime)
    coin_spawn_timer = coin_spawn_timer + dtime
    if coin_spawn_timer >= coin_spawn_interval then
        coin_spawn_timer = 0
        
        -- Spawn coins near players
        for _, player in ipairs(minetest.get_connected_players()) do
            local pos = player:get_pos()
            local spawn_pos = flugt.utils.random_pos_in_radius(pos, 50)
            spawn_pos.y = pos.y + 1
            
            minetest.add_entity(spawn_pos, "economy:coin")
        end
    end
end)

-- Shop formspec
function flugt.show_shop(player_name)
    local data = flugt.get_player_data(player_name)
    local formspec = "size[10,9]" ..
        "bgcolor[#1a1a1a;true]" ..
        "label[0.5,0.5;BUTIK - Køb Køretøjer]" ..
        "label[0.5,1;Dine penge: " .. flugt.utils.format_money(data.money) .. "]" ..
        "label[0.5,1.5;Nuværende køretøj: " .. (flugt.vehicles[data.current_vehicle] and flugt.vehicles[data.current_vehicle].name or "Ukendt") .. "]"
    
    local y = 2.5
    local idx = 0
    for vehicle_id, vehicle in pairs(flugt.vehicles) do
        local owned = false
        for _, v in ipairs(data.vehicles_owned) do
            if v == vehicle_id then
                owned = true
                break
            end
        end
        
        local label = vehicle.name .. " - " .. flugt.utils.format_money(vehicle.price)
        if owned then
            label = label .. " [EJET]"
        end
        
        formspec = formspec .. "button[0.5," .. y .. ";9,0.5;buy_" .. vehicle_id .. ";" .. label .. "]"
        y = y + 0.6
        idx = idx + 1
        
        if idx >= 10 then break end
    end
    
    formspec = formspec .. "button[0.5,8.3;9,0.5;close;Luk]"
    
    minetest.show_formspec(player_name, "flugt:shop", formspec)
end

-- Handle shop buttons
minetest.register_on_player_receive_fields(function(player, formname, fields)
    if formname ~= "flugt:shop" then return end
    
    local player_name = player:get_player_name()
    local data = flugt.get_player_data(player_name)
    
    if fields.close or fields.quit then
        return true
    end
    
    -- Check for buy button
    for field, _ in pairs(fields) do
        if field:sub(1, 4) == "buy_" then
            local vehicle_id = field:sub(5)
            local vehicle = flugt.vehicles[vehicle_id]
            
            if not vehicle then
                minetest.chat_send_player(player_name, "Ukendt køretøj!")
                return true
            end
            
            -- Check if already owned
            local owned = false
            for _, v in ipairs(data.vehicles_owned) do
                if v == vehicle_id then
                    owned = true
                    break
                end
            end
            
            if owned then
                -- Switch to this vehicle
                data.current_vehicle = vehicle_id
                data.max_health = vehicle.health
                data.health = math.min(data.health, data.max_health)
                minetest.chat_send_player(player_name, "Skiftet til " .. vehicle.name)
            elseif data.money >= vehicle.price then
                -- Buy the vehicle
                data.money = data.money - vehicle.price
                table.insert(data.vehicles_owned, vehicle_id)
                data.current_vehicle = vehicle_id
                data.max_health = vehicle.health
                data.health = vehicle.health
                minetest.chat_send_player(player_name, "Købt " .. vehicle.name .. "!")
            else
                minetest.chat_send_player(player_name, "Ikke nok penge! Mangler: " .. flugt.utils.format_money(vehicle.price - data.money))
            end
            
            -- Refresh shop
            flugt.show_shop(player_name)
            return true
        end
    end
end)

-- Command to open shop
minetest.register_chatcommand("shop", {
    params = "",
    description = "Åbn køretøjsbutikken",
    func = function(name, param)
        flugt.show_shop(name)
        return true
    end,
})

-- Give starting money
minetest.register_on_newplayer(function(player)
    local player_name = player:get_player_name()
    local data = flugt.get_player_data(player_name)
    data.money = 0
end)

minetest.log("action", "[Flugt fra Politiet] Economy mod loaded")
