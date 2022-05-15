import Solve from "./solve"

describe("solve.js", () => {
    let solve = new Solve();

    test('adds 1 + 2 to equal 3', () => {
        solve.display.set("1+2"); //задаем выражение
        solve.handler('=');
        expect(solve.display.get()).toBe("3");
    });

    test('adds 5.05/5 to equal 1.01', () => {
        solve.display.set("5.05/5"); //задаем выражение
        solve.handler('=');
        expect(solve.display.get()).toBe("1.01");
    });

    test('adds 1000000000*1000000000 must be  "Overflow"', () => {
        solve.display.set("1000000000*1000000000"); //задаем выражение
        solve.handler('=');
        expect(solve.display.get()).toBe("Overflow");
    });
});