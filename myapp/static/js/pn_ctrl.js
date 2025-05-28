document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("add-button").addEventListener("click", function() {
    const container = document.getElementById("input-container");

    const newRow = document.createElement("div");
    newRow.className = "input-row";

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "pn-input";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="bi bi-x-circle"></i>';
    deleteBtn.className = "delete-button";
    deleteBtn.addEventListener("click", function() {
      container.removeChild(newRow);
    });

    newRow.appendChild(newInput);
    newRow.appendChild(deleteBtn);
    container.appendChild(newRow);
  });

  document.querySelectorAll(".delete-button").forEach(button => {
    button.addEventListener("click", function() {
      this.parentElement.remove();
    });
  });
});
