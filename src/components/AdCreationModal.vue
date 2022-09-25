<template>
	<TransitionRoot appear :show="modelValue" as="template">
		<Dialog as="div" @close="closeModal" class="relative z-10">
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-200 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black bg-opacity-60" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div
					class="flex min-h-full items-center justify-center p-4 text-center"
				>
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel
							class="flex flex-col gap-8 bg-[#2A2634] text-white w-full max-w-[488px] px-10 py-8 rounded-lg transform overflow-hidden shadow-md transition-all"
						>
							<DialogTitle
								as="h2"
								class="text-3xl text-start font-black leading-[160%] tracking-[-0.69px]"
							>
								Publique um anúncio
							</DialogTitle>

							<form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
								<InputField
									label="Qual o game?"
									input-class="w-full"
									input-placeholder="Selecione o game que deseja jogar"
									required
								>
									<Combobox v-model="selectedGameId" class="w-full">
										<div class="relative mt-1">
											<div>
												<ComboboxInput
													class="w-full bg-zinc-900 text-white text-sm placeholder:text-zinc-500 px-3 py-4 rounded-[0.25rem]"
													:display-value="gameId => gameNamesById[gameId as string] || 'Selecione o game que deseja jogar'"
													@change="handleGameSelectionChange"
													:ref="el => setGameSelectionValidation(el as ComponentPublicInstance)"
												/>
												<ComboboxButton
													class="absolute inset-y-0 right-0 flex items-center"
												>
													<PhCaretDown
														size="24"
														class="text-zinc-400 mr-4"
														aria-hidden="true"
													/>
												</ComboboxButton>
											</div>
											<TransitionRoot
												leave="transition ease-in duration-100"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
												@after-leave="gameTextQuery = ''"
											>
												<ComboboxOptions
													class="w-full bg-zinc-900 text-white text-sm placeholder:text-zinc-500 rounded-[0.25rem] absolute mt-1 max-h-60 overflow-auto"
												>
													<div
														v-if="
															filteredGames.length === 0 && gameTextQuery !== ''
														"
														class="relative cursor-default select-none py-2 px-4 text-zinc-300"
													>
														Nenhum game encontrado
													</div>

													<ComboboxOption
														v-for="game in filteredGames"
														as="template"
														:key="game.id"
														:value="game.id"
														v-slot="{ selected }"
													>
														<li
															class="relative cursor-pointer select-none px-3 py-4 text-white hover:bg-zinc-800"
															:class="{
																'bg-violet-500 hover:!bg-violet-600': selected
															}"
														>
															<span
																class="block truncate"
																:class="{
																	'font-medium': selected,
																	'font-normal': !selected
																}"
															>
																{{ game.title }}
															</span>
														</li>
													</ComboboxOption>
												</ComboboxOptions>
											</TransitionRoot>
										</div>
									</Combobox>
								</InputField>

								<InputField
									v-model.trim="nameOrNickname"
									label="Seu nome (ou nickname)"
									input-placeholder="Como te chamam dentro do game?"
									input-class="w-full"
									required
								/>

								<div class="flex gap-6">
									<InputField
										v-model.number="yearsPlaying"
										input-type="number"
										label="Joga há quantos anos?"
										input-placeholder="Tudo bem ser ZERO"
										input-class="w-full"
										required
									/>

									<InputField
										v-model.trim="discordName"
										label="Qual seu Discord?"
										input-placeholder="Usuario#0000"
										input-class="w-full"
										required
									/>
								</div>

								<div class="flex flex-col justify-center items-start gap-2">
									<span
										class="text-white text-base font-semibold leading-[26px] tracking-[-0.18px]"
									>
										Quando costuma jogar?
									</span>

									<div class="flex w-full justify-between items-center">
										<label
											v-for="day in weekDaysOptions"
											:key="`week-day-checkbox:${day.value}`"
											:for="`week-day-checkbox:${day.value}`"
											class="block relative w-10 h-10 cursor-pointer"
											:title="day.name"
										>
											<input
												type="checkbox"
												v-model="weekDaysPlaying"
												class="appearance-none w-full h-full rounded-md bg-zinc-900 checked:bg-violet-500 text-white cursor-pointer"
												:value="day.value"
												:text="day.text"
												:id="`week-day-checkbox:${day.value}`"
												:ref="(el) => setWeekDaysValidation(el as HTMLInputElement)"
											/>
											<span
												class="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold leading-[26px] tracking-[-0.18px]"
											>
												{{ day.text }}
											</span>
										</label>
									</div>
								</div>

								<div class="flex gap-4">
									<InputField
										label="A partir de qual horário?"
										class="flex-1"
										v-slot="{ id }"
									>
										<TimeInput
											v-model="hourStart"
											:id="id"
											class="w-full"
											required
										/>
									</InputField>

									<InputField
										label="Até qual horário?"
										class="flex-1"
										v-slot="{ id }"
									>
										<TimeInput
											v-model="hourEnd"
											:id="id"
											class="w-full"
											required
										/>
									</InputField>
								</div>

								<label
									for="use-voice-channel-checkbox"
									class="flex gap-2 cursor-pointer mt-2 text-sm text-white font-normal leading-[26px] tracking-[-0.09px] select-none"
								>
									<div class="relative w-6 h-6">
										<input
											type="checkbox"
											v-model="useVoiceChannel"
											id="use-voice-channel-checkbox"
											class="appearance-none w-full h-full bg-zinc-900 rounded-[0.25rem] cursor-pointer"
										/>
										<PhCheck
											v-show="useVoiceChannel"
											size="16"
											class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-emerald-400"
										/>
									</div>

									Costumo me conectar ao chat de voz
								</label>

								<footer class="flex justify-end items-center gap-4 mt-4">
									<button
										class="flex items-center gap-3 bg-zinc-500 hover:bg-zinc-600 transition-colors duration-200 px-4 py-3 text-white font-medium rounded-md"
										@click="closeModal"
										type="button"
									>
										Cancelar
									</button>
									<button
										class="flex items-center gap-3 bg-violet-500 hover:bg-violet-600 transition-colors duration-200 px-4 py-3 text-white font-medium rounded-md"
										type="submit"
									>
										<PhGameController size="24" />
										Encontrar duo
									</button>
								</footer>
							</form>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup lang="ts">
	import { ComponentPublicInstance, computed, reactive, ref, watch } from 'vue';
	import {
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogPanel,
		DialogTitle,
		Combobox,
		ComboboxInput,
		ComboboxButton,
		ComboboxOptions,
		ComboboxOption
	} from '@headlessui/vue';
	import { PhGameController, PhCheck, PhCaretDown } from 'phosphor-vue';

	import { Game } from '@/App.vue';
	import InputField from '@/components/InputField.vue';
	import TimeInput from '@/components/TimeInput.vue';

	const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

	const props = withDefaults(
		defineProps<{ modelValue: boolean; games?: Game[] }>(),
		{
			games: () => []
		}
	);

	const emit = defineEmits<{
		(e: 'update:modelValue', value: boolean): void;
	}>();

	const customValidations = reactive({
		gameSelection: {
			isDone: false,
			removeWatcher: () => {}
		},
		weekDays: {
			isDone: false,
			removeWatcher: () => {}
		}
	});

	function closeModal() {
		Object.values(customValidations).forEach(validation =>
			validation.removeWatcher()
		);

		emit('update:modelValue', false);
	}

	function openModal() {
		emit('update:modelValue', true);
	}

	const gamesList = ref<Game[]>([]);

	if (props.games.length) {
		gamesList.value = props.games;
	} else {
		fetch(`${BASE_API_URL}/games`).then(async res => {
			const responseJson: Game[] = await res.json();

			gamesList.value = responseJson;
		});
	}

	const gameNamesById = computed<{ [key: string]: string }>(() =>
		gamesList.value.reduce(
			(acc, game) => ({
				...acc,
				[game.id]: game.title
			}),
			{}
		)
	);

	const gameTextQuery = ref('');
	const selectedGameId = ref('');

	const filteredGames = computed(() =>
		gameTextQuery.value === ''
			? gamesList.value
			: gamesList.value.filter(game =>
					game.title
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(gameTextQuery.value.toLowerCase().replace(/\s+/g, ''))
			  )
	);

	function handleGameSelectionChange(e: Event & { target: HTMLInputElement }) {
		gameTextQuery.value = e.target.value;
	}

	function setGameSelectionValidation(
		inputComponent: ComponentPublicInstance | null
	) {
		const input: HTMLInputElement | null = inputComponent?.$el;

		if (customValidations.gameSelection.isDone || !input) return;

		const errorMessage = 'Selecione um game';

		input.setCustomValidity(errorMessage);

		customValidations.gameSelection.removeWatcher = watch(
			selectedGameId,
			gameId => {
				const message = gameId ? '' : errorMessage;

				input.setCustomValidity(message);
			}
		);

		customValidations.gameSelection.isDone = true;
	}

	interface WeekDayOption {
		text: string;
		name: string;
		value: number;
	}

	const weekDaysOptions: WeekDayOption[] = [
		{ text: 'D', name: 'Domingo', value: 0 },
		{ text: 'S', name: 'Segunda', value: 1 },
		{ text: 'T', name: 'Terça', value: 2 },
		{ text: 'Q', name: 'Quarta', value: 3 },
		{ text: 'Q', name: 'Quinta', value: 4 },
		{ text: 'S', name: 'Sexta', value: 5 },
		{ text: 'S', name: 'Sábado', value: 6 }
	];

	function setWeekDaysValidation(checkbox: HTMLInputElement) {
		if (
			customValidations.weekDays.isDone ||
			+checkbox.value !== weekDaysOptions[0].value
		)
			return;

		customValidations.weekDays.removeWatcher = watch(weekDaysPlaying, value => {
			const atLeastOneWeekDayWasSelected = value.length > 0;

			const message = atLeastOneWeekDayWasSelected
				? ''
				: 'Marque ao menos um dia da semana';

			checkbox.setCustomValidity(message);
		});

		customValidations.weekDays.isDone = true;
	}

	const weekDaysPlaying = ref<WeekDayOption[]>([]);
	const useVoiceChannel = ref(false);
	const nameOrNickname = ref('');
	const yearsPlaying = ref<number | null>(null);
	const discordName = ref('');
	const hourStart = ref('');
	const hourEnd = ref('');

	async function handleSubmit() {
		await fetch(`${BASE_API_URL}/ads`, {
			method: 'POST',
			body: JSON.stringify({
				gameId: selectedGameId.value,
				name: nameOrNickname.value,
				discord: discordName.value,
				weekDays: weekDaysPlaying.value.sort(),
				yearsPlaying: yearsPlaying.value,
				hourStart: hourStart.value,
				hourEnd: hourEnd.value,
				useVoiceChannel: useVoiceChannel.value
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		alert('Anúncio criado com sucesso!');

		closeModal();
	}
</script>
