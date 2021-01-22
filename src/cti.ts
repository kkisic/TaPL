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

type Filter<T> = T extends {price: number} ? T : never;
type Banana = Filter<{name: "banana", price: number}>;
type Orange = Filter<{name: "orange"}>;

type FilteredMap<T> = {[K in keyof T]: T[K] extends Filter<T[K]> ? T[K] : never};
type FilteredFruits = FilteredMap<FruitsMap>;

type NonNeverKeys<T> = {[K in keyof T]: T[K] extends never ? never : K}[keyof T];
type NonNeverKeys_<T> = {[K in keyof T]: T[K] extends never ? never : K};
type NonNeverFruitsKeys = NonNeverKeys<FilteredFruits>;
type NonNeverFruitsKeys_ = NonNeverKeys_<FilteredFruits>;

type hoge = {a: "aa", b: "bb", c: "cc", d: never};
type fuga = hoge[keyof hoge];
type foo = {[K in keyof hoge]: hoge[K] extends never ? never : K}[keyof hoge];
type Foo = {[K in keyof FilteredFruits]: FilteredFruits[K] extends never ? never : K}[keyof FilteredFruits];
type Bar = {[K in keyof FruitsMap]: FruitsMap[K] extends never ? never : K}[keyof FruitsMap];

type PickedFruits = Pick<FruitsMap, NonNeverFruitsKeys>
