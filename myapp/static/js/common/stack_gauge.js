export function stackGaugeCreate (max_qty,stock_qty,stackElm){
    stackElm.innerHTML="";
    for(let i =0;i<max_qty;i++){
        const box = document.createElement("div");
        box.classList.add("stack-box");
        if(i<stock_qty){
            box.classList.add("filled");
            stackElm.appendChild(box);
        }
    }
}