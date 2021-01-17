

export default abstract class BaseBehavior {

  endTime: number | undefined;

  abstract getOrder(): ExecuteOrderOptions;
  abstract getInitiative(): number;
  abstract getDuration(): number;
  
  continue?(): void;
  end?(): void;

  setEndTime(endTime: number): void {
    this.endTime = endTime;
  }

  getEndTime(): number {
    return this.endTime || -1;
  }

}