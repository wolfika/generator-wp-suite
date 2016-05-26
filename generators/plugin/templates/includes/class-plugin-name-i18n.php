<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       <%= plugin.website %>
 * @since      1.0.0
 *
 * @package    <%= plugin.name.className %>
 * @subpackage <%= plugin.name.className %>/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    <%= plugin.name.className %>
 * @subpackage <%= plugin.name.className %>/includes
 * @author     <%= plugin.author.name %> <<%= plugin.author.email %>>
 */
class <%= plugin.name.className %>_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'<%= plugin.name.fileName %>',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
