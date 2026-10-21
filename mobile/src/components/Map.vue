<script setup lang="ts">
import {onMounted, onBeforeUnmount} from "vue";
import L from 'leaflet';

let map: L.Map | undefined;

onMounted(() => {
  if(!navigator.geolocation){
    console.error('Geolocation is not supported by the browser.');
  }

  navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const log = position.coords.longitude;

        map = L.map('map').setView([lat, log], 15);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        L.marker([lat,log]).addTo(map).bindPopup('You are here!').openPopup();
      }, error => {
        console.error('Unable to obtain your location', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
  )
});

onBeforeUnmount(() => {
  map?.remove();
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
}
</style>