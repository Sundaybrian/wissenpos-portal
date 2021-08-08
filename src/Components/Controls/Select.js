import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Select as MuiSelect } from "@material-ui/core";

function Select(props) {
    const { name, onChange, label, options, value } = props;

    return (
        <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
                {label}
            </InputLabel>
            <MuiSelect
                labelId="demo-simple-select-outlined-label"
                name={name}
                id="demo-simple-select-outlined"
                value={value}
                onChange={onChange}
                label={label}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {options.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                        {item.value}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
}

export default Select;
