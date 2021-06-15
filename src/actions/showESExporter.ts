export const SHOW_ES_EXPORTER = "SHOW_ES_EXPORTER";

export const showESExporter = (visible: boolean) => {
  return {
    type: SHOW_ES_EXPORTER,
    visible,
  };
};
