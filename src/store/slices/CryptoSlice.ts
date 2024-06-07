/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAssetsCrypto } from "../../services/Crypto";
import { AxiosError } from "axios";
import { Crypto } from "../../models/Crypto";


interface CryptoState {
    assets: Crypto[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

interface RejectionValue {
    error: string;
}


const initialState: CryptoState = {
    assets: [],
    status: "idle",
    error: null
}

export const getAssets = createAsyncThunk("crypto/getAssets", async (_, thunkApi) => {
    try {
        const response = await getAssetsCrypto({ vs_currency: "usd" });
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            return thunkApi.rejectWithValue({ error: error.message });
        }
    }
});


const cryptoSlice = createSlice({
    name: "crypto",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAssets.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAssets.fulfilled, (state, action) => {
                state.status = "succeeded";
                if (action.payload) {
                    state.assets = action.payload
                }
            })
            .addCase(getAssets.rejected, (state, action: PayloadAction<unknown, string, { arg: void; requestId: string; requestStatus: "rejected"; aborted: boolean; condition: boolean; } & ({ rejectedWithValue: true; } | ({ rejectedWithValue: false; })), SerializedError>) => {
                state.status = "failed";
                state.error = (action.payload as RejectionValue).error;
            });
    }
});

export default cryptoSlice.reducer;