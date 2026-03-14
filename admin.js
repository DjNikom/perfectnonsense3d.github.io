const adminForm = document.getElementById("adminForm");
let tours = JSON.parse(localStorage.getItem("tours")) || [];

adminForm.addEventListener("submit", e=>{
  e.preventDefault();
  
  const fileInput = document.getElementById("imageFile").files[0];
  if(!fileInput) return alert("Wybierz obrazek!");

  const reader = new FileReader();
  reader.onload = function(event){
    const imageBase64 = event.target.result; // konwersja pliku na Base64

    const newTour = {
      title: adminForm.title.value,
      description: adminForm.description.value,
      price: parseInt(adminForm.price.value),
      image: imageBase64
    };

    tours.push(newTour);
    localStorage.setItem("tours", JSON.stringify(tours));
    alert("Wycieczka dodana!");
    adminForm.reset();
  };

  reader.readAsDataURL(fileInput); // odczyt obrazu
});