import { useState, useEffect } from 'react';

const useNetTableKey = <
  TName extends keyof CustomNetTableDeclarations,
  T extends CustomNetTableDeclarations[TName],
  K extends keyof T
>(name: TName, key: K): NetworkedData<T[K]> | null => {

  /*
  const [value, setValue] = useState(() => CustomNetTables.GetTableValue<TName, T, K>(name, key));

  useEffect(() => {
    const listener = CustomNetTables.SubscribeNetTableListener(name, (_, eventKey, eventValue) => {
      if (key === eventKey) {
        setValue(eventValue);
      }
    });
    return () => {
      CustomNetTables.UnsubscribeNetTableListener(listener);
    }
  }, [name, key]);

  return value;

  */
  
  return null;
  
}

export default useNetTableKey;