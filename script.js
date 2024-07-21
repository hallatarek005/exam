const API_KEY = "d028c9980a051aff2ee44bc010c4b416";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggleButton = document.getElementById("menu-toggle");
  const sideMenu = document.getElementById("side-menu");
  const mainContent = document.getElementById("main-content");
  const searchInput = document.getElementById("search-input");

  if (!menuToggleButton || !sideMenu || !mainContent) {
    console.error("One or more menu-related elements are missing.");
    return;
  }

  menuToggleButton.addEventListener("click", () => {
    const isOpen = sideMenu.classList.contains("translate-x-0");

    console.log(`Menu is currently ${isOpen ? "open" : "closed"}`);

    if (isOpen) {
      sideMenu.classList.remove("translate-x-0");
      sideMenu.classList.add("-translate-x-full");
      mainContent.classList.remove("ml-64");
      menuToggleButton.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
      sideMenu.classList.remove("-translate-x-full");
      sideMenu.classList.add("translate-x-0");
      mainContent.classList.add("ml-64");
      menuToggleButton.innerHTML = '<i class="fas fa-times"></i>';
    }
  });

  // Fetch and display movies when input changes
  searchInput.addEventListener("input", async (event) => {
    const query = event.target.value.trim();
    if (query) {
      try {
        const response = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
        );
        const data = await response.json();
        displayMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    } else {
      // Clear results if query is empty
      fetchMovies();
    }
  });

  // Fetch popular movies initially
  fetchMovies();

  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const repasswordInput = document.getElementById("repassword");
  const submitButton = document.getElementById("submit-button");

  // Regular expressions for validation
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /.{8,}/; // At least 8 characters

  // Validate name
  nameInput.addEventListener("input", () => {
    if (!nameRegex.test(nameInput.value)) {
      nameInput.setCustomValidity(
        "Name should only contain letters and spaces."
      );
    } else {
      nameInput.setCustomValidity("");
    }
    nameInput.reportValidity();
  });

  // Validate email
  emailInput.addEventListener("input", () => {
    if (!emailRegex.test(emailInput.value)) {
      emailInput.setCustomValidity("Please enter a valid email address.");
    } else {
      emailInput.setCustomValidity("");
    }
    emailInput.reportValidity();
  });

  // Validate password
  passwordInput.addEventListener("input", () => {
    if (!passwordRegex.test(passwordInput.value)) {
      passwordInput.setCustomValidity(
        "Password must be at least 8 characters long."
      );
    } else {
      passwordInput.setCustomValidity("");
    }
    passwordInput.reportValidity();
  });

  // Validate repassword
  repasswordInput.addEventListener("input", () => {
    if (repasswordInput.value !== passwordInput.value) {
      repasswordInput.setCustomValidity("Passwords do not match.");
    } else {
      repasswordInput.setCustomValidity("");
    }
    repasswordInput.reportValidity();
  });

  form.addEventListener("input", () => {
    if (form.checkValidity()) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  });
});

// Define fetchMovies function in global scope
async function fetchMovies(category = "popular") {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${category}?api_key=${API_KEY}`
    );
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById("movies-container");
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add(
      "movie-card",
      "relative",
      "bg-gray-800",
      "rounded",
      "overflow-hidden",
      "shadow-lg"
    );

    const stars = getStars(movie.vote_average);

    movieCard.innerHTML = `
      <div class="relative overflow-hidden group">
  <img src="${IMG_BASE_URL + movie.poster_path}" alt="${
      movie.title
    }" class="w-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6 image-distort">
  <div class="movie-info absolute inset-0 bg-black bg-opacity-75 p-4 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <h3 class="text-lg font-bold text-center transform translate-y-10 group-hover:translate-y-0 group-hover:animate-slideInTop transition-transform duration-500 ease-out">
      ${movie.title}
    </h3>
    <p class="transform translate-x-10 group-hover:translate-x-0 group-hover:animate-slideInLeft transition-transform duration-500 ease-out">
      ${movie.overview}
    </p>
    <p class="mt-2">Release Date: ${movie.release_date}</p>
    <p class="mt-2">Rating: ${stars}</p>
  </div>
</div>



    `;

    moviesContainer.appendChild(movieCard);
  });
}

function getStars(vote_average) {
  const fullStars = Math.floor(vote_average / 2);
  const halfStar = vote_average % 2 >= 1 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  const fullStarIcon = '<i class="fas fa-star text-yellow-500"></i>';
  const halfStarIcon = '<i class="fas fa-star-half-alt text-yellow-500"></i>';
  const emptyStarIcon = '<i class="far fa-star text-yellow-500"></i>';

  return (
    fullStarIcon.repeat(fullStars) +
    halfStarIcon.repeat(halfStar) +
    emptyStarIcon.repeat(emptyStars)
  );
}

function scrollToFooter() {
  const footer = document.getElementById("footer");
  if (footer) {
    footer.scrollIntoView({ behavior: "smooth" });
  }
}
