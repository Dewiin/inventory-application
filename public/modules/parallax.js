const parallaxBg = () => {
  const homeBackground = document.querySelector(".parallax-bg");
  const allPokemonView = document.querySelector(".all-pokemon-view");
  const navbar = document.querySelector(".navbar");

  const icons = document.querySelector(".icons");
  const typesNavbar = document.querySelector(".types-navbar");

  window.addEventListener("mousemove", function (e) {
    const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

    homeBackground.style.transform = `translate(${xPos * 30}px, ${yPos * 30}px)`;

    if (allPokemonView) {
      allPokemonView.style.transform = `translate(${xPos * 5}px, ${yPos * 5}px)`;
    }
  });

  navbar.addEventListener("mousemove", function (e) {
    const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

    icons.style.transform = `translate(${xPos * 10}px, ${yPos * 10}px)`;
    if (typesNavbar) {
      typesNavbar.style.transform = `translate(${xPos * 10}px, ${yPos * 10}px)`;
    }
  });
};

parallaxBg();
