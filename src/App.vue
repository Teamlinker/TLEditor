<template>
	<div style="width: 300px;height: 500px;">
		<tl-editor v-model="content" style="width: 100%;box-sizing: border-box"></tl-editor>
	</div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {IEditor_Content_Line} from "./components/editor/types";
import TlEditor from "./components/editor/index.vue";
const content=ref<IEditor_Content_Line[]>([])
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
