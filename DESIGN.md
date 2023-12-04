# Design

## Ideas

- Specify points for each test using a special comment right before the test.
  The points can be parsed along with the identifier string of the test so that
  it can be matched up with the tests that pass and those that fail. Does this
  mean I need to identify the tests that pass as well? Yes, I will need to take
  another look at my test output parsing functions.
- When a student distribution or a gradescope distribution are made, a warning
  should be generated if the points do not add up to 100.

## Processing

```text
node --test -> Tap 
            -> { passing, failing } 
            -> Points -> { passing, failing, points}
            -> Gradescope
            -> { passing, failing, points, results }
            -> ResultsJSON
            -> results.json
```

- `node --test`: The Node test runner producing TAP results on standard output. 
- `Tap`: Maps the TAP results to an object containing the passing tests and the
failing tests.
- `Points`: Takes the passing and failing tests and accumulates the points. This
includes the total points and an array of test name, description, and individual
points.
- `Gradescope`: Uses the passing, failing, and points to produce an object
called results that models the format of the results.json file defined by
Gradescope.
- `ResultsJSON`: Generates the `results.json` file to standard out, formatted
with 2 spaces.
