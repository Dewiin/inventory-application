const addTrainerButton = document.querySelector(".add-trainer-button");
const modal = document.querySelector(".add-trainer");

addTrainerButton.addEventListener("click", () => {
  modal.classList.add("visible");
});

modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    modal.classList.remove("visible");
  }
});
