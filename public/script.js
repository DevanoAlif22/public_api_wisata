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
  var inputan = document.querySelector(".input");
  if (responseElement.style.display === "none") {
    responseElement.style.display = "block";
    preElement.innerText = response;
    document.getElementById("getWisata").innerText = "Close";
    document.getElementById("getWisata").style.backgroundColor = "red";
    inputan.disabled = true;
  } else {
    responseElement.style.display = "none";
    document.getElementById("getWisata").innerText = "GET";
    document.getElementById("getWisata").style.backgroundColor = "#009c60";
    inputan.disabled = false;
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
        throw new Error("No place found with the specified kodeProvinsi");
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

document.getElementById("getDetail").addEventListener("click", function () {
  var kodeProvinsi = document.querySelector(".inputProvinsi").value;
  var kodeWisata = document.querySelector(".inputWisata").value;
  var url =
    "https://public-api-wisata.vercel.app/api/detail?kodeProvinsi=" +
    kodeProvinsi +
    "&place_id=" +
    kodeWisata;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "No place found with the specified kodeProvinsi or place_id"
        );
      }
      return response.json();
    })
    .then((data) => {
      var formattedResponse = JSON.stringify(data, null, 2);
      showResponseDetail(formattedResponse);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Error fetching data: " + error.message);
    });
});

function showResponseDetail(response) {
  var responseElement = document.getElementById("responseDetail");
  var preElement = document.getElementById("responsePreDetail");
  var inputProvinsi = document.querySelector(".inputProvinsi");
  var inputWisata = document.querySelector(".inputWisata");
  if (responseElement.style.display === "none") {
    responseElement.style.display = "block";
    preElement.innerText = response;
    document.getElementById("getDetail").innerText = "Close";
    document.getElementById("getDetail").style.backgroundColor = "red";
    inputProvinsi.disabled = true;
    inputWisata.disabled = true;
  } else {
    responseElement.style.display = "none";
    document.getElementById("getDetail").innerText = "GET";
    document.getElementById("getDetail").style.backgroundColor = "#009c60";
    inputProvinsi.disabled = false;
    inputWisata.disabled = false;
  }
}

document.querySelector(".inputProvinsi").addEventListener("input", function () {
  var kodeProvinsi = document.querySelector(".inputProvinsi").value;
  var kodeWisata = document.querySelector(".inputWisata").value;
  if (kodeProvinsi === "") {
    if (kodeWisata === "") {
      var url =
        "https://public-api-wisata.vercel.app/api/detail?kodeProvinsi={kode provinsi}&place_id={place_id}";
    } else {
      var url =
        "https://public-api-wisata.vercel.app/api/detail?kodeProvinsi={kode provinsi}&place_id=" +
        kodeWisata;
    }
    document.querySelector(".kodeDetail").innerText = url;
  } else {
    if (kodeWisata === "") {
      var url =
        "https://public-api-wisata.vercel.app/api/detail?kodeProvinsi" +
        kodeProvinsi +
        "&place_id={place_id}";
    } else {
      var url =
        "https://public-api-wisata.vercel.app/api/detail?kodeProvinsi=" +
        kodeProvinsi +
        "&place_id=" +
        kodeWisata;
    }
    document.querySelector(".kodeDetail").innerText = url;
  }
});
document.querySelector(".inputWisata").addEventListener("input", function () {
  var kodeProvinsi = document.querySelector(".inputProvinsi").value;
  var kodeWisata = document.querySelector(".inputWisata").value;
  if (kodeWisata === "") {
    if (kodeProvinsi === "") {
      var url =
        "https://public-api-wisata.vercel.app/api/detail?kodeProvinsi={kode provinsi}&place_id={place_id}";
    } else {
      var url =
        "https://public-api-wisata.vercel.app/api/detail?kodeProvinsi=" +
        kodeProvinsi +
        "&place_id=" +
        "{place_id}";
    }
    document.querySelector(".kodeDetail").innerText = url;
  } else {
    if (kodeProvinsi === "") {
      var url =
        "https://public-api-wisata.vercel.app/api/detail?kodeProvinsi={kode provinsi}/" +
        kodeWisata;
    } else {
      var url =
        "https://public-api-wisata.vercel.app/api/detail?kodeProvinsi=" +
        kodeProvinsi +
        "&place_id=" +
        kodeWisata;
    }
    document.querySelector(".kodeDetail").innerText = url;
  }
});
