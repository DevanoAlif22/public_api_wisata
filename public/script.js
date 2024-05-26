document.getElementById("getProvinsi").addEventListener("click", function () {
  fetch("https://public-api-wisata.vercel.app/api/provinsi")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      var formattedResponse = JSON.stringify(data, null, 2);
      showResponse(formattedResponse);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Error fetching data: " + error.message);
    });
});

function showResponse(response) {
  var responseElement = document.getElementById("response");
  var preElement = document.getElementById("responsePre");
  if (responseElement.style.display === "none") {
    responseElement.style.display = "block";
    preElement.innerText = response;
    document.getElementById("getProvinsi").innerText = "Close";
    document.getElementById("getProvinsi").style.backgroundColor = "red";
  } else {
    responseElement.style.display = "none";
    document.getElementById("getProvinsi").innerText = "GET";
    document.getElementById("getProvinsi").style.backgroundColor = "#009c60";
  }
}
function showResponseWisata(response) {
  var responseElement = document.getElementById("responseWisata");
  var preElement = document.getElementById("responsePreWisata");
  if (responseElement.style.display === "none") {
    responseElement.style.display = "block";
    preElement.innerText = response;
    document.getElementById("getWisata").innerText = "Close";
    document.getElementById("getWisata").style.backgroundColor = "red";
  } else {
    responseElement.style.display = "none";
    document.getElementById("getWisata").innerText = "GET";
    document.getElementById("getWisata").style.backgroundColor = "#009c60";
  }
}

document.getElementById("getWisata").addEventListener("click", function () {
  var kodeProvinsi = document.querySelector(".input").value;
  var url =
    "https://public-api-wisata.vercel.app/api/wisata?kodeProvinsi=" +
    kodeProvinsi;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      var formattedResponse = JSON.stringify(data, null, 2);
      showResponseWisata(formattedResponse);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Error fetching data: " + error.message);
    });
});

document.querySelector(".input").addEventListener("input", function () {
  var kodeProvinsi = document.querySelector(".input").value;
  if (kodeProvinsi === "") {
    var url =
      "https://public-api-wisata.vercel.app/api/wisata?kodeProvinsi={kode provinsi}" +
      kodeProvinsi;
    document.querySelector(".kodeProvinsi").innerText = url;
  } else {
    var url =
      "https://public-api-wisata.vercel.app/api/wisata?kodeProvinsi=" +
      kodeProvinsi;
    document.querySelector(".kodeProvinsi").innerText = url;
  }
});
