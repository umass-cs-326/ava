import fs from 'node:fs/promises';
import { createWriteStream } from 'fs';
import archiver from 'archiver';

class AutoGraderBuilderImpl {
  build() {
    fs.cp('./gradescope/*', './autograder', { recursive: true });
    fs.cp('./lib', './autograder/lib', { recursive: true });
    fs.cp('./bin', './autograder/bin', { recursive: true });
    fs.cp('./tests', './autograder/tests', { recursive: true });
    fs.cp('./package.json', './autograder/package.json');
    fs.cp('./package-lock.json', './autograder/package-lock.json');
    fs.cp('results', './autograder/results', { recursive: true });

    const output = createWriteStream('./autograder.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(output);
    archive.directory('autograder/', false);
    archive.finalize();

    //fs.unlink('./autograder', { recursive: true });
  }
}

const AutoGraderBuilder = new AutoGraderBuilderImpl();

export default AutoGraderBuilder;
