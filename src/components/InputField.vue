<template>
	<label
		:for="id"
		class="flex flex-col justify-center items-start gap-2 text-white text-base font-semibold leading-[26px] tracking-[-0.18px] cursor-pointer"
	>
		{{ label }}
		<slot :id="id">
			<VInput
				:type="inputType"
				:id="id"
				:class="inputClass"
				:placeholder="inputPlaceholder"
				:required="$attrs.required"
				@input="$emit('update:modelValue', $event.target.value)"
			/>
		</slot>
	</label>
</template>

<script setup lang="ts">
	import VInput from '@/components/VInput.vue';

	withDefaults(
		defineProps<{
			label: string;
			inputClass?: string;
			inputPlaceholder?: string;
			inputType?: string;
		}>(),
		{ inputType: 'text' }
	);

	const id = 'input-field-' + Math.random().toString(26);
</script>
