<template>
  <Layout>
    <main>
      <h1>MUSTIT-PUB-SCHEDULE</h1>
      <p>머스트잇 퍼블 파트 스케줄 노션 API 사용해서 불러오는 테스트입니다.</p>

      <h2>Upcoming Streams</h2>
      <LiveStreamTable :streams="upcomingStreams" />

      <h2>Archived Streams</h2>
      <LiveStreamTable :streams="archivedStreams" />
    </main>
  </Layout>
</template>

<script setup>
import LiveStreamTable from "./components/LiveStreamTable.vue";
import { ref, onMounted, computed } from "vue";
let streams = ref([]);
const upcomingStreams = computed(() => {
  return streams.value.filter(
    (stream) => new Date(stream.startDate) >= new Date()
  );
});
const archivedStreams = computed(() => {
  return streams.value.filter(
    (stream) => new Date(stream.startDate) < new Date()
  );
});
onMounted(() => {
  fetch("/.netlify/functions/streams")
    .then((res) => res.json())
    .then((data) => {
      streams.value = data;
      console.log(streams.value);
    });
});
</script>
Footer © 2022 GitHub, Inc. Footer navigation Terms Privacy
