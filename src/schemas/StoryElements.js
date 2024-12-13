export const schemas = {
  plot: {
    id: String,
    title: String,
    description: String,
    mainEvents: Array,
    connections: Array
  },
  character: {
    id: String,
    name: String,
    description: String,
    traits: Array,
    relationships: Array,
    arc: String
  },
  chapter: {
    id: String,
    title: String,
    summary: String,
    scenes: Array,
    characters: Array,
    plotPoints: Array
  }
};
