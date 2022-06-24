import { DependencyList, useEffect } from 'react';

 const useGameEvent = <T extends string | object>(
  eventName: (T extends string ? T : string) | keyof CustomGameEventDeclarations | keyof GameEventDeclarations,
  callback: (event: NetworkedData<GameEvents.InferGameEventType<T, object>>) => void,
  dependencies?: DependencyList,
) => {

  useEffect(() => {
    const id = GameEvents.Subscribe(eventName, callback);
    $.Msg(`Subscribing to GameEvent ${eventName} with ID ${id}`)
    return () => {
      $.Msg(`Unsubscribing to GameEvent ${eventName} with ID ${id}`)
      GameEvents.Unsubscribe(id);
    }
  }, dependencies);

}

export default useGameEvent;