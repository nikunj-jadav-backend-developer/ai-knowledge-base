<?php

/**
 * Plugin Name: AI Knowledge Base
 * Description: Custom backend functionality for the AI Knowledge Base.
 * Version: 1.0.0
 * Author: Your Name
 */

if (!defined('ABSPATH')) {
    exit;
}


/**
 * =========================================================
 * 1. Register Knowledge Article Custom Post Type
 * =========================================================
 */
function akb_register_knowledge_article() {

    $labels = array(
        'name'                  => 'Knowledge Articles',
        'singular_name'         => 'Knowledge Article',
        'menu_name'             => 'Knowledge Base',
        'name_admin_bar'        => 'Knowledge Article',
        'add_new'               => 'Add Article',
        'add_new_item'          => 'Add New Article',
        'new_item'              => 'New Article',
        'edit_item'             => 'Edit Article',
        'view_item'             => 'View Article',
        'all_items'             => 'All Articles',
        'search_items'          => 'Search Articles',
        'not_found'             => 'No articles found',
        'not_found_in_trash'    => 'No articles found in Trash',
    );

    $args = array(
        'labels' => $labels,

        // WordPress settings
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,
        'has_archive'         => true,

        // URL
        'rewrite' => array(
            'slug' => 'knowledge',
        ),

        // Editor features
        'supports' => array(
            'title',
            'editor',
            'excerpt',
            'thumbnail',
            'author',
            'revisions',
        ),

        // Admin icon
        'menu_icon' => 'dashicons-book-alt',

        // WPGraphQL
        'show_in_graphql'      => true,
        'graphql_single_name'  => 'knowledgeArticle',
        'graphql_plural_name'  => 'knowledgeArticles',
    );

    register_post_type(
        'knowledge_article',
        $args
    );
}

add_action(
    'init',
    'akb_register_knowledge_article'
);


/**
 * =========================================================
 * 2. Register Knowledge Category Taxonomy
 * =========================================================
 */
function akb_register_knowledge_category() {

    $labels = array(
        'name'              => 'Knowledge Categories',
        'singular_name'     => 'Knowledge Category',
        'menu_name'         => 'Categories',
        'all_items'         => 'All Categories',
        'edit_item'         => 'Edit Category',
        'view_item'         => 'View Category',
        'update_item'       => 'Update Category',
        'add_new_item'      => 'Add New Category',
        'new_item_name'     => 'New Category Name',
        'search_items'      => 'Search Categories',
        'parent_item'       => 'Parent Category',
        'parent_item_colon' => 'Parent Category:',
        'not_found'         => 'No categories found',
    );

    $args = array(
        'labels' => $labels,

        // WordPress settings
        'public'            => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,

        // Hierarchical = category-style
        'hierarchical'      => true,

        // URL
        'rewrite' => array(
            'slug' => 'knowledge-category',
        ),

        // WPGraphQL
        'show_in_graphql'      => true,
        'graphql_single_name'  => 'knowledgeCategory',
        'graphql_plural_name'  => 'knowledgeCategories',
    );

    register_taxonomy(
        'knowledge_category',
        array('knowledge_article'),
        $args
    );
}

add_action(
    'init',
    'akb_register_knowledge_category'
);