import http from "./http-common";
import { createQueryParams } from "./utils";

const upsertResource = async ({
    id,
    task,
    repeat_interval,
    start_datetime,
    finish_datetime,
    successCallback = () => { },
    failCallback = () => { },
}) => {
    const params = createQueryParams({ task, repeat_interval, start_datetime, finish_datetime });
    try {
        if (id) {
            const res = await http.put(`todo-groups/${id}?${params}`);
        } else {
            const res = await http.post(`todo-groups/?${params}`);
        }
        successCallback();
    } catch (err) {
        failCallback();
    }
};

export default upsertResource;