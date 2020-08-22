export const SHOW_ES_EXPORTER = "SHOW_ES_EXPORTER";

export const showESExporer = (visible: boolean) => {
  return {
    type: SHOW_ES_EXPORTER,
    visible,
  };
};
