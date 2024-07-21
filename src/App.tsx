import "./index.css";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const metalList: string[] = ["Iron", "Gold", "Copper"];

interface FormState {
  metal: string;
  number: number;
  quantity: number;
  addedQuantity: number;
  removedQuantity: number;
  finalQuantity: number;
}

const initialIronFormState: FormState = {
  metal: "Iron",
  number: 1,
  quantity: 1200,
  addedQuantity: 0,
  removedQuantity: 0,
  finalQuantity: 0,
};
const initialGoldFormState: FormState = {
  metal: "Gold",
  number: 1,
  quantity: 1200,
  addedQuantity: 0,
  removedQuantity: 0,
  finalQuantity: 0,
};
const initialCopperFormState: FormState = {
  metal: "Copper",
  number: 1,
  quantity: 1200,
  addedQuantity: 0,
  removedQuantity: 0,
  finalQuantity: 0,
};

function App() {
  const [metalHistory, setMetalHistory] = useState<FormState[]>([]);
  const [ironFormState, setIronFormState] =
    useState<FormState>(initialIronFormState);
  const [goldFormState, setGoldFormState] =
    useState<FormState>(initialGoldFormState);
  const [copperFormState, setCopperFormState] = useState<FormState>(
    initialCopperFormState
  );
  const [metal, setMetal] = useState<string>("");
  const [formState, setFormState] = useState<FormState>({
    metal: "Iron",
    number: 1,
    quantity: 1200,
    addedQuantity: 0,
    removedQuantity: 0,
    finalQuantity: 0,
  });
  console.log(ironFormState);
  const handleMetalChange = (
    _e: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setMetal(value);
    if (value === "Iron") {
      setFormState(ironFormState);
    } else if (value === "Gold") {
      setFormState(goldFormState);
    } else if (value === "Copper") {
      setFormState(copperFormState);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setFormState((prev: FormState) => ({
        ...prev,
        [e.target.name]: +e.target.value,
      }));
    }
  };

  useEffect(() => {
    const calculateFinalQuantity =
      formState.quantity + formState.addedQuantity - formState.removedQuantity;
    setFormState((prev) => ({
      ...prev,
      finalQuantity: calculateFinalQuantity,
    }));
  }, [
    metal,
    formState.quantity,
    formState.addedQuantity,
    formState.removedQuantity,
  ]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const handleSetValue = {
      ...formState,
      quantity: formState.finalQuantity,
      number: formState.number + 1,
      addedQuantity: 0,
      removedQuantity: 0,
      finalQuantity: 0,
    };

    if (formState.metal === "Iron") {
      console.log("Iron");
      setIronFormState(handleSetValue);
    } else if (formState.metal === "Gold") {
      setGoldFormState(handleSetValue);
    } else {
      setCopperFormState(handleSetValue);
    }
    setMetalHistory((prev) => [...prev, formState]);
    setFormState(handleSetValue);
  };

  const isButtonDisabled =
    formState.addedQuantity <= 0 && formState.removedQuantity <= 0;

  return (
    <Box sx={{ padding: "20px" }}>
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={3}>
          <Autocomplete
            value={metal}
            onChange={handleMetalChange}
            options={metalList}
            renderInput={(params) => <TextField {...params} label="Metal" />}
            disablePortal
            disableClearable
          />
          <TextField
            label="Quantity"
            variant="outlined"
            name="quantity"
            type="number"
            disabled
            InputLabelProps={{ shrink: true }}
            value={formState.quantity}
            onChange={handleFormChange}
          />
          <TextField
            label="Added Quantity"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            type="number"
            name="addedQuantity"
            value={formState.addedQuantity}
            onChange={handleFormChange}
          />
          <TextField
            label="Removed Quantity"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            type="number"
            name="removedQuantity"
            value={formState.removedQuantity}
            onChange={handleFormChange}
          />
          <TextField
            label="Final Quantity"
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            name="finalQuantity"
            disabled
            value={formState.finalQuantity}
          />
          <Button disabled={isButtonDisabled} variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
      {metalHistory.filter((item) => item.metal === metal).length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Number</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Added Quantity</TableCell>
                <TableCell align="center">Removed Quantity</TableCell>
                <TableCell align="center">Final Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...metalHistory]
                .filter((item) => item.metal === metal)
                .reverse()
                .map((row) => (
                  <TableRow
                    key={row.number}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.number}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{row.addedQuantity}</TableCell>
                    <TableCell align="center">{row.removedQuantity}</TableCell>
                    <TableCell align="center">{row.finalQuantity}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Box>
  );
}

export default App;
