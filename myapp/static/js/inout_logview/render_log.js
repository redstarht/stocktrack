import { inoutLogRecCreate } from "./logrecCreate.js" 

document.addEventListener("DOMContentLoaded", function () {
  const tableElm = document.getElementById("log-table");
  inoutLogRecCreate(inout_log_list,tableElm);

})
