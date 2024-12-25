<?php

namespace VSMB\VerticalSidebarMenuBlock\Utils;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Class DynamicStyleHandler
 *
 * Handles the generation and addition of dynamic inline styles for blocks.
 */
class DynamicStyleHandler
{
    /**
     * Block attributes.
     *
     * @var array
     */
    private $attributes;

    /**
     * Block ID.
     *
     * @var string
     */
    private $block_id;

    /**
     * Script handle for the block's styles.
     *
     * @var string
     */
    private $handle;

    /**
     * Prefix for custom CSS variables.
     *
     * @var string
     */
    private $prefix;

    /**
     * Keys of attributes to generate styles for.
     *
     * @var array
     */
    private $style_keys;

    /**
     * Constructor.
     *
     * @param array  $attributes Block attributes.
     * @param string $block_id   Unique block ID.
     * @param string $handle     Handle of the registered block's style.
     * @param string $prefix     Prefix for CSS variables.
     * @param array  $style_keys Keys for the attributes to generate styles.
     */
    public function __construct($attributes, $block_id, $handle, $prefix, $style_keys = array())
    {
        $this->attributes = $attributes;
        $this->prefix     = $prefix;
        $this->block_id   = $block_id;
        $this->handle     = $handle;
        $this->style_keys = $style_keys;

        add_action('wp_footer', array($this, 'generate_and_enqueue_styles'));
    }

    /**
     * Generates and enqueues the dynamic inline styles.
     */
    public function generate_and_enqueue_styles()
    {
        $styles = $this->generate_styles();

        if (!empty($styles)) {
            $custom_css = sprintf(
                '.%s { %s }',
                esc_attr($this->block_id),
                wp_kses_post( $styles )
            );

            wp_add_inline_style($this->handle, $custom_css);
        }
    }

    /**
     * Converts a camelCase string to kebab-case.
     *
     * @param string $string The camelCase string to convert.
     *
     * @return string The converted kebab-case string.
     */
    private function convert_to_kebab_case($string)
    {
        return strtolower(preg_replace('/([a-z])([A-Z])/', '$1-$2', $string));
    }

    /**
     * Generates styles based on block attributes.
     *
     * Supports both simple key-value pairs and BoxControl-style objects.
     *
     * @return string The generated styles as a CSS string.
     */
    private function generate_styles()
    {
        $styles = '';

        foreach ($this->style_keys as $key) {
            if (isset($this->attributes[$key])) {
                $value = $this->attributes[$key];

                if (is_array($value) && $this->is_box_control_value($value)) {
                    // Handle BoxControl object (top, right, bottom, left)
                    $styles .= $this->generate_box_control_styles($key, $value);
                } else {
                    // Handle simple key-value pairs
                    $kebab_case_key = $this->convert_to_kebab_case($key);
                    $styles        .= $this->prefix . $kebab_case_key . ': ' . esc_attr($value) . ';';
                }
            }
        }

        return $styles;
    }

    /**
     * Checks if a value is a valid BoxControl object.
     *
     * Ensures it's an array and has at least one valid side value (`top`, `right`, `bottom`, `left`).
     *
     * @param mixed $value The value to check.
     *
     * @return bool True if it's a valid BoxControl object, false otherwise.
     */
    private function is_box_control_value($value)
    {
        return is_array($value) && !empty(array_intersect_key($value, array_flip(['top', 'right', 'bottom', 'left'])));
    }

    /**
     * Generates CSS for BoxControl-style objects.
     *
     * @param string $key   The key associated with the BoxControl value.
     * @param array  $value The BoxControl object (e.g., top, right, bottom, left).
     *
     * @return string The generated CSS for the BoxControl value.
     */
    private function generate_box_control_styles($key, $value)
    {
        $kebab_case_key = $this->convert_to_kebab_case($key);

        // Ensure all sides have a default value to prevent undefined key errors
        $top    = isset($value['top']) ? esc_attr($value['top']) : '';
        $right  = isset($value['right']) ? esc_attr($value['right']) : '';
        $bottom = isset($value['bottom']) ? esc_attr($value['bottom']) : '';
        $left   = isset($value['left']) ? esc_attr($value['left']) : '';

        // Generate individual CSS variables for each side
        $css = '';
        if ($top !== '') {
            $css .= $this->prefix . $kebab_case_key . '-top: ' . $top . ';';
        }
        if ($right !== '') {
            $css .= $this->prefix . $kebab_case_key . '-right: ' . $right . ';';
        }
        if ($bottom !== '') {
            $css .= $this->prefix . $kebab_case_key . '-bottom: ' . $bottom . ';';
        }
        if ($left !== '') {
            $css .= $this->prefix . $kebab_case_key . '-left: ' . $left . ';';
        }

        // Generate shorthand property only if all four values are set
        if ($top !== '' && $right !== '' && $bottom !== '' && $left !== '') {
            $css .= $this->prefix . $kebab_case_key . ': ' . $top . ' ' . $right . ' ' . $bottom . ' ' . $left . ';';
        }

        return $css;
    }
}
