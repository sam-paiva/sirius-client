import api from "../axios";
import { AddJobRequest } from "./requests/addJobRequest";

export const addJob = (job: AddJobRequest) => {
    return api.post('/jobs', job);
}