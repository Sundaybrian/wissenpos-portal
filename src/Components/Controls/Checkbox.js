import React from "react";
import {
    Checkbox as MuiCheckbox,
    FormControlLabel,
    FormControl,
} from "@material-ui/core";

function Checkbox(props) {
    const { onChange, name, color, checked, label } = props;

    const formatToDefaultEventPara = (name, value) => ({
        target: {
            name,
            value,
        },
    });
    return (
        <FormControl>
            <FormControlLabel
                control={
                    <MuiCheckbox
                        checked={checked}
                        onChange={(e) =>
                            onChange(
                                formatToDefaultEventPara(name, e.target.checked)
                            )
                        }
                        name={name}
                        color={color}
                    />
                }
                label={label}
            />
        </FormControl>
    );
}

export default Checkbox;
