import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    logs: [],
};

const logSlice = createSlice({
    name: 'logs',
    initialState,
    reducers: {
        setLogs: (state, action) => {
            state.logs = action.payload; // Expects an array of logs
        },
        clearLogs: (state) => {
            state.logs = [];
        },

        updateLog: (state, action) => {
            const updatedLog = action.payload;
            const index = state.logs.findIndex(log => log.date === updatedLog.date);
            if (index !== -1) {
                state.logs[index] = updatedLog; // update existing
            } else {
                state.logs.push(updatedLog); // if not found, add (fail-safe)
            }
        }

    },
});

export const { setLogs, clearLogs, updateLog } = logSlice.actions;
export default logSlice.reducer;

