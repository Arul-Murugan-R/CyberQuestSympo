import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

export default function ViewHints() {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	let hints = useSelector((state) => state.hints);

	let tempHint = [...hints]
	function compQno(a,b){
		return a.questionNo - b.questionNo
	}
	let sortedHints = tempHint.sort(compQno)
	// console.log(tempHint.sort(compQno))
	// for(let i=1;i<=5;i++){
	// 	sortedHint.push(hints.find((h)=>h.questionNo == i))
	// }
	return (
		<div>
			<Button sx={{ color: "white" }} onClick={handleClickOpen}>
				Hints found
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle textAlign={"center"}>Hints Found</DialogTitle>
				<DialogContent>
					<DialogContentText component={"div"}>
						{hints.length > 0 ? (
							<TableContainer component={Paper}>
								<Table
									sx={{
										backgroundColor: "#272829",
										color: "white",
									}}
								>
									<TableHead>
										<TableRow>
											<TableCell
												sx={{
													color: "white",
													borderRight:
														"1px solid white",
												}}
											>
												Question No
											</TableCell>
											<TableCell
												sx={{ color: "white", px: 5 }}
											>
												Hint
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{sortedHints.map((row) => {return row&&(
											<TableRow key={row.hint}>
												<TableCell
													sx={{
														color: "white",
														borderRight:
															"1px solid white",
														textAlign: "center",
													}}
												>
													{row.questionNo}
												</TableCell>
												<TableCell
													sx={{
														color: "white",
														textAlign: "center",
													}}
												>
													{row.hint}
												</TableCell>
											</TableRow>
										)})}
									</TableBody>
								</Table>
							</TableContainer>
						) : (
							"No hints found"
						)}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
