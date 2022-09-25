<template>
	<component :is="as" class="relative rounded-lg overflow-hidden">
		<img :src="image" :alt="`Imagem de capa do jogo ${name}`" />

		<div
			class="absolute inset-x-0 bottom-0 flex flex-col justify-end items-start h-1/2 px-4 pb-4 game-info-bg"
		>
			<strong class="font-bold text-white leading-5 tracking-[-0.18px]">
				{{ name }}
			</strong>
			<span class="text-zinc-300 text-sm leading-4 tracking-[-0.18px] mt-1">
				{{ numberOfAds }} anúncios
			</span>
		</div>
	</component>
</template>

<script setup lang="ts">
	interface GameCardProps {
		as?: string;
		image?: string;
		name: string;
		numberOfAds: number;
	}

	withDefaults(defineProps<GameCardProps>(), {
		as: 'div'
	});
</script>

<style scoped>
	.game-info-bg {
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.9) 67.08%
		);
	}
</style>
