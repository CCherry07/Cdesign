import { useDebounce } from './useDebounce'
import { useClickTargetOutsite } from './dom/useClickTargetOutSide'
import { useDocTitle } from './dom/useDocTitle'
import { useMuntedRef } from './dom/useMuntedRef'
import { useMount } from './dom/useMount'
import { useLocalStorageState } from './dom/useLocalStorageState';
import { useUnMount } from './dom/useUnMount'
import { useAsync } from './useAsync'

export { useDebounce, useAsync };

// dom hooks
export { useClickTargetOutsite, useDocTitle, useMuntedRef, useMount, useUnMount, useLocalStorageState }
