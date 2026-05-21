/**
 * Frontend dev launcher — frees the Vite port then starts vite dev.
 */

import { spawn, execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const port = parseInt(process.env.VITE_PORT, 10) || 5173;

/**
 * Frees a TCP port on Windows/macOS/Linux (dev only).
 * @param {number} p - Port number
 * @returns {Promise<void>}
 */
async function freePort(p) {
  const myPid = String(process.pid);

  if (process.platform === 'win32') {
    try {
      const output = execSync(`netstat -ano | findstr :${p}`, { encoding: 'utf8' });
      const pids = new Set();
      for (const line of output.split('\n')) {
        if (!line.includes('LISTENING')) continue;
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && pid !== '0' && pid !== myPid) pids.add(pid);
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
          console.log(`[frontend dev] Freed port ${p} (PID ${pid})`);
        } catch {
          /* ignore */
        }
      }
    } catch {
      /* port free */
    }
    return;
  }

  try {
    const output = execSync(`lsof -ti :${p}`, { encoding: 'utf8' });
    for (const pid of output.split('\n').filter(Boolean)) {
      if (pid === myPid) continue;
      try {
        process.kill(Number(pid), 'SIGTERM');
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* port free */
  }
}

await freePort(port);

const child = spawn('npx', ['vite', 'dev', '--port', String(port)], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, VITE_PORT: String(port) },
});

child.on('exit', (code) => process.exit(code ?? 0));
process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
