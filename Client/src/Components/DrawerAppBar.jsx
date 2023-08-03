import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/AuthStore";
import { programAction } from "../store/ProgramStore";
import { snackActions } from "../store/SnackStore";
import ViewHints from "./UI/CustomModal";

const drawerWidth = 240;
const navItems = [{ id: 1, name: "Login", to: "login" }];

function DrawerAppBar(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
	const teamName = useSelector((state) => state.auth.teamName);
	const dispatch = useDispatch();

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Typography variant="h6">CyberQuest</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item.id} disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText primary={item.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex", justifyContent: "space-between" }}>
			<CssBaseline />
			<AppBar component="nav">
				<Toolbar
					style={{
						background:
							"linear-gradient(45deg, rgb(91 108 196), rgba(0, 0, 0, 0.223))",
					}}
				>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Link
						to="/"
						style={{
							textDecoration: "none",
							color: "#fff",
							flexGrow: 1,
							display: { xs: "none", sm: "block" },
						}}
					>
						<Typography variant="h6" component="div">
							CyberQuest						</Typography>
					</Link>
					<Box sx={{ mr: 3 }}>
						<ViewHints />
					</Box>
					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						{!isLoggedin ? (
							navItems.map((item) => (
								<Link
									key={item.id}
									style={{
										textDecoration: "none",
										color: "#fff",
									}}
									to={item.to}
								>
									{item.name}
								</Link>
							))
						) : (
							<Link
								key="1"
								style={{
									textDecoration: "none",
									color: "#fff",
								}}
								onClick={() => {
									dispatch(authActions.logoutHandler());
									dispatch(hintActions.reset());
									dispatch(
										snackActions.open({
											content: "Logout Success",
											type: "success",
										})
									);
									dispatch(programAction.reset());
								}}
							>
								Logout
							</Link>
						)}
					</Box>
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
			</Box>
			<Box component="main">
				<Toolbar />
			</Box>
		</Box>
	);
}

DrawerAppBar.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default DrawerAppBar;
