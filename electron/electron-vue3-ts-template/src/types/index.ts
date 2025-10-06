import {MenuTheme} from "ant-design-vue";
import {VNode} from "vue";
import {Key} from "ant-design-vue/es/_util/type";
import {CompareFn, SorterResult, SortOrder} from "ant-design-vue/es/table/interface";
import {ColumnType} from "ant-design-vue/es/table";

// ============================================== Base ==============================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export type Exclude<T, K> = T extends K ? never : T;
export type Extract<T, K> = T extends K ? T : never;
export type Pick<T, K extends keyof T> = { [P in K]: T[P] };
export type Omit<T, K extends keyof T> = { [ P in Exclude<keyof T, K>]: T[P] };
export type Record<K extends keyof unknown, T> = { [P in K]: T };
export type Partial<T, MakeUndefined = true, K extends keyof T = keyof T> =
	true extends MakeUndefined
		? { [P in Exclude<keyof T, K>]: T[P] } & { [P in K]?: T[P] | undefined }
		: { [P in Exclude<keyof T, K>]: T[P] } & { [P in K]?: T[P] }

export type IfContains<A1, A2, Then = unknown, Else = A1> = true extends (A1 extends A2 ? true : false) ? Then : Else;
export type IfExtends<A1, A2, Then = unknown, Else = A1> = [A1] extends [A2] ? Then : Else;
export type Equals<A, B> = (<G>() => G extends A ? 1 : 2) extends <G>() => G extends B ? 1 : 2 ? true : false;
export type IfEquals<A1, A2, Then = unknown, Else = A1> = Equals<A1, A2> extends true ? Then : Else;
export type IsEmptyList<List extends unknown[]> = List['length'] extends 0 ? true : false;

type _Remove<List extends unknown[], T, Method extends 'contains' | 'extends' | 'equal', Result extends unknown[]> =
	IsEmptyList<List> extends true
		? Result
		// 每次判断首元素（追加 ? 是为了可以匹配到可选类型）
		: List extends [(infer Head)?, ...infer Tail]
			? Method extends 'contains'
				// Head 是否为满足 contains T 的关系
				// 1. 是 -> Result 中不添加 Head 继续递归处理 Tail 即剩余类型
				// 2. 否 -> Result 中添加 Head 继续递归处理 Tail 即剩余类型
				? _Remove<Tail, T, Method, IfContains<Head, T, Result, [...Result, Head]>>
				: Method extends 'extends'
					? _Remove<Tail, T, Method, IfExtends<Head, T, Result, [...Result, Head]>>
					: Method extends 'equal'
						? _Remove<Tail, T, Method, IfEquals<Head, T, Result, [...Result, Head]>>
						: never
			: List;
export type Remove<List extends unknown[], T, Method extends 'contains' | 'extends' | 'equal'> = _Remove<List, T, Method, []>;

// ============================================== Index signature ==============================================

export type SpecifiedValueIndexSignature<V = unknown> = { [props: PropertyKey]: V };

export type AnyIndexSignature = SpecifiedValueIndexSignature<Any>;

export type StringKeyIndexSignature<V = unknown> = { [props: string]: V };

// ============================================== Literal ==============================================

export type ExtractStringLiteral<T> = string extends T ? never : T extends string ? T : never

// ============================================== Object ==============================================

export type PropValue<T extends { [key: PropertyKey]: unknown }> = T extends { [key: PropertyKey]: infer V } ? V : never

export type DeepPropType<T, Path extends string> =
	Path extends keyof T
		? T[Path] /* 递归边界 */ : Path extends `${infer K}.${infer R}`
			? K extends keyof T
				? DeepPropType<T[K], R> // 递归调用
				: never
			: never

export type RedefineProp<T, K extends keyof T, Redefine extends { [P in K]: unknown }> = Omit<T, K> & Redefine

// ============================================== Function ==============================================

// ================= Unitary ===================
export type Consumer<T> = (t: T) => void;
export type Function<T, U> = (t: T) => U;
export type Predicate<T> = (t: T) => boolean;
export type Supplier<T> = () => T;

// ================= Binary ===================
export type BiConsumer<T1, T2> = (t1: T1, t2: T2) => void;
export type BiFunction<T1, T2, U> = (t1: T1, t2: T2) => U;
export type BiPredicate<T1, T2> = (t1: T1, t2: T2) => boolean;

// ==================================================== Common ====================================================

// Antd
export type RequiredMultipleSorterResult<RecordType = Any> = Omit<Required<SorterResult<RecordType>>, 'column' | 'order'> & {
	column: RedefineProp<ColumnTypeExt, 'sorter', {
		sorter: {
			compare?: CompareFn<RecordType>
			multiple: number
		}
	}>,
	order: Exclude<SortOrder, null>,
}
export type ColumnTypeExt = ColumnType & {
	tableField: string
}
