export const state = () => {
  return {
    metaData: new Map(),
    layoutMetaTags: []
  };
};

export const getters = {
  metaData: state => state.metaData,
  layoutMetaTags: state => state.layoutMetaTags
};

export const mutations = {
  setMetaData(state, {path, metaData}) {
    state.metaData.set(path, metaData);
  },

  setLayoutMetaTags(state, { meta }) {
    state.layoutMetaTags = meta;
  }
}
