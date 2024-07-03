function loggedMethod<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
    const methodName = String(context.name);

    function replacementMethod(this: This, ...args: Args): Return {
        console.log(`LOG: Entering method '${methodName}'.`)
        const result = target.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`)
        return result;
    }

    return replacementMethod;
}

class Person {
    name: string;

    public constructor(name: string) {
        this.name = name;
    }

    @loggedMethod
    public greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

new Person('Julia').greet()
