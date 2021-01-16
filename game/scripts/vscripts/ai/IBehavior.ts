export interface IBehavior {
  continue?: () => void;
  end?: () => void;
  getOrder: () => ExecuteOrderOptions;
  getInitiative: () => number;
  getEndTime: () => number;
}