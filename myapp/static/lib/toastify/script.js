import {logDisplayName,createToastifyLogName} from "../../js/common/displayname.js"

let prev_logs = [];
let i = 0;

function toastify_inout_log(display_log) {
  Toastify({
    text: display_log,
    duration: 30000,
    close: true,
    gravity: "bottom",
    position: 'right',
    style: {
      color: "rgba(0, 0, 0, 1)",
      background: "rgba(255, 255, 255, 0.8)",
    }
  }).showToast();
  i++;
}


document.addEventListener("DOMContentLoaded", function () {
setInterval(async () =>{

let now_logs = await fetch_inout_log(prev_logs)
let newLogs = []
newLogs = now_logs.filter(now_log => now_log.new_data == true)
newLogs.forEach(newLog => {
  const newLogItem = logDisplayName(shelf_list,cell_list,pn_list,newLog);

  toastify_inout_log(createToastifyLogName(newLogItem));
});

prev_logs = now_logs

},3000)


})




async function fetch_inout_log(prev_log) {
   try {
    const response = await fetch("/api/new_inout_log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prev_log)
    });
    if (!response.ok) {
      throw new Error("読み込みエラー");
    }

    const result = await response.json();

    // window.location.href = "/pn_ctrl";
    return result
  } catch (error) {
    console.error("送信エラー:", error);
    alert("送信中にエラーが発生しました。コンソールを確認してください。");
  }

}



// var bgColors = [
//   "rgba(255, 255, 255, 0.8)",
// ],
//   i = 0;
// // Displaying toast on manual action `Try`
// document.getElementById("search-button").addEventListener("click", function () {
//   Toastify({
//     text: "10/16 14:18:36 棚：A 背番号:798 長尺長さ:4985 出庫 変更数:1",
//     duration: 30000,
//     close: true,
//     gravity: "bottom",
//     position: 'right',
//     style: {
//       color: "rgba(0, 0, 0, 1)",
//       background: bgColors[0],
//     }
//   }).showToast();
//   i++;
// });

// duration
// toastifyクラスをqueryselectorでgetし、要素が残り1なら0、１なら前に残っているオブジェクトを取得しdurationの値を書き換える、2以上ならduration:100000
//  window.clearTimeout



// Toastify({
//   text: "Hi",
//   duration: 4500,
//   destination: "https://github.com/apvarun/toastify-js",
//   newWindow: true,
//   gravity: "top",
//   position: 'left',
// }).showToast();

// setTimeout(function() {
//   Toastify({
//     text: "Simple JavaScript Toasts",
//     gravity: "top",
//     position: 'center',
//     style: {
//       background: '#0f3443'
//     }
//   }).showToast();
// }, 1000);

// // Options for the toast
// var options = {
//   text: "Happy toasting!",
//   duration: 2500,
//   callback: function() {
//     console.log("Toast hidden");
//     Toastify.reposition();
//   },
//   close: true,
//   style: {
//     background: "linear-gradient(to right, #00b09b, #96c93d)",
//   }
// };

// // Initializing the toast
// var myToast = Toastify(options);

// // Toast after delay
// setTimeout(function() {
//   myToast.showToast();
// }, 4500);

// setTimeout(function() {
//   Toastify({
//     text: "Highly customizable",
//     gravity: "bottom",
//     position: 'left',
//     close: true,
//     style: {
//       background: "linear-gradient(to right, #ff5f6d, #ffc371)",
//     }
//   }).showToast();
// }, 3000);

