interface GetAuth<D, K extends keyof D> {
  (): D | false
  (...args: D[K][]): GetAuth<D, K>
}

function reduce(res: any) {
  return (flag?: any) => {
    if (flag === undefined) {
      return res;
    } else {
      return reduce(res)
    }
  }
}

export function useFeature<D extends { children: D[] }, K extends keyof D>(list: D[], key: K): GetAuth<D, K> {
  let current: D[] = list;
  let target: D
  function getAuth(...args: D[K][]): GetAuth<D, K> | ((flag?: any) => any) {
    let idx = 0;
    while (idx < args.length) {
      target = current.find((item: any) => item[key] === args[idx]) as D;
      if (target) {
        current = target.children;
      }
      if (target === undefined) {
        current = list;
        return reduce(false);
      };
      idx++;
    }
    return (...args1: D[K][]) => {
      if (!args1.length) {
        current = list; // 重置
        return target;
      } else {
        return getAuth(...args1);
      }
    }
  }
  return getAuth as GetAuth<D, K>;
}
