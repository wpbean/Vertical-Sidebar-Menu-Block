import { useSelect } from "@wordpress/data";

export const useNavMenus = () => {
    const navMenus = useSelect( (select) => {
		const data = select("core").getEntityRecords("taxonomy", "nav_menu", {
			order   : "asc",
			orderby : "name",
			per_page: 50
		});
		return data;
	});

    return navMenus;
}