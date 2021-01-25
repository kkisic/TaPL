type True = "True";
type False = "False";
type Bool = True | False;

type If<Cond extends Bool, Then, Else> = Cond extends True ? Then : Else;

let x : If<True, False, True>;
let y : If<If<True, True, False>, True, False>;

type Zero = {pred: Zero};
type Num = Zero | {pred: Num};

type Succ<T extends Num> = {pred: T};
//type Pred<T extends Num> = T extends Succ<Num> ? T["pred"] : Zero;
type Pred<T extends Num> = T["pred"];
type IsZero<T extends Num> = T extends Zero ? True : False;

let c : Succ<Zero>;
let d : Succ<typeof c>;
let e : Pred<typeof c>;
let f : Pred<Zero>;
let g : Pred<Succ<Zero>>;
let h : Pred<Succ<Succ<Zero>>>;
let i : Pred<Succ<Pred<Zero>>>;

type aaaaa = Num extends Zero ? True : False;

type bbbb = {True: number, False: string};
type b1 = bbbb["True"];
type b2 = bbbb["False"];
type b3 = bbbb[IsZero<Zero>];
type b4 = bbbb[IsZero<Succ<Zero>>];

//type Add<T extends Num, U extends Num> = U extends Zero ? T : Add<Succ<T>, Pred<U>>;
//type Add<T extends Num, U extends Num> = {
//    True: U
//    False: {
//        True: T
//        False: Add<Succ<T>, Pred<U>>
//    }[IsZero<U>]
//}[IsZero<T>];
type Add<T extends Num, U extends Num> = {
    True: T
    False: Add<Succ<T>, Pred<U>>
}[IsZero<U>];
//type _Add<T extends Num, U extends Num> = Add<T, U>[IsZero<U>]

//type Sub<T extends Num, U extends Num> = T extends Zero ? T : U extends Zero ? T : Sub<Pred<T>, Pred<U>>;
type Sub<T extends Num, U extends Num> = {
    True: T
    False: {
        True: T
        False: Sub<Pred<T>, Pred<U>>
    }[IsZero<U>]
}[IsZero<T>];

let add1 : Add<Succ<Zero>, Succ<Succ<Succ<Zero>>>>;
let sub1 : Sub<Zero, Zero>
let sub2 : Sub<Succ<Zero>, Succ<Zero>>;
let sub3 : Sub<Succ<Succ<Succ<Zero>>>, Succ<Zero>>;

//type Mul<T extends Num, U extends Num> = U extends Zero ? Zero : Add<T, Mul<T, Pred<U>>>;
type Mul<T extends Num, U extends Num> = {
    True: Zero
    False: {
        True: Zero
        False: Add<T, Mul<T, Pred<U>>>
    }[IsZero<U>]
}[IsZero<T>];
let mul0 : Mul<Zero, Zero>;
let mul1 : Mul<Succ<Zero>, Zero>;
let mul2 : Mul<Succ<Succ<Zero>>, Succ<Succ<Succ<Zero>>>>;
let mul3 : ToNumber<Mul<ToNum<7>, ToNum<5>>>;
//let mul3_ : ToNumber<typeof mul3>;

type MakeTuple<T extends Number> = _MakeTuple<T, []>;
type _MakeTuple<T extends Number, U extends any[]> = U["length"] extends T ? U : _MakeTuple<T, [any, ...U]>;
//type TupleToNum<T extends any[]> = _TupleToNum<T, Zero>;
//type _TupleToNum<T extends any[], U extends Num> = T["length"] extends 0 ? U : _TupleToNum<

type ToNum<T extends Number> = MakeNum<T, [], Zero>;
type MakeNum<T extends Number, U extends any[], V extends Num> = U["length"] extends T ? V : MakeNum<T, [any, ...U], Succ<V>>;

type ToNumber<T extends Num> = MakeNumber<T, []>;
type MakeNumber<T extends Num, U extends any[]> = T extends Zero ? U["length"] : MakeNumber<Pred<T>, [any, ...U]>;

let aa: MakeTuple<10>["length"]
let bb: ToNum<10>;
let cc: ToNumber<ToNum<10>>;


//type True = "True";
//type False = "False";
//type Bool = True | False;
//
//type If<Cond extends Bool, Then, Else> = Cond extends True ? Then : Else;
//
//let x : If<True, False, True>;
//let y : If<If<True, True, False>, True, False>;
//
//
//type Zero = {isZero: True, pred: Zero};
//type Num = Zero | {isZero: False, pred: Num};
//type Succ<N extends Num> = {isZero: False, pred: N};
//type Pred<N extends Num> = N["isZero"] extends True ? Zero : N["pred"];
//type IsZero<N extends Num> = N["isZero"];
//
//let c : Succ<Zero>;
//let d : Succ<typeof c>;
//let e : Pred<typeof c>;
//let f : Pred<Zero>;
//let g : Pred<Succ<Zero>>;
//let h : Pred<Succ<Succ<Zero>>>;
//let a1: IsZero<Zero>;
//let a2: IsZero<Succ<Zero>>;
//let a3: IsZero<Pred<Zero>>;
//let a4: IsZero<Add<Zero, Zero>>;
//let a5: IsZero<Sub<Zero, Zero>>;
//let a6: IsZero<Sub<Succ<Zero>, Zero>>;
//
//
//type Add<M extends Num, N extends Num> = {
//    True: M;
//    False: Succ<Add<M, Pred<N>>>;
//}[IsZero<N>];
//
//type Sub<M extends Num, N extends Num> = {
//    True: M;
//    False: Sub<Succ<M>, Pred<N>>;
//}[IsZero<N>];
//
//type Mul<M extends Num, N extends Num> = {
//    True: Zero;
//    False: Add<Mul<M, Pred<N>>, M>;
//}[IsZero<N>];
//
//let m1 : Mul<Zero, Zero>;
//let m2 : Mul<Succ<Zero>, Zero>;
//let m3 : Mul<Succ<Zero>, Succ<Zero>>;
//let m4 : Mul<Succ<Succ<Zero>>, Succ<Succ<Zero>>>;
//
//type ToNum<T extends Number> = MakeNum<T, any[], Zero>;
//type MakeNum<T extends Number, U extends any[], V extends Num> = U["length"] extends T ? V : MakeNum<T, [any, ...U], Succ<V>>;
//
//type ToNumber<T extends Num> = MakeNumber<T, []>;
//type MakeNumber<T extends Num, U extends any[]> = T extends Zero ? U["length"] : MakeNumber<Pred<T>, [any, ...U]>;
//
//
//let aaaa: MakeNum<10, [], Zero>;
//
//let bb: ToNum<1>;
//let cc: ToNumber<ToNum<10>>;
