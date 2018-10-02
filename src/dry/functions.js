export const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const checkReq = (have, need) => have >= need;
