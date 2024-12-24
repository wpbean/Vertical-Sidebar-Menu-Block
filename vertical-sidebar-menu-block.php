<?php
/**
 * Plugin Name:       Vertical Sidebar Menu Block
 * Plugin URI:        https://wpbean.com/
 * Description:       Collapsible sidebar vertical sidebar menu block for the Gutenberg editor.
 * Requires at least: 6.6
 * Requires PHP:      7.4
 * Version:           1.0
 * Author:            WPBean
 * Author URI:        https://wpbean.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       vertical-sidebar-menu-block
 * Domain Path:       /languages
 *
 * @package WPBean\VerticalSidebarMenuBlock
 */

namespace WPBean\VerticalSidebarMenuBlock;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Autoload Classes
require_once __DIR__ . '/vendor/autoload.php';

/**
 * Main Plugin Class
 */
final class WPBeanVerticalSidebarMenuBlock {
    /**
     * Instance of the class.
     *
     * @var WPBeanVerticalSidebarMenuBlock|null
     */
    private static $instance = null;

    /**
     * Constructor (Private to enforce singleton usage).
     */
    private function __construct() {
        $this->define_constants();
        $this->register_hooks();
    }

    /**
     * Ensures only one instance of the class is loaded.
     *
     * @return WPBeanVerticalSidebarMenuBlock
     */
    public static function instance() {
        if ( is_null( self::$instance ) ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Define plugin constants.
     */
    private function define_constants() {
        define( 'VSMB_VERSION', '1.0' );
        define( 'VSMB_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
        define( 'VSMB_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
    }

    /**
     * Register hooks and initialize components.
     */
    private function register_hooks() {
        register_activation_hook( __FILE__, array( $this, 'on_activation' ) );
        register_deactivation_hook( __FILE__, array( $this, 'on_deactivation' ) );

        add_action( 'init', array( $this, 'register_block' ) );
        add_action( 'after_setup_theme', array( $this, 'add_theme_supports' ) );
        add_action( 'plugins_loaded', array( $this, 'load_textdomain' ) );

        // Initialize required components.
        $this->initialize_components();
    }

    /**
     * On plugin activation.
     */
    public function on_activation() {
        flush_rewrite_rules();
    }

    /**
     * On plugin deactivation.
     */
    public function on_deactivation() {
        flush_rewrite_rules();
    }

    /**
     * Load the plugin's text domain for translations.
     */
    public function load_textdomain() {
        load_plugin_textdomain( 
            'vertical-sidebar-menu-block', 
            false, 
            dirname( plugin_basename( __FILE__ ) ) . '/languages' 
        );
    }

    /**
     * Register the Gutenberg block.
     */
    public function register_block() {
        register_block_type( VSMB_PLUGIN_DIR . 'build' );
    }

    /**
     * Add theme support features.
     */
    public function add_theme_supports() {
        add_theme_support( 'menus' );
    }

    /**
     * Initialize required components for the plugin.
     */
    private function initialize_components() {
        new \WPBean\VerticalSidebarMenuBlock\Assets();
        new \WPBean\VerticalSidebarMenuBlock\RestAPI\MenuEndpoint();
    }
}

// Initialize the plugin.
WPBeanVerticalSidebarMenuBlock::instance();