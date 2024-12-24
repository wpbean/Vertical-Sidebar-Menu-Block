import { useState, useEffect } from '@wordpress/element';

export const useMenuItems = (menuId) => {
	const [menuItems, setMenuItems] = useState([]);
	
	// Fetch menu items when the menuId changes
	useEffect(() => {
		if (menuId) {
			const fetchMenuItems = async () => {
				try {
					const response = await fetch(`/wp-json/vsmb_get_menu_items/v1/menu/${menuId}`);
					const data     = await response.json();

					if( Array.isArray(data) ){
						setMenuItems(data);
					}else{
						setMenuItems([]);
					}
				} catch (error) {
					console.error("Error fetching menu items:", error);
				}
			};

			fetchMenuItems();
		}
	}, [menuId]);

	return menuItems;
};