exports.getState = {
    programs: {
        get() {
            return this.$store.state.programs;
        },
        set(value) {
            this.$store.commit('updateValue', ['programs', value]);
        }
    },
    paymentTypes: {
        get() {
            return this.$store.state.paymentTypes;
        },
        set(value) {
            this.$store.commit('updateValue', ['paymentTypes', value]);
        }
    },
    trainingTypes: {
        get() {
            return this.$store.state.trainingTypes;
        },
        set(value) {
            this.$store.commit('updateValue', ['trainingTypes', value]);
        }
    },
    goals: {
        get() {
            return this.$store.state.goals;
        },
        set(value) {
            this.$store.commit('updateValue', ['goals', value]);
        }
    },
    levels: {
        get() {
            return this.$store.state.levels;
        },
        set(value) {
            this.$store.commit('updateValue', ['levels', value]);
        }
    },
    languages: {
        get() {
            return this.$store.state.languages;
        },
        set(value) {
            this.$store.commit('updateValue', ['languages', value]);
        }
    },
    extras: {
        get() {
            return this.$store.state.extras;
        },
        set(value) {
            this.$store.commit('updateValue', ['extras', value]);
        }
    },
    age: {
        get() {
            return this.$store.state.age;
        },
        set(value) {
            this.$store.commit('updateValue', ['age', value]);
        }
    },

    selectedPaymentTypes: {
        get() {
            return this.$store.state.selectedPaymentTypes;
        },
        set(value) {
            this.$store.commit('updateValue', ['selectedPaymentTypes', value]);
        }
    },
    selectedTrainingTypes: {
        get() {
            return this.$store.state.selectedTrainingTypes;
        },
        set(value) {
            this.$store.commit('updateValue', ['selectedTrainingTypes', value]);
        }
    },
    selectedGoals: {
        get() {
            return this.$store.state.selectedGoals;
        },
        set(value) {
            this.$store.commit('updateValue', ['selectedGoals', value]);
        }
    },
    selectedLevels: {
        get() {
            return this.$store.state.selectedLevels;
        },
        set(value) {
            this.$store.commit('updateValue', ['selectedLevels', value]);
        }
    },
    selectedLanguages: {
        get() {
            return this.$store.state.selectedLanguages;
        },
        set(value) {
            this.$store.commit('updateValue', ['selectedLanguages', value]);
        }
    },
    selectedExtras: {
        get() {
            return this.$store.state.selectedExtras;
        },
        set(value) {
            this.$store.commit('updateValue', ['selectedExtras', value]);
        }
    },
    selectedAges: {
        get() {
            return this.$store.state.selectedAges;
        },
        set(value) {
            this.$store.commit('updateValue', ['selectedAges', value]);
        }
    },

    hoursPerDay: {
        get() {
            return this.$store.state.hoursPerDay;
        },
        set(value) {
            this.$store.commit('updateValue', ['hoursPerDay', value]);
        }
    },
    timesPerWeek: {
        get() {
            return this.$store.state.timesPerWeek;
        },
        set(value) {
            this.$store.commit('updateValue', ['timesPerWeek', value]);
        }
    },
    timeNoPreference: {
        get() {
            return this.$store.state.timeNoPreference;
        },
        set(value) {
            this.$store.commit('updateValue', ['timeNoPreference', value]);
        }
    }
};