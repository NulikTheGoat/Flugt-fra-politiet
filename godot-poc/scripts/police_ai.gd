extends RigidBody3D

# Simple police AI that chases the player
# Simplified POC version of the police behavior from the Three.js game

@export var chase_speed = 20.0
@export var detection_range = 50.0
@export var acceleration = 10.0

var player = null

func _ready():
	mass = 1200.0
	linear_damp = 0.5
	angular_damp = 2.0

func _physics_process(delta):
	if player == null:
		# Find player
		player = get_tree().get_first_node_in_group("player")
		return
	
	# Calculate direction to player
	var direction = (player.global_position - global_position).normalized()
	
	# Check if player is in range
	var distance = global_position.distance_to(player.global_position)
	if distance > detection_range:
		return
	
	# Apply force towards player
	var force = direction * acceleration * mass
	apply_central_force(force)
	
	# Limit speed
	if linear_velocity.length() > chase_speed:
		linear_velocity = linear_velocity.normalized() * chase_speed
	
	# Rotate to face movement direction
	if linear_velocity.length() > 0.5:
		var target_rotation = Vector3(0, atan2(linear_velocity.x, linear_velocity.z), 0)
		rotation.y = lerp_angle(rotation.y, target_rotation.y, delta * 3.0)
	
	# Keep upright
	var up = transform.basis.y
	var target_up = Vector3.UP
	var correction = up.cross(target_up)
	if correction.length() > 0.01:
		apply_torque(correction * 10.0)
