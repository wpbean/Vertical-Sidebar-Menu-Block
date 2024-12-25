<?php

namespace VSMB\VerticalSidebarMenuBlock\RestAPI;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_Error;
use WP_REST_Request;

class MenuEndpoint {

	/**
	 * Constructor to hook the REST API registration.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Registers the REST API route.
	 */
	public function register_routes() {
		$route = apply_filters( 'vsmb_rest_api_route', 'vsmb_get_menu_items/v1' );

		register_rest_route(
			$route,
			'/menu/(?P<menu_id>\d+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_menu_items_by_id' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Callback to retrieve menu items based on the menu ID.
	 *
	 * @param WP_REST_Request $request The REST API request object.
	 * 
	 * @return array|WP_Error Nested menu structure or error.
	 */
	public function get_menu_items_by_id( WP_REST_Request $request ) {
		$menu_id    = (int) $request->get_param( 'menu_id' );
		$menu_items = wp_get_nav_menu_items( $menu_id );

		if ( ! $menu_items ) {
			return new WP_Error( 
				'no_menu', 
				esc_html__( 'Menu not found', 'vertical-sidebar-menu-block' ), 
				array( 'status' => 404 ) 
			);
		}

		// Organize menu items into a nested array by parent ID
		$menu_items_by_id = array();
		foreach ( $menu_items as $item ) {
			$menu_items_by_id[ $item->ID ] = array(
				'id'       => $item->ID,
				'title'    => $item->title,
				'url'      => $item->url,
				'parent'   => $item->menu_item_parent,
				'children' => array(),
			);
		}

		// Build nested structure
		$nested_menu = array();
		foreach ( $menu_items_by_id as $item_id => &$item ) {
			if ( $item['parent'] ) {
				$menu_items_by_id[ $item['parent'] ]['children'][] = &$item;
			} else {
				$nested_menu[] = &$item;
			}
		}

		return $nested_menu;
	}
}
