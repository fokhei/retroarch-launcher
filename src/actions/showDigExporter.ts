export const SHOW_DIG_EXPORTER = "SHOW_DIG_EXPORTER";

export const showDigExporter = (visible: boolean) => {
  return {
    type: SHOW_DIG_EXPORTER,
    visible,
  };
};
