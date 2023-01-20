export const crudHelper = {
    namespaced: true,
    state: {
        changes: 0
    },
    actions:{
        isChanged({ commit }) {
            commit('makeChanges');
        },
    },
    mutations: {
        makeChanges(state) {
          state.changes += 1;
        },
    }
}