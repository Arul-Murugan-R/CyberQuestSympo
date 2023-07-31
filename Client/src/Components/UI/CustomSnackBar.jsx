import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { snackActions } from "../../store/SnackStore";
import { useState } from "react";

const CustomSnackbar = (props) => {
	const dispatch = useDispatch();
	const open = useSelector((state) => state.snackbar.visible);
	const message = useSelector((state) => state.snackbar.content);
	const type = useSelector((state) => state.snackbar.type);

	const handleClose = () => {
		dispatch(snackActions.close());
	};

	const action = (
		<IconButton
			size="small"
			aria-label="close"
			color="inherit"
			onClick={handleClose}
		>
			<CloseIcon fontSize="small" />
		</IconButton>
	);

	return (
		<>
			{createPortal(
				<Snackbar
					open={open}
					autoHideDuration={2000}
					onClose={handleClose}
					action={action}
				>
					<Alert
						onClose={handleClose}
						severity={type}
						sx={{ width: "100%" }}
					>
						{message}
					</Alert>
				</Snackbar>,
				document.getElementById("root")
			)}
		</>
	);
};

export default CustomSnackbar;
