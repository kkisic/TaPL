type TupleToUnion<T> = T extends (infer U)[] ? U : never;

//const fruits = [
//    {'orange': 0},
//    {'apple': 0},
//    {'banana': 0}
//]
//type FruitUnion = TupleToUnion<typeof fruits>;
//type Fruits = keyof FruitUnion;

type FruitsMap = {
    banana: {name: "banana", price: number}
    apple: {name: "apple", price: number}
    orange : {name: "orange"}
}

type _Filter<T> = T extends {price: number} ? T : never;
type _Banana = _Filter<{name: "banana", price: number}>;
type _Orange = _Filter<{name: "orange"}>;

type _FilteredMap<T> = {[K in keyof T]: T[K] extends _Filter<T[K]> ? T[K] : never};
type _FilteredFruits = _FilteredMap<FruitsMap>;

type _NonNeverKeys<T> = {[K in keyof T]: T[K] extends never ? never : K}[keyof T];
type _NonNeverKeys_<T> = {[K in keyof T]: T[K] extends never ? never : K};
type _NonNeverFruitsKeys = _NonNeverKeys<_FilteredFruits>;
type _NonNeverFruitsKeys_ = _NonNeverKeys_<_FilteredFruits>;

type hoge = {a: "aa", b: "bb", c: "cc", d: never};
type fuga = hoge[keyof hoge];
type foo = {[K in keyof hoge]: hoge[K] extends never ? never : K}[keyof hoge];
type Foo = {[K in keyof _FilteredFruits]: _FilteredFruits[K] extends never ? never : K}[keyof _FilteredFruits];
type Bar = {[K in keyof FruitsMap]: FruitsMap[K] extends never ? never : K}[keyof FruitsMap];

type _PickedFruits = Pick<FruitsMap, _NonNeverFruitsKeys>

type Filter<T, U> = T extends U ? T : never;
type FilteredMap<T, U> = {[K in keyof T]: T[K] extends Filter<T[K], U> ? T[K] : never};
type NonNeverKeys<T> = {[K in keyof T]: T[K] extends never ? never : K}[keyof T];
type PickUp<T, U> = Pick<T, NonNeverKeys<FilteredMap<T, U>>>;

type FilteredFruits = FilteredMap<FruitsMap, {price: number}>;
type NonNeverFruitsKeys = NonNeverKeys<FilteredFruits>;
type PickedFruits_ = Pick<FruitsMap, NonNeverFruitsKeys>;
type PickedFruits = PickUp<FruitsMap, {price: number}>;
