#!/usr/bin/env bun

/**
 * Deploy script for GitHub Pages
 * This script builds the documentation and deploys it to GitHub Pages
 */

import { spawn } from 'bun';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';

const REPO_URL = 'git@github.com:helpers4/doc.git';
const BUILD_DIR = 'build';
const TEMP_DIR = 'temp-gh-pages';

async function runCommand(command: string, args: string[] = [], cwd?: string): Promise<void> {
  console.log(`Running: ${command} ${args.join(' ')}`);

  const process = spawn([command, ...args], {
    cwd: cwd || process.cwd(),
    stdio: ['inherit', 'inherit', 'inherit'],
  });

  const exitCode = await process.exited;

  if (exitCode !== 0) {
    throw new Error(`Command failed with exit code ${exitCode}: ${command} ${args.join(' ')}`);
  }
}

async function checkPrerequisites(): Promise<void> {
  console.log('🔍 Checking prerequisites...');

  // Check if build directory exists
  if (!existsSync(BUILD_DIR)) {
    throw new Error(`Build directory '${BUILD_DIR}' not found. Run 'bun run build' first.`);
  }

  // Check if git is configured
  try {
    await runCommand('git', ['config', 'user.name']);
    await runCommand('git', ['config', 'user.email']);
  } catch (error) {
    throw new Error('Git user name and email must be configured');
  }

  console.log('✅ Prerequisites check passed');
}

async function deployToGitHub(): Promise<void> {
  console.log('🚀 Deploying to GitHub Pages...');

  // Remove temp directory if it exists
  if (existsSync(TEMP_DIR)) {
    rmSync(TEMP_DIR, { recursive: true, force: true });
  }

  // Clone the repository
  await runCommand('git', ['clone', REPO_URL, TEMP_DIR]);

  // Switch to gh-pages branch (create if it doesn't exist)
  try {
    await runCommand('git', ['checkout', 'gh-pages'], TEMP_DIR);
  } catch (error) {
    console.log('Creating new gh-pages branch...');
    await runCommand('git', ['checkout', '--orphan', 'gh-pages'], TEMP_DIR);
  }

  // Clear existing files (keep .git)
  const files = await Bun.file(join(TEMP_DIR, '.git')).exists();
  if (files) {
    const entries = await Array.fromAsync(new Bun.Glob('*').scan({ cwd: TEMP_DIR }));
    for (const entry of entries) {
      if (entry !== '.git') {
        const entryPath = join(TEMP_DIR, entry);
        rmSync(entryPath, { recursive: true, force: true });
      }
    }
  }

  // Copy build files
  await runCommand('cp', ['-r', `${BUILD_DIR}/*`, TEMP_DIR]);

  // Create CNAME file for custom domain (if needed)
  // await Bun.write(join(TEMP_DIR, 'CNAME'), 'docs.helpers4.dev');

  // Add and commit files
  await runCommand('git', ['add', '.'], TEMP_DIR);

  try {
    await runCommand('git', ['commit', '-m', `Deploy documentation - ${new Date().toISOString()}`], TEMP_DIR);

    // Push to GitHub
    await runCommand('git', ['push', 'origin', 'gh-pages'], TEMP_DIR);

    console.log('✅ Successfully deployed to GitHub Pages!');
  } catch (error) {
    console.log('ℹ️  No changes to deploy');
  }

  // Cleanup
  rmSync(TEMP_DIR, { recursive: true, force: true });
}

async function main(): Promise<void> {
  try {
    console.log('📚 Starting documentation deployment...');

    await checkPrerequisites();
    await deployToGitHub();

    console.log('🎉 Deployment completed successfully!');
    console.log('📖 Your documentation will be available at: https://helpers4.github.io/doc/');

  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Check if script is run directly
if (import.meta.main) {
  main();
}
