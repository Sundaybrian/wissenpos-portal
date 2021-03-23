import {
    FormControlLabel,
    RadioGroup as MuiRadioGroup,
    FormControl,
    FormLabel,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import React from "react";

function RadioGroup(props) {
    const { name, value, onChange, label, items } = props;
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row name={name} value={value} onChange={onChange}>
                {items.map((item) => (
                    <FormControlLabel
                        key={item.id}
                        control={<Radio />}
                        label={item.title}
                    ></FormControlLabel>
                ))}
            </MuiRadioGroup>
        </FormControl>
    );
}

export default RadioGroup;
