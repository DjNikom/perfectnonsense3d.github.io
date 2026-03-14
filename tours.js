// --- GLOBALNE DANE ---
let tours = JSON.parse(localStorage.getItem("tours")) || [];
let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

// --- PANEL ADMINA ---
// ELEMENTY
const adminForm = document.getElementById("adminForm");
const adminList = document.getElementById("adminTourList");

// --- DODAWANIE WYJAZDU Z PLIKU OBRAZU ---
adminForm.addEventListener("submit", e=>{
  e.preventDefault();

  const fileInput = adminForm.imageFile.files[0];
  if(!fileInput) return alert("Wybierz obrazek!");

  const reader = new FileReader();
  reader.onload = function(event){
    const imageBase64 = event.target.result;

    const newTour = {
      title: adminForm.title.value,
      description: adminForm.description.value,
      price: parseInt(adminForm.price.value),
      image: imageBase64
    };

    tours.push(newTour);
    localStorage.setItem("tours", JSON.stringify(tours));
    renderAdminTours();
    adminForm.reset();
  };

  reader.readAsDataURL(fileInput);
});

// --- WYŚWIETLANIE WYJAZDÓW W ADMIN ---
function renderAdminTours(){
  adminList.innerHTML = "";
  tours.forEach((t,index)=>{
    const card = document.createElement("div");
    card.className="tour-card";
    card.innerHTML=`
      <img src="${t.image}" alt="${t.title}">
      <h3>${t.title}</h3>
      <p>${t.description}</p>
      <p class="price">${t.price} PLN</p>
      <button class="delete">Usuń</button>
    `;
    card.querySelector(".delete").addEventListener("click", ()=>{
      if(confirm(`Usunąć wycieczkę "${t.title}"?`)){
        tours.splice(index,1);
        localStorage.setItem("tours",JSON.stringify(tours));
        renderAdminTours();
      }
    });
    adminList.appendChild(card);
  });
}

// --- LOGOWANIE ADMINA ---
const loginForm = document.getElementById("loginForm");
const loginContainer = document.getElementById("loginContainer");
const adminSection = document.getElementById("adminSection");
loginContainer.style.display = "block";
adminSection.style.display = "none";

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;
  if(username==="admin" && password==="admin123"){
    loginContainer.style.display="none";
    adminSection.style.display="block";
    renderAdminTours();
    renderReservations();
  } else { alert("Nieprawidłowy login lub hasło!"); }
});

// --- WYŚWIETLANIE REZERWACJI W ADMIN ---
function renderReservations(){
  const reservationList = document.getElementById("reservationList");
  reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  if(reservations.length===0){
    reservationList.innerHTML="Brak rezerwacji.";
    return;
  }
  reservationList.innerHTML="";
  reservations.forEach(r=>{
    reservationList.innerHTML+=`<div>
      <b>${r.tour}</b> - ${r.name}, ${r.email}, ${r.phone}, ${r.people} os., data: ${r.date}
    </div><hr>`;
  });
}

// --- TOURS.HTML ---
// ELEMENTY MODALA
const tourGrid = document.getElementById("tourGrid");
const modal = document.getElementById("bookingModal");
const closeBtn = document.querySelector(".close");
const bookingForm = document.getElementById("bookingForm");

// --- GENEROWANIE KART WYJAZDÓW ---
function renderTours() {
  tourGrid.innerHTML = "";
  tours.forEach(tour => {
    const card = document.createElement("div");
    card.className = "tour-card";
    card.innerHTML = `
      <img src="${tour.image}" alt="${tour.title}">
      <h3>${tour.title}</h3>
      <p>${tour.description}</p>
      <p class="price">${tour.price} PLN</p>
      <button class="btn-modern">Rezerwuj</button>
    `;
    card.querySelector("button").addEventListener("click", () => openBooking(tour.title));
    tourGrid.appendChild(card);
  });
}

// --- OTWIERANIE MODALA ---
function openBooking(tourTitle){
  modal.style.display = "block";
  bookingForm.dataset.tour = tourTitle;
}

// --- ZAMYKANIE MODALA ---
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if(e.target == modal) modal.style.display = "none"; }

// --- OBSŁUGA FORMULARZA REZERWACJI ---
bookingForm.addEventListener("submit", e => {
  e.preventDefault();
  const data = {
    tour: bookingForm.dataset.tour,
    name: bookingForm.name.value,
    email: bookingForm.email.value,
    phone: bookingForm.phone.value,
    people: bookingForm.people.value,
    date: bookingForm.date.value
  };

  // zapis do localStorage
  let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  reservations.push(data);
  localStorage.setItem("reservations", JSON.stringify(reservations));

  alert(`Rezerwacja dla ${data.tour} wysłana!`);
  bookingForm.reset();
  modal.style.display = "none";
});

// --- START ---
document.addEventListener("DOMContentLoaded", ()=>{
  renderTours();
});