import { execSync } from "child_process";

// Run gfortran as a linter and capture the output
let linterOutput;
try {
    linterOutput = execSync('gfortran -fdiagnostics-format=json -Wall -ffree-line-length-none -ffixed-line-length-none ../test.f90', { stdio: 'pipe' }).toString();


} catch (err: any) {
    const output = err.toString().split('\n')[1]; // The first line contains the error message, the second line contains the JSON we care about.

    const lintResults = JSON.parse(output);

    const problems = [lintResults[0], ...lintResults[0].children];

    for (const result of problems) {
        const message = result.message;
        const locations = result['locations'];


        for (const location of locations) {
            const { caret } = location;
            const line = caret.line;
            const column = caret.column;
            const filename = caret.file;

            console.log(`Linting issue in file ${filename}, line ${line}, column ${column}: ${message}`);
        }
    }
}
