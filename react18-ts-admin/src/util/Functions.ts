// ================= Unitary ===================

export type Consumer<T> = (t: T) => void;
export type Function<T, U> = (t: T) => U;
export type Predicate<T> = (t: T) => boolean;
export type Supplier<T> = () => T;

// ================= Binary ===================

export type BiConsumer<T1, T2> = (t1: T1, t2: T2) => void;
export type BiFunction<T1, T2, U> = (t1: T1, t2: T2) => U;
export type BiPredicate<T1, T2> = (t1: T1, t2: T2) => boolean;