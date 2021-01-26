type True = "True";
type False = "False";
type Bool = True | False;

type If<Cond extends Bool, Then, Else> = Cond extends True ? Then : Else;

let x : If<True, False, True>;
let y : If<If<True, True, False>, True, False>;

type And<T extends Bool, U extends Bool> = T extends False ? False : U extends False ? False : True;
type Or<T extends Bool, U extends Bool> = T extends True ? True : U extends True ? True : False;
type Not<T extends Bool> = T extends True ? False : True

let and1 : And<True, True>;
let and2 : And<True, False>;
let and3 : And<False, True>;
let and4 : And<False, False>;

let or1 : Or<True, True>;
let or2 : Or<True, False>;
let or3 : Or<False, True>;
let or4 : Or<False, False>;

let not1 : Not<True>;
let not2 : Not<False>;


type Zero = {isZero: True, pred: Zero};
type Num = Zero | {isZero: False, pred: Num};

type Succ<N extends Num> = {isZero: False, pred: N};
type Pred<N extends Num> = N["isZero"] extends True ? Zero : N["pred"];
type IsZero<N extends Num> = N["isZero"];

let c : Succ<Zero>;
let d : Succ<typeof c>;
let e : Pred<typeof c>;
let f : Pred<Zero>;
let g : Pred<Succ<Zero>>;
let h : Pred<Succ<Succ<Zero>>>;
let i : Pred<Succ<Pred<Zero>>>;
let j : Pred<Pred<Pred<Pred<Pred<Zero>>>>>;

type Add<M extends Num, N extends Num> = {
    True: M;
    False: Succ<Add<M, Pred<N>>>;
}[IsZero<N>];

type Sub<M extends Num, N extends Num> = {
    True: M;
    False: Sub<Succ<M>, Pred<N>>;
}[IsZero<N>];

type Mul<M extends Num, N extends Num> = {
    True: Zero;
    False: Add<Mul<M, Pred<N>>, M>;
}[IsZero<N>];

//type Add<T extends Num, U extends Num> = U extends Zero ? T : Add<Succ<T>, Pred<U>>;
//type Sub<T extends Num, U extends Num> = T extends Zero ? T : U extends Zero ? T : Sub<Pred<T>, Pred<U>>;
//type Mul<T extends Num, U extends Num> = U extends Zero ? Zero : Add<T, Mul<T, Pred<U>>>;

let add1 : Add<Succ<Zero>, Succ<Succ<Succ<Zero>>>>;
let sub1 : Sub<Zero, Zero>
let sub2 : Sub<Succ<Zero>, Succ<Zero>>;
let sub3 : Sub<Succ<Succ<Succ<Zero>>>, Succ<Zero>>;

let mul1 : Mul<Zero, Zero>;
let mul2 : Mul<Succ<Zero>, Zero>;
let mul3 : Mul<Succ<Succ<Zero>>, Succ<Succ<Succ<Zero>>>>;
let mul4 : ToNumber<Mul<ToNum<7>, ToNum<5>>>;

type ToNum<T extends Number> = MakeNum<T, [], Zero>;
type MakeNum<T extends Number, U extends any[], V extends Num> = U["length"] extends T ? V : MakeNum<T, [any, ...U], Succ<V>>;

type ToNumber<T extends Num> = MakeNumber<T, []>;
type MakeNumber<T extends Num, U extends any[]> = T extends Zero ? U["length"] : MakeNumber<Pred<T>, [any, ...U]>;

let aa: MakeTuple<10>["length"]
let bb: ToNum<10>;
let cc: ToNumber<ToNum<10>>;
