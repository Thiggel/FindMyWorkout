import { GET_DATA, graphql } from "@/state/queries";

export const state = () => ({
    programs: [],
    paymentTypes: [],
    trainingTypes: [],
    goals: [],
    levels: [],
    languages: [],
    extras: [],
    age: [],

    selectedPaymentTypes: [],
    selectedTrainingTypes: [],
    selectedGoals: [],
    selectedLevels: [],
    selectedLanguages: [],
    selectedExtras: [],
    selectedAges: [],

    timeNoPreference: true,
    hoursPerDay: 2,
    timesPerWeek: 5
})

export const mutations = {
    SAVE_DATA(state, data) {
        for(const key in data) {
            if(state[key]) state[key] = data[key];
        }
    },
    updateValue(state, obj) {
        if(state[obj[0]]) state[obj[0]] = obj[1];
    }
}

export const actions = {
    async loadData() {
        const { data } = await graphql(GET_DATA);

        let transformToOptions = obj => obj.map(el => { return { value: el.name, label: el.name }; });
        let paymentTypes = transformToOptions(data.allPaymentTypes),
            trainingTypes = transformToOptions(data.allTrainingTypes),
            goals = transformToOptions(data.allGoals),
            levels = transformToOptions(data.allLevels),
            languages = transformToOptions(data.allLanguages),
            extras = transformToOptions(data.allExtras),
            age = transformToOptions(data.allAges);

        let transformToValue = obj => obj.map(el => el.name);
        // make everything preselected
        let selectedPaymentTypes = transformToValue(data.allPaymentTypes),
            selectedTrainingTypes = transformToValue(data.allTrainingTypes),
            selectedGoals = transformToValue(data.allGoals),
            selectedLevels = transformToValue(data.allLevels),
            selectedLanguages = transformToValue(data.allLanguages),
            selectedExtras = transformToValue(data.allExtras),
            selectedAges = transformToValue(data.allAges);

        this.commit('SAVE_DATA', {
            programs: data.allPrograms.map(program => {
                program.time = program.trainingDaysPerWeek + ' days / week <br>' + program.hoursPerDay + ' / day';
                return program;
            }),
            paymentTypes,
            trainingTypes,
            goals,
            levels,
            languages,
            extras,
            age,

            selectedPaymentTypes,
            selectedTrainingTypes,
            selectedGoals,
            selectedLevels,
            selectedLanguages,
            selectedExtras,
            selectedAges
        });
    },
}