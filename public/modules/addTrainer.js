const addTrainerButton = document.querySelector(".add-trainer-button");
const modal = document.querySelector(".add-trainer");

addTrainerButton.addEventListener("click", () => {
  modal.style.visibility = "visible";
});

modal.addEventListener("click", (e) => {
    if(e.target === e.currentTarget) {
        modal.style.visibility = "hidden";
    }
});
