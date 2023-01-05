import { useState } from "react";

interface GetAuth<D, K extends keyof D> {
  (): D | false
  (...args: D[K][]): GetAuth<D, K>
}

function reduce(res: any) {
  return (...args: any) => {
    if (!args.length) {
      return res;
    } else {
      return reduce(res)
    }
  }
}

export function useFeature<D extends { children: D[] }, K extends keyof D>(list: D[], key: K): GetAuth<D, K> {
  const [currentList, setCurrentList] = useState(list)
  const [target, setTarget] = useState<D>()
  function getAuth(...args: D[K][]): GetAuth<D, K> | ((flag?: any) => any) {
    let idx = 0;
    while (idx++ < args.length) {
      const tempTarget = currentList.find((item) => item[key] === args[idx]);
      if (tempTarget) {
        setTarget(tempTarget);
        setCurrentList(tempTarget.children);
      }else{
        setCurrentList(list);
        return reduce(false);
      }
    }
    return (...args: D[K][]) => {
      if (!args.length) {
        setCurrentList(list);
        return target;
      } else {
        return getAuth(...args);
      }
    }
  }
  return getAuth as GetAuth<D, K>;
}
