import { DependencyList, useEffect } from 'react';

 const useGameEvent = <T extends string | object>(
  eventName: | (T extends string ? T : string)| keyof CustomGameEventDeclarations| keyof GameEventDeclarations,
  callback: (event: NetworkedData<GameEvents.InferGameEventType<T, object>>) => void,
  dependencies?: DependencyList,
) => {

  useEffect(() => {
    const id = GameEvents.Subscribe(eventName, callback);
    return () => {
      GameEvents.Unsubscribe(id);
    }
  }, dependencies);

}

export default useGameEvent;