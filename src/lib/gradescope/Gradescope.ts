type GradescopeTestCase = {
  score: number;
  max_score: number;
  status: string;
  name: string;
  name_format: string;
  number: string;
  output: string;
  output_format: string;
  tags: string[];
  visibility: string;
  extra_data: object;
};

type LeaderBoard = {
  name: string;
  value: number | string;
  order: string;
};

type GradescopeTests = {
  tests: GradescopeTestCase[];
  leaderboard: LeaderBoard[];
}

type GradescopeResult = {
  score: number;
  execution_time: number;
  output: string;
  output_format: string;
  test_output_format: string;
  test_name_format: string;  
  visibility: string;
  stdout_visibility: string;
  extra_data: object;
  tests: GradescopeTests;
};

// type Gradescope = {
//   generateResultJSON: (result: Result) => GradescopeResult;
// };

// const gradescope: Gradescope = {
//   generateResultJSON: (result: Result): GradescopeResult => {
//     throw new Error('Function not implemented.');
//   }
// };