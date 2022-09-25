<template>
	<VInput
		type="time"
		class="w-full [&::-webkit-calendar-picker-indicator]:hidden"
		@click="handleTimeInputFocus"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
</template>

<script setup lang="ts">
	import VInput from '@/components/VInput.vue';

	defineProps<{ modelValue: string }>();
	defineEmits<{ (e: 'update:modelValue'): void }>();

	function handleTimeInputFocus(e: Event) {
		const input = e.target as HTMLInputElement;

		input.showPicker();
	}
</script>
