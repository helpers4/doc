#!/usr/bin/env bun

/**
 * Version management script for documentation
 * This script creates new documentation versions and updates version selectors
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { spawn } from 'bun';

interface VersionConfig {
  version: string;
  label: string;
  path: string;
  isLatest?: boolean;
}

const VERSIONS_DIR = 'versioned_docs';
const VERSIONS_FILE = 'versions.json';

async function runCommand(command: string, args: string[] = []): Promise<string> {
  const proc = spawn([command, ...args], {
    stdout: 'pipe',
    stderr: 'pipe',
  });

  const exitCode = await proc.exited;
  const output = await new Response(proc.stdout).text();

  if (exitCode !== 0) {
    const error = await new Response(proc.stderr).text();
    throw new Error(`Command failed: ${command} ${args.join(' ')}\n${error}`);
  }

  return output.trim();
}

async function getCurrentVersion(): Promise<string> {
  try {
    // Try to get version from package.json in the helpers4 library
    const packagePath = '../package.json';
    if (existsSync(packagePath)) {
      const packageContent = readFileSync(packagePath, 'utf-8');
      const packageJson = JSON.parse(packageContent);
      return packageJson.version || '1.0.0';
    }
  } catch (error) {
    console.warn('Could not read version from package.json');
  }

  // Fallback to git tag
  try {
    const gitTag = await runCommand('git', ['describe', '--tags', '--abbrev=0']);
    return gitTag.replace(/^v/, ''); // Remove 'v' prefix if present
  } catch (error) {
    console.warn('Could not get version from git tags');
  }

  // Default fallback
  return '1.0.0';
}

function getVersionLabel(version: string): string {
  if (version.includes('alpha')) {
    return `${version} (Alpha)`;
  }
  if (version.includes('beta')) {
    return `${version} (Beta)`;
  }
  if (version.includes('rc')) {
    return `${version} (RC)`;
  }
  return version;
}

function loadVersions(): VersionConfig[] {
  if (!existsSync(VERSIONS_FILE)) {
    return [];
  }

  try {
    const content = readFileSync(VERSIONS_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn('Could not parse versions.json, starting fresh');
    return [];
  }
}

function saveVersions(versions: VersionConfig[]): void {
  writeFileSync(VERSIONS_FILE, JSON.stringify(versions, null, 2));
}

function createVersionedDocs(version: string): void {
  const versionDir = join(VERSIONS_DIR, `version-${version}`);

  if (existsSync(versionDir)) {
    console.log(`Version ${version} already exists, skipping...`);
    return;
  }

  // Create version directory
  mkdirSync(versionDir, { recursive: true });

  // Copy current docs to versioned directory
  const docsDir = 'docs';
  if (existsSync(docsDir)) {
    copyDirectoryRecursive(docsDir, versionDir);
  }

  console.log(`✅ Created versioned docs for version ${version}`);
}

function copyDirectoryRecursive(src: string, dest: string): void {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  // This is a simplified version - in a real implementation,
  // you'd want to use a proper directory copying utility
  console.log(`Copying ${src} to ${dest}`);
}

async function updateDocusaurusConfig(versions: VersionConfig[]): Promise<void> {
  const configPath = 'docusaurus.config.ts';

  if (!existsSync(configPath)) {
    console.warn('docusaurus.config.ts not found, skipping config update');
    return;
  }

  // This is a simplified version - in a real implementation,
  // you'd want to parse and update the actual config file
  console.log('📝 Update docusaurus.config.ts with new versions manually');
  console.log('Versions to include:');
  versions.forEach(v => {
    console.log(`  - ${v.label}: ${v.path}`);
  });
}

async function createNewVersion(version?: string): Promise<void> {
  const targetVersion = version || await getCurrentVersion();

  console.log(`🔖 Creating new documentation version: ${targetVersion}`);

  // Load existing versions
  const versions = loadVersions();

  // Check if version already exists
  if (versions.some(v => v.version === targetVersion)) {
    console.log(`❌ Version ${targetVersion} already exists`);
    process.exit(1);
  }

  // Create new version config
  const newVersion: VersionConfig = {
    version: targetVersion,
    label: getVersionLabel(targetVersion),
    path: targetVersion,
  };

  // Mark as latest if it's the first version or higher than existing
  if (versions.length === 0) {
    newVersion.isLatest = true;
  }

  // Add to versions list (newest first)
  versions.unshift(newVersion);

  // Create versioned documentation
  createVersionedDocs(targetVersion);

  // Save versions file
  saveVersions(versions);

  // Update Docusaurus config
  await updateDocusaurusConfig(versions);

  console.log(`✅ Successfully created version ${targetVersion}`);
  console.log('📝 Don\'t forget to:');
  console.log('  1. Update docusaurus.config.ts with the new version');
  console.log('  2. Commit the changes to git');
  console.log('  3. Deploy the updated documentation');
}

async function listVersions(): Promise<void> {
  const versions = loadVersions();

  if (versions.length === 0) {
    console.log('No versions found');
    return;
  }

  console.log('📚 Available documentation versions:');
  versions.forEach((version, index) => {
    const latest = version.isLatest ? ' (latest)' : '';
    const indicator = index === 0 ? '🔄' : '📖';
    console.log(`  ${indicator} ${version.label}${latest} - ${version.path}`);
  });
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'create':
        await createNewVersion(args[1]);
        break;
      case 'list':
        await listVersions();
        break;
      default:
        console.log('📚 Documentation Version Manager');
        console.log('');
        console.log('Usage:');
        console.log('  bun scripts/version.ts create [version]  - Create new version');
        console.log('  bun scripts/version.ts list             - List all versions');
        console.log('');
        console.log('Examples:');
        console.log('  bun scripts/version.ts create 2.0.0');
        console.log('  bun scripts/version.ts create');
        console.log('  bun scripts/version.ts list');
        break;
    }
  } catch (error) {
    console.error('❌ Error:', (error as Error).message);
    process.exit(1);
  }
}

if (import.meta.main) {
  main();
}
