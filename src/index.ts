type True = "true";
type False = "false";
type Bool = True | False;

type If<Cond extends Bool, Then, Else> = Cond extends True ? Then : Else;

let x : If<True, False, True>;
let y : If<If<True, True, False>, True, False>;

type Zero = "0";
type Num = Zero | {pred: Num};

type Succ<T extends Num> = {pred: T};
type Pred<T extends Num> = T extends Succ<T> ? T : Zero;
type IsZero<T extends Num> = T extends Zero ? True : False;

let c : Succ<Zero>;
let d : Succ<typeof c>;
let e : Pred<typeof c>;
let f : Pred<Zero>;
let g : Pred<Succ<Zero>>;
