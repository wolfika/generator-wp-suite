<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              <%= plugin.website %>
 * @since             1.0.0
 * @package           <%= plugin.name.className %>
 *
 * @wordpress-plugin
 * Plugin Name:       <%= plugin.name.human %>
 * Plugin URI:        <%= plugin.website %>
 * Description:       <%= plugin.description %>
 * Version:           1.0.0
 * Author:            <%= plugin.author.name %>
 * Author URI:        <%= plugin.author.website %>
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       <%= plugin.name.fileName %>
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}<% if (plugin.featureList.includes('composer')) { %>

require_once __DIR__ . '/vendor/autoload.php';<% } %><% if (plugin.featureList.includes('activationHook')) { %>

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-<%= plugin.name.fileName %>-activator.php
 */
function activate_<%= plugin.name.instanceName %>() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-<%= plugin.name.fileName %>-activator.php';
	<%= plugin.name.className %>_Activator::activate();
}<% } %><% if (plugin.featureList.includes('deactivationHook')) { %>

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-<%= plugin.name.fileName %>-deactivator.php
 */
function deactivate_<%= plugin.name.instanceName %>() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-<%= plugin.name.fileName %>-deactivator.php';
	<%= plugin.name.className %>_Deactivator::deactivate();
}<% } %><% if (plugin.featureList.includes('activationHook')) { %>

register_activation_hook( __FILE__, 'activate_<%= plugin.name.instanceName %>' );<% } %><% if (plugin.featureList.includes('deactivationHook')) { %>

register_deactivation_hook( __FILE__, 'deactivate_<%= plugin.name.instanceName %>' );<% } %>

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-<%= plugin.name.fileName %>.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_<%= plugin.name.instanceName %>() {

	$plugin = new <%= plugin.name.className %>();
	$plugin->run();

}
run_<%= plugin.name.instanceName %>();
