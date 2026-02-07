#!/usr/bin/env node

/**
 * Design Builder Pre-Work Check
 * Platform-agnostic script to ensure clean state before working
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🎨 Design Builder Pre-Work Check\n');

// Load project config if exists
let config = {
  platform: 'generic',
  autoSync: true,
  preferredModel: 'opus'
};

const configPath = join(process.cwd(), '.design-builder-config.json');
if (existsSync(configPath)) {
  try {
    config = { ...config, ...JSON.parse(readFileSync(configPath, 'utf8')) };
    console.log(`📋 Project: ${config.platform}\n`);
  } catch (e) {
    console.log('⚠️  Could not read config, using defaults\n');
  }
}

try {
  // 1. Check for uncommitted changes
  console.log('📋 Checking for uncommitted changes...');
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  
  if (status.trim()) {
    console.log('⚠️  Uncommitted changes found:');
    console.log(status);
    console.log('❌ Please commit or stash changes before pulling!');
    process.exit(1);
  }
  
  console.log('✅ Working directory clean\n');
  
  // 2. Fetch and check for remote changes
  if (config.autoSync) {
    console.log('🔄 Fetching from remote...');
    execSync('git fetch', { stdio: 'inherit' });
    
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    const behind = execSync(`git rev-list HEAD..origin/${branch} --count`, { encoding: 'utf8' }).trim();
    const ahead = execSync(`git rev-list origin/${branch}..HEAD --count`, { encoding: 'utf8' }).trim();
    
    if (parseInt(behind) > 0) {
      console.log(`\n⬇️  ${behind} commits behind origin/${branch}`);
      console.log('📥 Pulling latest changes...');
      execSync('git pull', { stdio: 'inherit' });
      console.log('\n✅ Updated to latest version!');
    } else {
      console.log(`✅ Already up to date with origin/${branch}`);
    }
    
    if (parseInt(ahead) > 0) {
      console.log(`\n⬆️  You have ${ahead} unpushed commits`);
    }
  }
  
  // 3. Quick project analysis
  console.log('\n📊 Quick Analysis:');
  
  // Count files by extension
  try {
    if (config.componentDir) {
      const componentCount = execSync(
        `dir /b /s "${config.componentDir}\\*.tsx" "${config.componentDir}\\*.jsx" 2>nul | find /c ".tsx" || echo 0`,
        { encoding: 'utf8', shell: true }
      ).trim();
      console.log(`   - Components: ${componentCount || 'N/A'}`);
    }
  } catch (e) {
    // Skip if component dir doesn't exist
  }
  
  // Check for TODOs
  try {
    const todos = execSync('findstr /s /i "TODO FIXME" src\\*.tsx src\\*.ts 2>nul', { encoding: 'utf8' });
    const todoCount = todos.split('\n').filter(line => line.trim()).length;
    if (todoCount > 0) {
      console.log(`   - TODOs/FIXMEs: ${todoCount}`);
    }
  } catch (e) {
    // No TODOs found
  }
  
  console.log('\n✅ Ready to work!');
  console.log('\n💡 Remember:');
  console.log(`   - Platform: ${config.platform}`);
  console.log(`   - Preferred model: ${config.preferredModel.toUpperCase()}`);
  console.log('   - Commit frequently');
  console.log('   - Push after each feature\n');
  
} catch (error) {
  console.error('\n❌ Error during pre-work check:', error.message);
  process.exit(1);
}