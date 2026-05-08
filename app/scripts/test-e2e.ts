import { spawn } from 'node:child_process';

const env = { ...process.env };
delete env['NO_COLOR'];

const command = process.platform === 'win32' ? 'playwright.cmd' : 'playwright';
const child = spawn(command, ['test'], {
  env,
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal !== null) {
    process.kill(process.pid, signal);
    return;
  }

  process.exitCode = code ?? 1;
});

child.on('error', (error) => {
  throw error;
});
