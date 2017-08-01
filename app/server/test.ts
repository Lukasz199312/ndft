export class Test {
    public static test;

    public static text() {

        function identity<T>(arg: T): T {
            return arg;
        }

        let myIdentity: { <T>(arg: T, aaa): T } = identity;
        let myAdd: (x: number, y: number) => number = function (x: number, y: number): number { return x + y; };

        console.log(myAdd(10, 10));

        function pow(x: number, y: number) {
            return x * y;
        }

        myAdd = pow;
        console.log(myAdd(5, 10));

        function buildName(firstName: string, ...restOfName: string[]) {
            return firstName + " " + restOfName.join(" ");
        }

        let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
        console.log(employeeName);
        interface test {
            name: string;
        }

        interface Card {
            suit: string;
            card: number;
        }
        interface Deck {
            suits: string[];
            cards: number[];
            createCardPicker(this: Deck): () => Card;
        }
        let deck: Deck = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            // NOTE: The function now explicitly specifies that its callee must be of type Deck
            createCardPicker: function (this: Deck) {
                return () => {
                    let pickedCard = Math.floor(Math.random() * 52);
                    let pickedSuit = Math.floor(pickedCard / 13);

                    return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
                }
            }
        }

        let cardPicker = deck.createCardPicker();
        let pickedCard = cardPicker();

        console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

        class BeeKeeper {
            hasMask: boolean;
        }

        class ZooKeeper {
            nametag: string;
        }

        class Animal {
            numLegs: number;
        }

        class Bee extends Animal {
            keeper: BeeKeeper;
        }

        class Lion extends Animal {
            keeper: ZooKeeper;
        }

        function findKeeper<A extends Animal, K>(a: {
            new (): A;
            prototype: { keeper: K }
        }): K {
            return a.prototype.keeper;
        }

        console.log("test zoo: " + findKeeper(Lion));  // typechecks!

        function f() {
            console.log("f(): evaluated");
            return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
                console.log("f(): called");
            }
        }

        function g() {
            console.log("g(): evaluated");
            return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
                console.log("g(): called");
            }
        }

        class C {
            @f()
            @g()
            methods() { }
        }

        function sealed(constructor: Function) {
            Object.seal(constructor);
            Object.seal(constructor.prototype);
        }

        @sealed
        class Greeter {
            greeting: string;
            constructor(message: string, a: string) {
                this.greeting = message;
            }
            greet() {
                return "Hello, " + this.greeting;
            }
        }

    }

    public testResult(res :boolean):boolean {
        return res; 
    }
}