// const state = {
//   localMarkers: { },
//   localModifyingMarkers: { }
// };

// const mutations = {
//   addLocalMarker: function(state, payload) {
//     this.$set(state.localMarkers, payload.key, payload);
//   },
//   addLocalModifyingMarker: function(state, payload) {
//     this.$set(state.localModifyingMarkers, payload.key, payload);
//   },
//   removeLocalMarker: function(state, payload) {
//     state.localMarkers[payload] = null;
//   },
//   removeLocalModifyingMarkers: function(state, payload) {
//     state.localModifyingMarkers[payload] = null;
//   }
// };

// const getter = {
//   getIsModifying(state) {
//     return Object.keys(state.localModifyingMarkers).length > 0;
//   }
// };

// const actions = {};

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
//   getter
// };
