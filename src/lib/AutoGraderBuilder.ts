import fs from 'node:fs/promises';
import { createWriteStream } from 'fs';
import archiver from 'archiver';

export class AutoGraderBuilder {
  private static instance: AutoGraderBuilder;

  private constructor() {}

  public static getInstance(): AutoGraderBuilder {
    if (!AutoGraderBuilder.instance) {
      AutoGraderBuilder.instance = new AutoGraderBuilder();
    }

    return AutoGraderBuilder.instance;
  }

  public async build() {
    await fs.cp('./tests', './autograder/tests', { recursive: true });
    await fs.cp('./package.json', './autograder/package.json');
    await fs.cp('./package-lock.json', './autograder/package-lock.json');
    await fs.cp('results', './autograder/results', { recursive: true });

    await this.copyGradescopeFiles();

    const output = createWriteStream('./autograder.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(output);
    archive.directory('autograder/', false);
    await archive.finalize();

    await this.rmDir('./autograder');
  }

  private async copyGradescopeFiles() {
    const entries = await fs.readdir('gradescope', { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile()) {
        console.log(`Copying ${entry.name}`);
        await fs.cp(`gradescope/${entry.name}`, `autograder/${entry.name}`);
      }
    }
  }

  private async rmDir(dirPath: string) {
    try {
      await fs.rm(dirPath, { recursive: true, force: true });
    } catch (error: any) {
      console.error(`Error while deleting directory: ${error.message}`);
    }
  }
}
