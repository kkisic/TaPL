type True = "true";
type False = "false";
type Bool = True | False;

type If<Cond extends Bool, Then, Else> = Cond extends True ? Then : Else;

let x : If<True, False, True>;
let y : If<If<True, True, False>, True, False>;

type Zero = "0";
type Num = Zero | {pred: Num};

type Succ<T extends Num> = {pred: T};
type Pred<T extends Num> = T extends Succ<Num> ? T["pred"] : Zero;
type IsZero<T extends Num> = T extends Zero ? True : False;

let c : Succ<Zero>;
let d : Succ<typeof c>;
let e : Pred<typeof c>;
let f : Pred<Zero>;
let g : Pred<Succ<Zero>>;
let h : Pred<Succ<Succ<Zero>>>;
let i : Pred<Succ<Pred<Zero>>>;

//type instantiation is excessively deep and possibly infinite
//type Add<T extends Num, U extends Num> = U extends Zero ? T : Add<Succ<T>, Pred<U>>;
type Add<T extends Num, U extends Num> = {true: T, false: Succ<Add<T, Pred<U>>>}[IsZero<U>];
type Sub<T extends Num, U extends Num> = T extends Zero ? T : U extends Zero ? T : Sub<Pred<T>, Pred<U>>;
//type Sub<T extends Num, U extends Num> = {true: T, false: {true: T, false: Sub<Pred<T>, Pred<U>>}[IsZero<U>]}[IsZero<T>];

let add1 : Add<Succ<Zero>, Succ<Succ<Succ<Zero>>>>;
let sub1 : Sub<Zero, Zero>
let sub2 : Sub<Succ<Zero>, Succ<Zero>>;
let sub3 : Sub<Succ<Succ<Succ<Zero>>>, Succ<Zero>>;

type Mul<T extends Num, U extends Num> = U extends Zero ? Zero : Add<T, Mul<T, Pred<U>>>;
//type Mul<T extends Num, U extends Num> = {true: Zero, false: Add<T, Mul<T, Pred<U>>>}[IsZero<U>];
let mul1 : Mul<Succ<Zero>, Zero>;
let mul2 : Mul<Succ<Succ<Zero>>, Succ<Succ<Succ<Zero>>>>;
