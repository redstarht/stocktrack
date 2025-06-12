document.addEventListener("DOMContentLoaded", function () {
    const shelfGridElm = document.getElementById("shelfGrid");

    shelf_list.forEach(shelfItem => {
        // shelfContainerにcellが入る
        const shelfContainer = document.createElement("div");
        const shelfLabel = document.createElement("div");
        const shelfTitle = document.createElement("div");

        shelfTitle.textContent = shelfItem.name;
        shelfContainer.dataset.shelf = shelfItem.name;

        shelfLabel.appendChild(shelfTitle);
        shelfContainer.appendChild(shelfLabel);
        shelfGridElm.appendChild(shelfContainer);
    });


    const columnMap = {
        A: 1,
    }

    const cellMap = {
        A: 4,
        B: 6,
        K: 6,
        T: 10
    }

    if 
    


});