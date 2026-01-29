extends RigidBody3D

# Car physics controller
# Simplified POC implementation inspired by the Three.js version

@export var max_speed = 30.0
@export var acceleration = 15.0
@export var steering_speed = 2.0
@export var brake_force = 20.0
@export var drift_factor = 0.3

var velocity_direction = Vector3.ZERO
var steering = 0.0

func _ready():
	# Set up physics properties
	mass = 1200.0
	linear_damp = 0.5
	angular_damp = 2.0

func _physics_process(delta):
	# Get input
	var input_forward = Input.get_action_strength("forward") - Input.get_action_strength("backward")
	var input_steering = Input.get_action_strength("right") - Input.get_action_strength("left")
	var is_handbrake = Input.is_action_pressed("handbrake")
	
	# Calculate forward direction based on rotation
	var forward = -transform.basis.z
	
	# Apply acceleration
	if input_forward != 0:
		var force = forward * input_forward * acceleration * mass
		apply_central_force(force)
	
	# Apply braking
	if is_handbrake:
		linear_velocity *= (1.0 - brake_force * delta * 0.5)
		# Increase steering during drift
		steering = input_steering * steering_speed * 1.5
	else:
		# Normal steering
		steering = input_steering * steering_speed
	
	# Apply steering torque when moving
	var speed = linear_velocity.length()
	if speed > 1.0:
		var torque = Vector3(0, steering * speed * 0.5, 0)
		apply_torque(torque)
	
	# Limit max speed
	if linear_velocity.length() > max_speed:
		linear_velocity = linear_velocity.normalized() * max_speed
	
	# Keep car upright (prevent flipping)
	var up = transform.basis.y
	var target_up = Vector3.UP
	var correction = up.cross(target_up)
	if correction.length() > 0.01:
		apply_torque(correction * 10.0)
