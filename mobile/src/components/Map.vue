<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

let map: L.Map | undefined;

const fountainsData = [
  {
    id: 1,
    name: 'Fountain #1 - Boa Passagem',
    address: 'Boa Passagem, Caicó, Rio Grande do Norte, Brazil',
    latitude: -6.446786,
    longitude: -37.092069,
  },
];

function addFountains() {
  if (!map) return;

  fountainsData.forEach((fountain) => {
    L.marker([fountain.latitude, fountain.longitude])
        .addTo(map!)
        .bindPopup(`
        <strong>${fountain.name}</strong>
        <br>
        ${fountain.address}
      `);
  });
}

function initializeMap(latitude: number, longitude: number) {
  if (map) return;

  map = L.map('map').setView([latitude, longitude], 15);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup('You are here!');

  addFountains();

  const positions = [
    L.latLng(latitude, longitude),
    ...fountainsData.map((fountain) =>
        L.latLng(fountain.latitude, fountain.longitude),
    ),
  ];

  map.fitBounds(L.latLngBounds(positions), {
    padding: [30, 30],
    maxZoom: 15,
  });
}

onMounted(() => {
  if (!navigator.geolocation) {
    initializeMap(-6.446786, -37.092069);
    return;
  }

  navigator.geolocation.getCurrentPosition(
      (position) => {
        initializeMap(
            position.coords.latitude,
            position.coords.longitude,
        );
      },
      (error) => {
        console.error('Unable to obtain your location:', error.message);
        initializeMap(-6.446786, -37.092069);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
  );
});

onBeforeUnmount(() => {
  map?.remove();
  map = undefined;
});
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
}
</style>