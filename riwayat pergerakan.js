// DOM Elements
const dates = document.getElementById("dates");
const current_month = document.getElementById("current-month");
const btn_prev_month = document.getElementById("prev-month");
const btn_next_month = document.getElementById("next-month");
const table_title = document.getElementById("table-title");
const map = L.map("map");
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const BASE_URL = "https://demo-tiger.vercel.app/lokasi/riwayat?date=";

//global state
let active_date;
let layer;

//state modifier
function changeActiveDate(new_active_date) {
  if (active_date) active_date.classList.remove("active");
  active_date = new_active_date;
  active_date.classList.add("active");
}

// remove all map markers
function removeAllMarkers() {
  map.removeLayer(layer);
}

// Function to add markers to the map with new data
function addMarkers(data) {
  const formatted = data.map((item) => item["data"]);
  const line = L.polyline(formatted).addTo(map);
  layer = line;
}

// Sample function to update the map when the data changes
function updateMapWithNewData(newData) {
  removeAllMarkers(); // Remove all existing markers
  addMarkers(newData); // Add new markers with the updated data
}

// Date
const current_date = new Date();
let selected_date = current_date;
const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// utilities function
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
const getStartDays = (year, month) => new Date(year, month, 1).getDay();
const formatEpochWithHourtoWithout = (epoch) => {
  const date1 = new Date(epoch);
  return new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  ).getTime();
};

function dateClickEvent(date) {
  const updatedDate = new Date(Number.parseInt(date));
  fetch(BASE_URL + new Date(Number.parseInt(date)).toDateString())
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      updateMapWithNewData(res);
      table_title.innerText = `${updatedDate.getDate()} ${
        MONTH[updatedDate.getMonth()]
      } ${updatedDate.getFullYear()}`;
    });
}

function generateDates(date) {
  // generate date element with given date object
  dates.innerHTML = "";
  for (let i = 0; i < getStartDays(date.getFullYear(), date.getMonth()); i++) {
    const child = document.createElement("div");
    dates.append(child);
  }

  for (
    let i = 1;
    i <= daysInMonth(date.getFullYear(), date.getMonth() + 1);
    i++
  ) {
    const child = document.createElement("p");
    child.innerText = i;
    child.classList.add("date");
    child.setAttribute(
      "data-date",
      new Date(date.getFullYear(), date.getMonth(), i).getTime()
    );
    child.addEventListener("click", function (ev) {
      changeActiveDate(this);
      dateClickEvent(this.getAttribute("data-date"));
    });
    if (
      i == current_date.getDate() &&
      date.getMonth() == current_date.getMonth() &&
      date.getFullYear() == current_date.getFullYear()
    ) {
      child.classList.add("today");
    }
    dates.append(child);
  }
  current_month.innerText = `${MONTH[date.getMonth()]} ${date
    .getFullYear()
    .toString()}`;
}

function createTableDataElement(jam, data) {
  // create single table data element
  const tr = document.createElement("tr");
  const td_jam = document.createElement("td");
  const td_lat = document.createElement("td");
  const td_long = document.createElement("td");
  td_jam.innerText = jam;
  td_lat.innerText = data[0];
  td_long.innerText = data[1];
  tr.append(td_jam, td_lat, td_long);
  table_data.append(tr);
}

function generateTableData(data, key = ["jam", "data"]) {
  // generate table data from data array
  table_data.innerHTML = "";
  for (const d of data) {
    createTableDataElement(d[key[0]], d[key[1]]);
  }
}

// initialize default view
document.addEventListener("DOMContentLoaded", () => {
  generateDates(current_date);
  // set default table data
  table_title.innerText = `${current_date.getDate()} ${
    MONTH[current_date.getMonth()]
  } ${current_date.getFullYear()}`;
  changeActiveDate(document.getElementsByClassName("today")[0]);
  fetch(BASE_URL + new Date().toDateString())
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      const middleData = res[Math.floor((res.length - 1) / 2)];
      map.setView(middleData["data"], 14);
      addMarkers(res);
    });
});

// all event
btn_prev_month.addEventListener("click", () => {
  selected_date = new Date(
    selected_date.getFullYear(),
    selected_date.getMonth() - 1,
    1
  );
  console.log(selected_date);
  generateDates(selected_date);
});

btn_next_month.addEventListener("click", () => {
  selected_date = new Date(
    selected_date.getFullYear(),
    selected_date.getMonth() + 1,
    1
  );
  console.log(selected_date);
  generateDates(selected_date);
});

// table data dummy
