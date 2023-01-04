import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import Item from "../../components/Item";
import { setItems } from "../../state";

const ShoppingList = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState("all");
	const items = useSelector((state) => state.cart.items);
	console.log("🚀 ~ file: ShoppingList.jsx:11 ~ ShoppingList ~ items", items);
	const isNonMobile = useMediaQuery("(min-width:600px)");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	async function getItems() {
		const item = await fetch(
			"https://localhost:1337/api/items?populate=image",
			{ method: "GET" },
		);
		const itemsJson = await item.json();
		dispatch(setItems(itemsJson.data));
	}

	useEffect(() => {
		getItems();
	}, []);

	const topRatedItems = items.filter(
		(item) => item.attributes.category === "topRated",
	);
	const newArrivalsItems = items.filter(
		(item) => item.attributes.category === "newArrivals",
	);
	const bestSellersItems = items.filter(
		(item) => item.attributes.category === "bestSellers",
	);

	return <Box width="80%" margin="80px auto"></Box>;
};

export default ShoppingList;
