<template>
  <div class="filter-group">
    <h2>Payment Methods</h2>
    <button class="small"
            @click="
                  arrayEquals(selectedPaymentTypes, paymentTypes.map(el => el.value))
                  ? selectedPaymentTypes = [] : selectedPaymentTypes = paymentTypes.map(el => el.value)"
    >
      <span v-if="arrayEquals(selectedPaymentTypes, paymentTypes.map(el => el.value))">Deselect all</span>
      <span v-else>Select all</span>
    </button>
    <FormulateInput
        type="checkbox"
        label="How do you want to be able to pay for the program?"
        v-model="selectedPaymentTypes"
        :options="paymentTypes"
    />
  </div>
</template>

<script>
  import { getState } from '@/store/getState';
  import { globals } from '@/assets/js/globals';

  export default {
    computed: {
      selectedPaymentTypes: getState.selectedPaymentTypes,
      paymentTypes: getState.paymentTypes
    },
    methods: {
      arrayEquals: globals.arrayEquals
    }
  }
</script>