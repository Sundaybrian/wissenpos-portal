import React from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

function DatePicker(props) {
    const { name, value, label, onChange } = props;
    const formatToDefaultEventPara = (name, value) => ({
        target: {
            name,
            value,
        },
    });
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                label={label}
                format="MMM/dd/yyyy"
                name={name}
                value={value}
                onChange={(date) =>
                    onChange(formatToDefaultEventPara(name, date))
                }
            ></KeyboardDatePicker>
        </MuiPickersUtilsProvider>
    );
}

export default DatePicker;
