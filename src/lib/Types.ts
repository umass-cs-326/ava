type Diagnostic = {
  location: string;
  failureType: string;
  error: string;
  code: string;
  name: string;
  expected: number;
  actual: number;
  operator: string;
  stack: string;
};

export type Tap = {
  ok: boolean;
  name: string;
  id: number;
  buffered: boolean;
  tapError: boolean;
  skip: boolean;
  todo: boolean;
  previous: null;
  plan: null;
  diag: Diagnostic | {};
  time: number;
  fullname: string;
  closingTestPoint: boolean;
  points: number;
  testName: string;
};

export type Result = {
  passing: Tap[];
  failing: Tap[];
  totalPoints: number | undefined;
};