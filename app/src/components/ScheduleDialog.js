import React, { useState } from "react";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import helper from "../Helper";

export default function ScheduleTimeDialog(props) {
    const [selectedDate, setSelectedDate] = useState(helper.isValidDate(props.currentDate)? new Date(props.currentDate): new Date());
    const [disableOkButton, setDisableOkButton] = useState(false);

    const handleDateChange = (date) => {
        let isValid = helper.isValidDate(date);
        setDisableOkButton(!isValid);
        if (isValid) {
            setSelectedDate(date);
        }
    };

    return (
        <div>
            <Dialog open={props.open} onClose={props.closeDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Schedule</DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">

                            <Grid item xs={6}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={props.closeDialog}>
                        Cancel
                     </Button>
                    <Button disabled={disableOkButton} onClick={() => props.updateScheduleDate(selectedDate)} color="primary">
                        Ok
                     </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

ScheduleTimeDialog.propTypes = {
    open: PropTypes.any.isRequired,
    closeDialog: PropTypes.any.isRequired
};