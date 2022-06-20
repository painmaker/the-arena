
import { useState, useEffect } from 'react';

const useNetTableValues = <
  TName extends keyof CustomNetTableDeclarations,
  T extends CustomNetTableDeclarations[TName]
>(name: TName): NetworkedData<T> => {

  const [values, setValue] = useState(() =>
    CustomNetTables.GetAllTableValues<TName, T>(name).reduce<NetworkedData<T>>(
      (accumulator, pair) => ({ ...(accumulator as any), [pair.key]: pair.value }),
      {} as any,
    ),
  );

  useEffect(() => {
    const listener = CustomNetTables.SubscribeNetTableListener(name, (_, eventKey, eventValue) => {
      setValue((current) => ({ ...(current as any), [eventKey]: eventValue }));
    });
    return () => {
      CustomNetTables.UnsubscribeNetTableListener(listener);
    }
  }, [name]);

  return values;

}

export default useNetTableValues;
