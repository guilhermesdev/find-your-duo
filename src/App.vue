<template>
	<div class="max-w-[1344px] px-5 mx-auto flex flex-col items-center my-20">
		<img :src="NLWeSportsLogo" alt="Logo do NLW eSports" />

		<h1 class="text-6xl text-white text-center font-black mt-20">
			Seu
			<span
				class="bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D] bg-clip-text text-transparent"
			>
				duo
			</span>
			está aqui
		</h1>

		<!-- class="grid grid-cols-3 md:grid-cols-6 gap-6 mt-16 keen-slider" -->
		<ul class="keen-slider mt-16" ref="gamesSlider">
			<!-- TODO: alterar de `li` para `router-link` quando o Vue Router estiver instalado -->
			<GameCard
				v-for="game in games"
				:key="`game-card:${game.id}`"
				as="li"
				:name="game.title"
				:number-of-ads="game._count.ads"
				:image="game.bannerUrl"
				class="keen-slider__slide cursor-pointer"
			/>
		</ul>

		<AdCreationSection class="self-stretch mt-8" :games="games" />
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useKeenSlider } from 'keen-slider/vue';

	import NLWeSportsLogo from '@/assets/nlw-esports-logo.svg';
	import GameCard from '@/components/GameCard.vue';
	import AdCreationSection from '@/components/AdCreationSection.vue';

	export interface Game {
		id: string;
		title: string;
		bannerUrl?: string;
		_count: {
			ads: number;
		};
	}

	const BASE_API_URL = import.meta.env.VITE_BASE_API_URL as string;

	const games = ref<Game[]>([]);

	const ResizePlugin = (slider: any) => {
		const observer = new ResizeObserver(() => slider.update());

		slider.on('created', () => {
			observer.observe(slider.container);
		});
		slider.on('destroyed', () => {
			observer.unobserve(slider.container);
		});
	};

	const [gamesSlider, slider] = useKeenSlider(
		{
			loop: true,
			drag: true,
			created({ update }) {
				update();
			},
			slides: {
				origin: 'center',
				perView: 6,
				spacing: 25
			}
		},
		[ResizePlugin]
	);

	fetch(`${BASE_API_URL}/games`).then(async res => {
		const responseJson: Game[] = await res.json();

		games.value = responseJson;
	});
</script>

<style scoped></style>
