-- World Generation Mod
-- Creates a city environment with roads and buildings

local modname = minetest.get_current_modname()

-- Register asphalt (road) node
minetest.register_node("world_gen:asphalt", {
    description = "Asfalt",
    tiles = {"world_gen_asphalt.png"},
    groups = {cracky = 3},
    sounds = default and default.node_sound_stone_defaults(),
})

-- Register road marking node
minetest.register_node("world_gen:road_marking", {
    description = "Vejmarkering",
    tiles = {
        "world_gen_asphalt.png^world_gen_road_line.png",
        "world_gen_asphalt.png",
        "world_gen_asphalt.png",
        "world_gen_asphalt.png",
        "world_gen_asphalt.png",
        "world_gen_asphalt.png"
    },
    groups = {cracky = 3},
    sounds = default and default.node_sound_stone_defaults(),
})

-- Register building blocks
minetest.register_node("world_gen:concrete", {
    description = "Beton",
    tiles = {"world_gen_concrete.png"},
    groups = {cracky = 2},
    sounds = default and default.node_sound_stone_defaults(),
})

minetest.register_node("world_gen:glass", {
    description = "Glas",
    tiles = {"world_gen_glass.png"},
    drawtype = "glasslike",
    paramtype = "light",
    sunlight_propagates = true,
    groups = {cracky = 3},
    sounds = default and default.node_sound_glass_defaults(),
})

-- Generate city
minetest.register_on_generated(function(minp, maxp, seed)
    if minp.y > 0 or maxp.y < 0 then return end
    
    local vm, emin, emax = minetest.get_mapgen_object("voxelmanip")
    local area = VoxelArea:new{MinEdge = emin, MaxEdge = emax}
    local data = vm:get_data()
    
    -- Get content IDs
    local c_air = minetest.get_content_id("air")
    local c_asphalt = minetest.get_content_id("world_gen:asphalt")
    local c_marking = minetest.get_content_id("world_gen:road_marking")
    local c_concrete = minetest.get_content_id("world_gen:concrete")
    local c_glass = minetest.get_content_id("world_gen:glass")
    
    -- Generate roads in a grid pattern
    local road_width = 8
    local block_size = 50
    
    for x = minp.x, maxp.x do
        for z = minp.z, maxp.z do
            -- Check if this is a road location
            local is_road_x = (x % block_size) < road_width
            local is_road_z = (z % block_size) < road_width
            
            if is_road_x or is_road_z then
                -- Ground level (y = 0)
                local vi = area:index(x, 0, z)
                
                -- Center line marking
                local center = math.floor(road_width / 2)
                if (x % block_size) == center or (z % block_size) == center then
                    data[vi] = c_marking
                else
                    data[vi] = c_asphalt
                end
                
                -- Clear air above roads
                for y = 1, 30 do
                    local vi_air = area:index(x, y, z)
                    data[vi_air] = c_air
                end
            else
                -- Building area
                -- Simple rectangular buildings
                local building_chance = 0.3
                local bx = math.floor(x / block_size)
                local bz = math.floor(z / block_size)
                local building_seed = bx * 1000 + bz
                
                -- Use seed to determine if building exists
                if (building_seed % 100) < (building_chance * 100) then
                    local height = 10 + (building_seed % 20)
                    
                    -- Build walls
                    local rel_x = (x % block_size)
                    local rel_z = (z % block_size)
                    local is_wall = rel_x == road_width or rel_x == (block_size - 1) or
                                    rel_z == road_width or rel_z == (block_size - 1)
                    
                    if is_wall then
                        for y = 1, height do
                            local vi = area:index(x, y, z)
                            if (y % 4) == 3 then
                                data[vi] = c_glass
                            else
                                data[vi] = c_concrete
                            end
                        end
                    end
                end
            end
        end
    end
    
    vm:set_data(data)
    vm:write_to_map()
end)

-- Spawn location setup
minetest.register_on_newplayer(function(player)
    player:set_pos({x = 0, y = 2, z = 0})
end)

minetest.register_on_respawnplayer(function(player)
    player:set_pos({x = 0, y = 2, z = 0})
    return true
end)

minetest.log("action", "[Flugt fra Politiet] World generation mod loaded")
