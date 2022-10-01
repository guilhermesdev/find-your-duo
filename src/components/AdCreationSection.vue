<template>
  <section
    v-bind="$attrs"
    class="flex justify-between items-center relative before:absolute before:bg-gradient-to-r before:from-[#9572FC] before:via-[#43E7AD] before:to-[#E2D45C] before:inset-x-0 before:-top-1.5 before:h-full before:rounded-xl before:z-[-10] bg-[#2a2634] px-8 py-6 rounded-lg text-white"
  >
    <div>
      <strong class="block text-2xl font-black leading-9 tracking-[-0.47px]">
        Não encontrou seu duo?
      </strong>
      <span class="block text-zinc-400 leading-6 tracking-[-0.18px]">
        Publique um anúncio para encontrar novos players!
      </span>
    </div>

    <button
      class="flex items-center gap-3 bg-violet-500 hover:bg-violet-600 transition-colors duration-200 px-4 py-3 text-white font-medium rounded-md"
      @click="openAdCreationModal"
    >
      <PhMagnifyingGlassPlus size="24" />
      Publicar anúncio
    </button>
  </section>

  <Teleport to="body">
    <AdCreationModal v-model="isAdCreationModalOpen" />
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PhMagnifyingGlassPlus } from 'phosphor-vue';

import AdCreationModal from '@/components/AdCreationModal.vue';

const isAdCreationModalOpen = ref(false);

function openAdCreationModal() {
	isAdCreationModalOpen.value = true;
}
</script>
