import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";

export default function ViewHints() {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const hints = useSelector((state) => state.hints);

	return (
		<div>
			<Button sx={{ color: "white" }} onClick={handleClickOpen}>
				Hints found
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Hints Found</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{hints.length > 0
							? hints.map((item, index) => (
									<span key={`hint-${index}`}>
										{" "}
										{item.questionNo} - {`"${item.hint}"`}{" "}
									</span>
							  ))
							: "No hints found"}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
