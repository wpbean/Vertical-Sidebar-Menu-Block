<?php

namespace VSMB\VerticalSidebarMenuBlock;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use QuadLayers\WPMI\Controllers\Libraries as Controllers_Libraries;

class Assets {

	/**
	 * Constructor to add hooks.
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'register_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'force_enqueue_scripts' ) );
		add_action( 'wp_footer', array( $this, 'enqueue_dynamic_style' ) );
		add_action( 'wp_nav_menu', array( $this, 'enqueue_quadlayers_icons_scripts' ), 10, 2 );
	}

	/**
	 * Register scripts and styles for the block.
	 */
	public function register_scripts() {
		wp_register_script(
			'wpb-vertical-sidebar-menu-block-wpbeannavgoco',
			plugins_url( '../assets/js/jquery.wpbeannavgoco.min.js', __FILE__ ),
			array( 'jquery' ),
			'1.2',
			true
		);

		wp_register_script(
			'wpb-vertical-sidebar-menu-block-view',
			plugins_url( '../build/view.js', __FILE__ ),
			array( 'jquery', 'wpb-vertical-sidebar-menu-block-wpbeannavgoco' ),
			'1.2',
			true
		);
	}
	/**
	 * Force Enqueue scripts for the block. Required if using caching plugins.
	 */
	public function force_enqueue_scripts() {
		if ( ! is_admin() ) {
			wp_enqueue_script( 'wpb-vertical-sidebar-menu-block-wpbeannavgoco' );
			wp_enqueue_script( 'wpb-vertical-sidebar-menu-block-view' );
		}
	}

	/**
	 * Enqueue dynamic style in the footer.
	 */
	public function enqueue_dynamic_style() {
		wp_register_style( 'wpb-vertical-sidebar-menu-dynamic-style', false );
		wp_enqueue_style( 'wpb-vertical-sidebar-menu-dynamic-style' );
	}

	/**
	 * Enqueue QuadLayers icons scripts and styles when applicable.
	 *
	 * @param string $menu HTML content of the menu.
	 * @param array  $args Arguments for the menu.
	 *
	 * @return string Modified menu HTML.
	 */
	public function enqueue_quadlayers_icons_scripts( $menu, $args ) {
		if ( ! isset( $args->menu ) || ! is_int( $args->menu ) ) {
			return $menu;
		}

		if ( ! class_exists( 'QuadLayers\WPMI\Controllers\Libraries' ) ) {
			return $menu;
		}

		$menu_library = Controllers_Libraries::get_current_library( $args->menu );

		if ( ! $menu_library ) {
			return $menu;
		}

		wp_enqueue_style( 'wpmi-frontend' );
		wp_enqueue_style( $menu_library->get_style_name() );

		return $menu;
	}
}
