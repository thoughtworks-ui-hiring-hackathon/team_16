import store from '../../redux-state.js';

export function openModal(obj) {
  store.dispatch({type: 'MODAL_OPEN_STATE', modalType: obj});
}

export function closeModal(obj) {
  store.dispatch({type: 'MODAL_OPEN_STATE', modalType: obj});
}